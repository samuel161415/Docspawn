<template>
  <div
    :class="isSublistData ? `max-w-[calc(70vw-${c_level * 65}px)]` : ''"
    class=""
  >
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="tableData?.sublists"
      dataKey="id"
      striped-rows
      :paginator="showPaginator"
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      class="border border-blue-500"
    >
      <template v-if="calledFrom === 'root'" #header>
        <div
          class="flex flex-wrap justify-between items-center mt-3 py-3 rounded-lg mx-[16px]"
        >
          <p class="font-poppins font-normal text-lg">{{ tableData.title }}</p>
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
            <!-- <Button
              icon="pi pi-cog"
              label="List options"
              class="p-button-success w-40 flex justify-start"
              outlined
              @click="$emit('open-list-options')"
            /> -->
          </div>
        </div>
      </template>

      <template v-if="!isSublistData">
        <Column class="w-[48px] text-center">
          <template #body="{ data }">
            <span
              v-if="hasSublists(data)"
              @click="toggleRow(data)"
              class="w-[14px] cursor-pointer"
            >
              <i
                :class="
                  expandedRows[data.id] && !isChildSublistSimple(data)
                    ? 'pi pi-chevron-down'
                    : 'pi pi-chevron-right'
                "
                class="w-full"
              ></i>
            </span>
            <span v-else class="w-[14px]">
              <i class="pi pi-minus w-[14px]"></i>
            </span>
          </template>
        </Column>
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="null"
          :sortable="false"
          class="w-[calc(100% - 113px)] custom-padding"
          :class="headerClass"
        >
          <template #body="{ data, field }">
            <div class="flex">
              <p
                v-if="!isChildSublistSimple(data)"
                class="font-poppins fles justify-start p font-normal cursor-pointer"
                @click="showModal(data)"
              >
                {{ data[field] }}
                <span class="w-[14px] ml-1">
                  <i class="pi pi-file-excel text-success"></i>
                </span>
              </p>
              <p
                v-else
                class="font-poppins fles justify-start p font-normal cur"
              >
                {{ data[field] }}
              </p>
            </div>
          </template>
        </Column>

        <Column :header="null" class="text-center w-[46px]">
          <template #body="{ data }">
            <div class="flex justify-center py-3 px-4 min-w-8 min-h-8">
              <div class="w-8 h-8">
                <Button
                  icon="pi pi-cog"
                  outlined
                  class="p-button-rounded p-button-success w-full h-full flex justify-center items-center"
                  @click="$refs[`menu-${data.id}`].toggle($event)"
                />
              </div>
              <Menu
                :ref="`menu-${data.id}`"
                :model="getMenuModel(data)"
                popup
              />
            </div>
          </template>
        </Column>
      </template>

      <!-- For the data source table called form the root(list.vue) -->
      <template v-if="calledFrom === 'root' && isSublistData">
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="column"
          :sortable="true"
          class="w-[calc(100% - 80px)] pl-[33px] header-white"
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
          v-if="hasSublists(data)"
          :class="isChildSublistSimple(data) ? '' : 'max-w-[calc(70vw-34px)]'"
          class="pl-[47px] border-none mb-[-1px] overflow-x-auto"
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
            :c_level="Number(c_level) + 1"
          />
        </div>
      </template>
    </DataTable>

    <DataSourceModal
      v-if="isModalVisible"
      v-model:visible="isModalVisible"
      :tableData="modalTableData"
      @cancel="isModalVisible = false"
    />
    <!-- <div v-if="calledFrom === 'root' && isSublistData">
      <DataTable
        :value="modalTableData.sublists"
        dataKey="id"
        striped-rows
        :paginator="showPaginator"
        :rows="10"
        :rowsPerPageOptions="[10, 25, 50]"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        class="border border-blue-500"
      >
        <Column
          v-for="(column, index) in columns"
          :key="index"
          :field="column"
          :header="column"
          :sortable="true"
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
      </DataTable>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useToast } from "primevue/usetoast";
import Table from "~/components/settings/list/Table.vue";
import DataSourceModal from "~/components/settings/list/DataSourceModal.vue";

const props = defineProps({
  tableData: Object,
  filters: Object,
  calledFrom: String,
  c_level: Number,
});

const emit = defineEmits();
const filters = ref(props.filters);
const expandedRows = ref({});
const toast = useToast();
const isAllExpanded = ref(false);
const isModalVisible = ref(false);
const modalTableData = ref({});

const headerClass = computed(() => {
  return isSublistData.value ? "sublist-padding" : "no-padding";
});

const showPaginator = computed(() => {
  return props.tableData.sublists?.length > 5;
});

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

const hasSublists = (data) => {
  return data?.sublists?.length > 0;
};

const isChildSublistSimple = (data) => {
  // console.log('data is',data)
  const sublists = data?.sublists;
  if (!data.isSublistSimple && sublists?.length > 0) return false;

  return true;
};

const getMenuModel = (data) => {
  const model = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => emit("edit-item", { ...data, path: data.path }),
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => emit("open-delete", data),
    },
  ];

  if (props.tableData?.level < 3) {
    model.unshift({
      label: "Add Sublist",
      icon: "pi pi-plus",
      command: () =>
        emit("open-create-sublist-modal", {
          ...data,
          path: data.path,
        }),
    });
  }

  return model;
};

watch(
  () => props.tableData.sublists,
  (newSublists) => {
    newSublists.forEach((data) => {
      if (!isChildSublistSimple(data) && expandedRows.value[data.id]) {
        delete expandedRows.value[data.id];
      }
    });
  },
  { deep: true }
);

const isSublistData = computed(() => {
  return !props.tableData?.isSublistSimple;
});
const isLabelWithinRange = computed(() => {
  return !props.tableData?.label;
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
  console.log(
    "lis evel greater than 3",
    props.tableData.level,
    props.tableData.title
  );
  if (props.tableData.level > 2) {
    return; // Prevent expanding if level is greater than 3
  }
  if (!isChildSublistSimple(data)) {
    if (expandedRows.value[data.id]) {
      delete expandedRows.value[data.id];
    }
    showModal(data);
  } else {
    if (expandedRows.value[data.id]) {
      delete expandedRows.value[data.id];
    } else {
      expandedRows.value[data.id] = true;
    }
  }
};

const showModal = (data) => {
  console.log("show modal is clicked and the passed props is", data);
  modalTableData.value = data;
  isModalVisible.value = true;
};
</script>

<style scoped>
::v-deep .p-datatable-row-expansion {
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
}
/* For removing the scroll vertical feature of the table */
::v-deep .p-datatable-wrapper {
  overflow-y: hidden !important; /* Prevent vertical scrolling */
}

::v-deep .p-datatable {
  border: none !important;
  padding: 0 !important;
}
::v-deep .p-datatable-header {
  padding: 0 !important;
  border: none !important;
}

::v-deep
  .p-datatable-tbody
  > tr.p-row-expanded
  > td
  > .p-datatable-row-expansion {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
}

::v-deep .p-datatable-thead > tr {
  padding: 0 !important;
  border: none !important;
}

::v-deep .p-datatable-thead > tr > th {
  border: none !important;
  padding: 0 !important;
  white-space: nowrap;
}
::v-deep .p-datatable-thead > tr > th.header-white {
  background-color: white;
  border-bottom: 1.5px solide
}

::v-deep .p-datatable-tbody > tr > td {
  border-top: none !important;
  padding: 0;
  border: none !important;
}
::v-deep .p-datatable-tbody > tr > td.custom-padding {
  padding-left: 0px !important;
}

::v-deep .p-datatable-tbody > tr.p-row-expanded {
  border-bottom: none !important;
}

::v-deep .p-datatable-thead > tr > th.sublist-padding {
  padding: 10px !important;
  white-space: nowrap;
}
</style>
