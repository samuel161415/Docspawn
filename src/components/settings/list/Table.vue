<template>
  <div class="">
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="tableData?.sublists"
      dataKey="id"
      tableStyle="min-width: 60rem"
      :paginator="showPaginator"
      :rows="5"
      class="border border-white"
    >
      <template v-if="calledFrom === 'root'" #header>
        <div class="flex flex-wrap justify-between items-center">
          <p class="font-poppins font-normal text-lg">
            {{ tableData.title }}
          </p>
          <div class="flex flex-col md:flex-row justify-end gap-2">
            <Button
              :icon="isAllExpanded ? 'pi pi-minus' : 'pi pi-plus'"
              :label="isAllExpanded ? 'Collapse' : 'Expand'"
              class="p-button-success w-36"
              outlined
              @click="toggleExpandCollapse"
            />
            <Button
              icon="pi pi-plus"
              label="Add item(s)"
              outlined
              @click="$emit('open-add-items', tableData.title)"
              class="text-success border-success hover:bg-green-50 w-40"
            />
            <Button
              icon="pi pi-cog"
              label="List options"
              class="p-button-success w-40 flex justify-start"
              outlined
              @click="$emit('open-list-options')"
            />
          </div>
        </div>
      </template>

      <template v-if="!isSublistData">
        <Column
          style="width: 5rem"
          class="bg-white"
        >
          <template #body="{ data }">
            <span v-if="hasSublists(data, 'branch')" @click="toggleRow(data)" class=" cursor-pointer">
              <i :class="expandedRows[data.id] ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
            </span>
          </template>
        </Column>
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="null"
          :sortable="false"
          :headerStyle="{ height: '0px', backgroundColor: 'blue', border: '0 white' }"
        >
          <template #body="{ data, field }">
            <p class="font-poppins font-normal">{{ data[field] }}</p>
          </template>
        </Column>
        <Column
          :header="null"
          icon="pi pi-trash"
          style="width: 5%"
          class="bg-white text-center"
          :headerStyle="{ height: '0px', backgroundColor: 'blue', border: '0 white' }"
        >
          <template #body="{ data }">
            <div class="flex space-x-8">
              <font-awesome-icon
                :icon="['fas', 'plus']"
                class="text-primaryBlue cursor-pointer"
                @click="$emit('open-add-items', tableData.title)"
              />
              <font-awesome-icon
                :icon="['fas', 'pencil-alt']"
                class="text-success text-lg cursor-pointer"
                @click="$emit('edit-item', data)"
              />
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                class="text-error text-lg cursor-pointer"
                @click="$emit('open-delete', data)"
              />
            </div>
          </template>
        </Column>
      </template>

      <template v-else>
        <Column
          v-if="!isSublistData"
          expander
          style="width: 5rem"
          class="bg-blue-500 "
        ></Column>
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="isSublistData ? column : null"
          :sortable="isSublistData ? true : false"
          :headerStyle="isSublistData ? { height: 'auto' } : { height: '0px', backgroundColor: 'blue', border: '0 white' }"
        >
          <template #body="{ data, field }">
            <p class="font-poppins font-normal">{{ data[field] }}</p>
          </template>
        </Column>
        <Column
          :header="isSublistData ? 'Actions' : null"
          icon="pi pi-trash"
          style="width: 5%"
          class="bg-white text-center"
          :headerStyle="isSublistData ? { height: 'auto' } : { height: '0px', backgroundColor: 'blue', border: '0 white' }"
        >
          <template #body="{ data }">
            <div class="flex space-x-8">
              <font-awesome-icon
                :icon="['fas', 'plus']"
                class="text-primaryBlue cursor-pointer"
                @click="$emit('open-add-items', tableData.title)"
              />
              <font-awesome-icon
                :icon="['fas', 'pencil-alt']"
                class="text-success text-lg cursor-pointer"
                @click="$emit('edit-item', data)"
              />
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                class="text-error text-lg cursor-pointer"
                @click="$emit('open-delete', data)"
              />
            </div>
          </template>
        </Column>
      </template>

      <template v-if="tableData?.sublists?.length" #expansion="{ data }">
        <div
          v-if="hasSublists(data, 'branch')"
          class="pl-5"
          :class="isSublistData ? 'max-w-[60vw]' : ''"
        >
          <Table
            :tableData="data"
            @open-add-items="$emit('open-add-items', $event)"
            @open-list-options="$emit('open-list-options')"
            @edit-item="$emit('edit-item', $event)"
            @open-delete="$emit('open-delete', $event)"
            calledFrom="nested"
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import Table from "~/components/settings/list/Table.vue";

const props = defineProps({
  tableData: Object,
  filters: Object,
  calledFrom: String,
});

const emit = defineEmits();
const filters = ref(props.filters);
const expandedRows = ref({});
const toast = useToast();
const isAllExpanded = ref(false);

const showPaginator = computed(() => {
  return props.tableData.sublists?.length > 5;
});

const onRowExpand = (event) => {
  toast.add({
    severity: "info",
    summary: "Row Expanded",
    detail: event.data.title,
    life: 3000,
  });
};

const onRowCollapse = (event) => {
  toast.add({
    severity: "success",
    summary: "Row Collapsed",
    detail: event.data.title,
    life: 3000,
  });
};

const expandAll = () => {
  if (props.tableData?.sublists) {
    expandedRows.value = props.tableData.sublists.reduce(
      (acc, item) => (acc[item.id] = true) && acc,
      {}
    );
  }
};

const toggleExpandCollapse = () => {
  console.log("data table", props?.tableData);
  if (isAllExpanded.value) {
    collapseAll();
  } else {
    expandAll();
  }
  isAllExpanded.value = !isAllExpanded.value;
};

const collapseAll = () => {
  expandedRows.value = null;
};

const handleEditItem = (data) => {
  emit("edit-item", data);
};

const handleOpenDelete = (data) => {
  emit("open-delete", data);
};

const hasSublists = (data, from) => {
  return data?.sublists?.length > 0;
};

const isSublistData = computed(() => {
  console.log('is this simple list', props.tableData?.isSublistSimple);
  return !props.tableData?.isSublistSimple;
});

const columns = computed(() => {
  if (
    !props.tableData.isSublistSimple &&
    props.tableData.sublists?.length > 0
  ) {
    return Object.keys(props.tableData.sublists[0]).filter(
      (key) => key !== "sublists"
    );
  } else if (props.tableData.sublists?.length > 0) {
    return ["title"];
  }
  return [];
});

const toggleRow = (data) => {
  if (expandedRows.value[data.id]) {
    delete expandedRows.value[data.id];
  } else {
    expandedRows.value[data.id] = true;
  }
};
</script>

<style scoped>
::v-deep .p-datatable {
  border: none !important;
}

::v-deep .p-datatable-tbody > tr > td {
  border: none !important;
  padding: 8px 8px !important;
}
::v-deep .p-datatable-tbody > tr.p-row-expanded > td > .p-datatable-row-expansion {
  margin: 0 !important; /* Remove margin for expanded content */
  padding: 4px 8px !important; /* Adjust padding for expanded content */
}

::v-deep .p-datatable-thead > tr > th {
  border: none !important;
  padding: 0 !important;
}
</style>