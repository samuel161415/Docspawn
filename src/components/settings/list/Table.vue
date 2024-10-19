<template>
  <div class="">
    <!-- :showGridlines="calledFrom==='root' ? false:true" -->
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="tableData?.sublists"
      dataKey="id"
      tableStyle="min-width: 60rem"
      :paginator="showPaginator"
      :rows="5"
      class=""
      showGridlines
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
        <Column class="w-[80px] bg-white text-center">
          <template #body="{ data }">
            <span
              v-if="hasSublists(data, 'branch')"
              @click="toggleRow(data)"
              class="w-[14px]  cursor-pointer"
            >
              <i
                :class="
                  expandedRows[data.id]
                    ? 'pi pi-chevron-down'
                    : 'pi pi-chevron-right'
                "
                class="w-full"
              ></i>
            </span>
            <span v-else class="w-[14px] ">
              <font-awesome-icon :icon="['fas', 'minus']" class="w-full"/>
            </span>
          </template>
        </Column>
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="null"
          :sortable="false"
          class="w-[calc(100% - 160px)] pl-[33px]"
          :class="headerClass"
        >
          <template #body="{ data, field }">
            <p class="font-poppins fles justify-start p font-normal">
              {{ data[field] }}
            </p>
          </template>
        </Column>

        <Column
          :header="null"
          class="bg-white text-center w-[80px]"
        >
          <template #body="{ data }">
            <div class="flex justify-center">
              <Button
                icon="pi pi-cog"
                outlined
                class="p-button-rounded p-button-success flex justify-center items-center"
                @click="$refs[`menu-${data.id}`].toggle($event)"
              />
              <!--   {
                    label: 'Add Item',
                    icon: 'pi pi-plus',
                    command: () => $emit('open-add-items', tableData.title),
                  }, -->
              <Menu
                :ref="`menu-${data.id}`"
                :model="[
                
                  {
                    label: 'Add Sublist',
                    icon: 'pi pi-plus',
                    command: () =>
                      $emit('open-create-sublist-modal', {
                        ...data,
                        path: data.path,
                      }),
                  },
                  {
                    label: 'Edit',
                    icon: 'pi pi-pencil',
                    command: () =>
                      $emit('edit-item', { ...data, path: data.path }),
                  },
                  {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => $emit('open-delete', data),
                  },
                ]"
                popup
              />
            </div>
          </template>
        </Column>
      </template>

      <template v-else>
        <Column v-if="!isSublistData" expander class="w-[80px] "></Column>
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="isSublistData ? column : null"
          :sortable="isSublistData ? true : false"
          
          class="w-[calc(100% - 80px)] pl-[33px]"
          :class="headerClass"
        >
          <template #body="{ data, field }">
            <p
              class="font-poppins font-normal flex justify-center mt-3 whitespace-nowrap py-2"
            >
              {{ data[field] }}
            </p>
          </template>
        </Column>
      </template>

      <template v-if="tableData?.sublists?.length" #expansion="{ data }">
        <div
          v-if="hasSublists(data, 'branch')"
          class="pl-[66px] flex margin-end w-full max-w-[68vw] overflow-hidden"
          :class="isSublistData ? '' : ''"
        >
          <Table
            :tableData="data"
            @open-add-items="$emit('open-add-items', $event)"
            @open-list-options="$emit('open-list-options')"
            @edit-item="$emit('edit-item', $event)"
            @open-delete="$emit('open-delete', $event)"
            @open-create-sublist-modal="
              $emit('open-create-sublist-modal', $event)
            "
            calledFrom="nested"
            class="w-full"
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

console.log("tableData", props.tableData);

const emit = defineEmits();
const filters = ref(props.filters);
const expandedRows = ref({});
const toast = useToast();
const isAllExpanded = ref(false);

const headerClass = computed(() => {
  return isSublistData.value ? "sublist-padding" : "no-padding";
});
const isRoot = computed(() => {
  return props.calledFrom;
});

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
  expandedRows.value = {};
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
::v-deep .p-datatable-row-expansion {
  padding: 0 !important;
  margin: 0 !important;
}

::v-deep .p-datatable {
  border: none !important;
}



::v-deep
  .p-datatable-tbody
  > tr.p-row-expanded
  > td
  > .p-datatable-row-expansion {
  margin: 0 !important;
  padding: 0 !important;
}

::v-deep .p-datatable-thead > tr > th {
  /* border: none !important; */
  padding: 0 !important;
  white-space: nowrap;
}

::v-deep .p-datatable-thead > tr > th.sublist-padding {
  /* border: none !important; */
  padding: 10px !important;
  white-space: nowrap;
}
</style>
