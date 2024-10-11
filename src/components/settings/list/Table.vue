<template>
  <div class="card">
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="tableData.isDataSource ? tableData.data : tableData.sublists"
      dataKey="id"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
      tableStyle="min-width: 60rem"
    >
      <template #header>
        <div class="flex flex-wrap justify-between">
          <p class="font-poppins">{{ tableData.title }}</p>
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
      
      <Column v-if="hasSublists(tableData)" expander style="width: 5rem" />
      <!-- <Column v-if="hasSublists(rowData)" expander style="width: 5rem" /> -->
      <Column
        v-for="(column, index) in columns"
        :key="index"
        :field="column"
        :header="column"
        :headerStyle="{ height: '4.5rem' }"
      >
        <template #body="{ data, field }">
          <p class="font-poppins">{{ data[field] }}</p>
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
              @click="handleEditItem(data)"
            ></font-awesome-icon>
            <font-awesome-icon
              :icon="['fas', 'trash-alt']"
              class="text-error text-lg cursor-pointer"
              @click="handleOpenDelete(data)"
            ></font-awesome-icon>
          </div>
        </template>
      </Column>
      <!-- <template #expansion="{ data }">
        <SublistComponent :data="data" />
      </template> -->
      <template #expansion="{ data }">
        <div v-if="hasSublists(data)">
          <SublistComponent :data="data" />
        </div>
      </template>
    </DataTable>
    <Toast />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import SublistComponent from "./SublistComponent.vue";

const props = defineProps({
  tableData: Object,
  filters: Object,
});


const emit = defineEmits();
const filters = ref(props.filters);
const expandedRows = ref({});
const toast = useToast();

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
  if (props.tableData.sublists) {
    expandedRows.value = props.tableData.sublists.reduce(
      (acc, item) => (acc[item.id] = true) && acc,
      {}
    );
  }
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

const hasSublists = (data) => {
  return data?.sublists?.length > 0;
};

// Compute the columns for both simple list and data source
const columns = computed(() => {
  if (props.tableData.isDataSource && props.tableData.data?.length > 0) {
    return Object.keys(props.tableData.data[0]).filter(
      (key) => key !== "sublists"
    );
  } else if (props.tableData.sublists?.length > 0) {
    return Object.keys(props.tableData.sublists[0]).filter(
      (key) => key !== "sublists"
    );
  }
  return [];
});
</script>

<style scoped>
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
