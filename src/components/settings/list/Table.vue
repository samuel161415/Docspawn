<template>
  <div :class="isSublistData ? `max-w-[70vw]` : 'w-full'" class="">
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="tableData?.sublists"
      dataKey="id"
      scrollable
      :scrollHeight="calledFrom === 'root' ? '550px' : ''"
      scrollDirection="both"
      frozenHeader
      :paginator="calledFrom === 'root' && showPaginator"
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      class="my-3"
    >
      <template v-if="calledFrom === 'root'" #header>
        <div
          class="flex flex-wrap justify-between items-center my-3 py-3 rounded-lg mx-[16px]"
        >
          <p class="font-poppins font-normal text-lg">{{ tableData.title }}</p>
          <div class="flex flex-col md:flex-row justify-end gap-2">
            <div class="w-8 h-8">
              <Button
                icon="pi pi-cog"
                outlined
                class="p-button-rounded p-button-success w-full h-full flex justify-center items-center"
                @click="$refs[`menu-h-${tableData.path}`].toggle($event)"
              />
            </div>
            <Menu
              :ref="`menu-h-${tableData.path}`"
              :model="getMenuModel(tableData)"
              popup
            />
          </div>
        </div>
      </template>

      <template v-if="!isSublistData">
        <Column class="w-[48px] text-center">
          <template #body="{ data }">
            <span
              v-if="hasSublists(data)"
              @click="toggleRow(data)"
              class="w-[10px] text-sm cursor-pointer"
            >
              <i
                :class="
                  expandedRows[data.id]
                    ? 'pi pi-chevron-down'
                    : 'pi pi-chevron-right'
                "
                class=""
              ></i>
            </span>
            <span v-else class="w-[10px] text-sm">
              <i class="pi pi-minus"></i>
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
                class="font-poppins fles justify-start font-normal cursor-pointer"
                @click="showModal(data)"
              >
                {{ data[field] }}
                <span class="w-[14px] ml-1">
                  <i class="pi pi-file-excel text-success"></i>
                </span>
              </p>
              <p v-else class="font-poppins fles justify-start font-normal cur">
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
                  @click="$refs[`menu-r-${data.id}`].toggle($event)"
                />
              </div>
              <Menu
                :ref="`menu-r-${data.id}`"
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
          :frozen="index === 0"
          class="w-[70vw]"
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
          :class="isChildSublistSimple(data) ? '' : 'max-w-[calc(100%-34px)]'"
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
    <!-- <TreeViewComponent /> -->
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useToast } from "primevue/usetoast";
import Table from "~/components/settings/list/Table.vue";
import DataSourceModal from "~/components/settings/list/DataSourceModal.vue";
// import TreeViewComponent from "~/components/settings/list/TreeViewComponent.vue";

const props = defineProps({
  tableData: Object,
  // tableData: Array,
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
      label: "Add item(s)",
      icon: "pi pi-plus",
      command: () => emit("open-add-items", data),
    },
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
      label: "Add sublist",
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
  modalTableData.value = data;
  isModalVisible.value = true;
};
</script>

<style scoped>
:deep(.p-datatable-row-expansion) {
  padding: 0 !important;
  margin: 10 !important;
  border: none !important;
}
:deep(.p-datatable-wrapper) {
  overflow-y: scroll !important; /* Enable vertical scrolling */
  -ms-overflow-style: none; /* Hide scrollbar in Internet Explorer and Edge */
  scrollbar-width: none; /* Hide scrollbar in Firefox */
}

/* Hide scrollbar in WebKit browsers (Chrome, Safari) */
:deep(.p-datatable-wrapper::-webkit-scrollbar) {
  display: none;
}

:deep(.p-datatable) {
  border: none !important;
  padding: 0 !important;
}
:deep(.p-datatable-header) {
  padding: 0 !important;
  border: none !important;
}

:deep(
    .p-datatable-tbody > tr.p-row-expanded > td > .p-datatable-row-expansion
  ) {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
}

:deep(.p-datatable-thead > tr) {
  padding: 0 !important;
  border: none !important;
}

:deep(.p-datatable-thead > tr > th) {
  border: none !important;
  padding: 0 !important;
  white-space: nowrap;
}
:deep(.p-datatable-thead > tr > th.header-white) {
  background-color: white;
  border-bottom: 1.5px solide;
}

:deep(.p-datatable-tbody > tr > td) {
  border-top: none !important;
  padding: 0;
  border: none !important;
}
:deep(.p-datatable-tbody > tr > td.custom-padding) {
  padding-left: 0px !important;
}

:deep(.p-datatable-tbody > tr.p-row-expanded) {
  border-bottom: none !important;
}

:deep(.p-datatable-thead > tr > th.sublist-padding) {
  padding: 10px !important;
  white-space: nowrap;
}
</style>
