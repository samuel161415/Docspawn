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
      <template #header>
        <div class="flex flex-wrap justify-between items-center">
        <!-- :class="calledFrom === 'root' ? 'text-primaryBlue' : ''" -->
          <p  
            class="font-poppins font-normal text-lg"
          >
          <!-- comingFrom -->
            {{ tableData.title }}
          </p>
          <div class="flex flex-col md:flex-row justify-end gap-2">

            <Button
              :icon="isAllExpanded ? 'pi pi-minus  ' : 'pi pi-plus'"
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
           
            <!-- <Button
              :icon="isAllExpanded ? 'pi pi-minus  ' : 'pi pi-plus'"
              :label="isAllExpanded ? 'Collapse All' : 'Expand All'"
              class="p-button-success border border-red-500"
              outlined
              text
              @click="toggleExpandCollapse"
            /> -->
          </div>
        </div>

      </template>

      <Column
        v-if="hasSublists(tableData, 'main')"
        expander
        style="width: 5rem"
        class=""
      >
        <!-- <template #body="{ data }">
          <span v-if="hasSublists(data, 'branch')" class="p-column-title">
            <i class="pi pi-chevron-right"></i>
          </span>
        </template> -->
      </Column>
      <Column
        v-for="(column, index) in columns"
        :key="index"
        :field="column"
        :header="column"
        sortable
        :headerStyle="{ height: '4.5rem' }"
      >
        <template #body="{ data, field }">
          <p class="font-poppins font-normal">{{ data[field] }}</p>
        </template>
      </Column>
      <Column
        header="Actions"
        icon="pi pi-trash"
        header-style="text-center"
        style="width: 5%"
      >
        <template #body="{ data }">
          <div class="flex space-x-8">
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
      <template v-if="tableData?.sublists?.length" #expansion="{ data }">
        <div
          v-if="hasSublists(data, 'branch')"
          :class="isSublistData ? 'max-w-[60vw] border border-red-500' : ''"
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
    <!-- <Toast /> -->
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

console.log("props comingFrom ", props?.calledFrom);

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
  console.log("sublist value", props.tableData?.isSublistSimple);
  return !props.tableData?.isSublistSimple;
});

const columns = computed(() => {
  console.log("is the sublist sublist?", props.tableData.isSublistSimple);
  if (
    !props.tableData.isSublistSimple &&
    props.tableData.sublists?.length > 0
  ) {
    return Object.keys(props.tableData.sublists[0]).filter(
      (key) => key !== "sublists"
    );
  } else if (props.tableData.sublists?.length > 0) {
    return [ "title"];
  }
  return [];


});
</script>

<style scoped>
::v-deep .p-datatable {
  border: none !important;
}

::v-deep .p-datatable-tbody > tr > td {
  border: none !important;
}

/* ::v-deep .p-datatable-header {
  border-radius: 0.4rem 0.4rem 0 0 !important;
}

::v-deep .p-datatable-table > tbody > tr:last-of-type > td:first-of-type {
  border-radius: 0 0 0 0.5rem !important;
}

::v-deep .p-datatable-table > tbody > tr:last-of-type > td:last-of-type {
  border-radius: 0 0 0.5rem 0 !important;
} */
</style>
