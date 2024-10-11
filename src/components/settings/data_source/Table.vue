<template>
  <div v-if="tableData && tableData.length">
    <DataTable
      v-model:filters="filters"
      v-model:expandedRows="expandedRows"
      striped-rows
      show-gridlines
      :value="tableData"
      :paginator="tableData?.length > 0 ? true : false"
      :rows="6"
      :row-reorder="true"
      :global-filter-fields="['name']"
      table-style="min-width: 50rem; border-radius:20%;border:none;"
      class="max-w-[100vw] rounded-md p-datatable-header p-datatable-wrapper border-none"
      @row-reorder="onRowReorder"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
      dataKey="index"
    >
      <!-- DataTable content -->
      <template #empty>
        <p class="flex text-center">No data</p>
      </template>

      <template #header>
        <div class="flex flex-row">
          <div class="mr-auto">
            <span class="relative flex">
              <i
                class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-400"
                style="color: rgb(117, 119, 120)"
              ></i>
              <InputText
                v-model="filters.global.value"
                placeholder="Keyword search"
                class="pl-10 font-normal rounded-xl"
              />
            </span>
          </div>
          <div class="flex flex-wrap justify-end gap-2">
            <Button
              text
              icon="pi pi-plus"
              label="Expand All"
              @click="expandAll"
            />
            <Button
              text
              icon="pi pi-minus"
              label="Collapse All"
              @click="collapseAll"
            />
          </div>
        </div>
      </template>

      <Column expander style="width: 5rem" />
      <Column
        field="index"
        :body-style="{ margin: '0rem', padding: '0rem' }"
        row-reorder
        style="width: 3%"
      >
        <template #rowreordericon>
          <i
            class="pi pi-ellipsis-v cursor-move p-8"
            data-pc-section="rowreordericon"
          ></i>
        </template>
      </Column>
      <Column field="type" header="Type" :header-style="{ height: '4.5rem' }">
        <template #body="{ data, field }">
          <div class="flex items-center space-x-4">
            <font-awesome-icon
              :icon="['fat', 'list-tree']"
              style="color: #00000000"
            />
            <p class="font-poppins">
              {{ data[field] }}
            </p>
          </div>
        </template>
      </Column>
      <Column field="name" header="Name" :header-style="{ height: '4.5rem' }">
        <template #body="{ data, field }">
          <div class="flex items-center space-x-4">
            <font-awesome-icon
              :icon="['fat', 'list-tree']"
              style="color: #00000000"
            />
            <p class="font-poppins">
              {{ data[field] }}
            </p>
          </div>
        </template>
      </Column>

      <Column
        header="Actions"
        icon="pi pi-trash"
        header-style="text-center"
        style="width: 10%"
      >
        <template #body="{ data }">
          <div class="flex gap-4">
            <Button
              class="w-max px-4"
              severity="success"
              @click="handleEditItem(data)"
            >
              Edit
            </Button>
            <Button
              outlined
              class="w-max px-4"
              severity="danger"
              @click="handleOpenDelete(data)"
            >
              Delete
            </Button>
          </div>
        </template>
      </Column>

      <template #expansion="{ data }">
        <div class="p-4 max-w-[90vw]">
          <h5 class=" font-semibold">
            Data for {{ data.name.replace(/\.[^/.]+$/, "") }}
            <span v-if="data.subtitles?.length" class="text-sm font-normal">
              ({{ data.subtitles.length }} subtitle{{
                data.subtitles.length > 1 ? "s" : ""
              }})
            </span>
          </h5>
          <div class="expanded-table-container">
            <div v-if="loadingRows[data.index]" class="loading-indicator">
              Loading...
            </div>
            <div v-else>
              <DataTable
                :value="data.completeData"
                scrollable
                scrollHeight="500px"
              >
                <Column
                  field="auto_index_by_docspawn"
                  header="Index"
                  sortable
                ></Column>
                <Column
                  v-for="col in data.columnNames"
                  :key="col"
                  :field="col"
                  :header="col"
                  sortable
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </template>
    </DataTable>
  </div>
  <div v-else>
    <p class="flex text-center">No data available</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  filters: Object,
});
const emit = defineEmits(["rowReorder", "editItem", "openDelete"]);

const filters = ref(props.filters);
const expandedRows = ref({});
const loadingRows = ref({});
const toast = useToast();

function onRowReorder(event) {
  emit("rowReorder", event.value);
}

function handleEditItem(data) {
  emit("editItem", data);
}

function handleOpenDelete(data) {
  emit("openDelete", data);
}

const onRowExpand = (event) => {
  loadingRows.value[event.data.index] = true;
  // Simulate data fetching or processing delay
  setTimeout(() => {
    loadingRows.value[event.data.index] = false;
    toast.add({
      severity: "info",
      summary: "Row Expanded",
      detail: event.data.name,
      life: 3000,
    });
  }, 1000); // Adjust the delay as needed
};

const onRowCollapse = (event) => {
  toast.add({
    severity: "success",
    summary: "Row Collapsed",
    detail: event.data.name,
    life: 3000,
  });
};

const expandAll = () => {
  expandedRows.value = props.tableData.reduce((acc, item) => {
    acc[item.index] = true; // Use a unique identifier for each row
    return acc;
  }, {});
};

const collapseAll = () => {
  expandedRows.value = {};
};
</script>

<style scoped>
.expanded-table-container {
  max-height: 500px; /* Adjust the height as needed */
  max-width: 100%; /* Adjust the width as needed */
  overflow: auto;
  border: 1px solid #ddd; /* Optional: Add a border for better visibility */
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #888;
}

::v-deep .p-datatable-scrollable-body {
  overflow: auto !important;
}

::v-deep .p-datatable-scrollable-header {
  overflow: hidden !important;
}

::v-deep .p-datatable-header {
  border-radius: 0.4rem 0.4rem 0 0 !important;
}

/* Bottom Left Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:first-of-type {
  border-radius: 0 0 0 0.5rem !important;
}
/* Bottom Right Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:last-of-type {
  border-radius: 0 0 0.5rem 0 !important;
}
</style>
