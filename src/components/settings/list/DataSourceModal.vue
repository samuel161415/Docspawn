<template>
  <!--  v-model:visible="visible"
    modal
    :draggable="false"
    :style="{ width: '40rem' }" -->
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    :style="{ width: '80vw' }"
    dismissableMask
  >
    <template #header>
      <div
        class="custom-header flex justify-start bg-white flex-wrap items-center"
      >
        <p class="font-poppins whitespace-nowrap text-xl font-semibold">
          {{ tableData.name }}
        </p>
      </div>
    </template>
    <DataTable
      :value="tableData.sublists.slice(1)"
      :frozenValue="[tableData.sublists[0]]"
      scrollable
      scrollHeight="450px"
      :paginator="showPaginator"
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      striped-rows
      show-gridlines
      class="border rounded-lg overflow-hidden"
    >
      <Column
        v-for="(column, index) in columns"
        :key="index"
        :field="column"
        :header="column"
        :sortable="true"
      >
        <template #body="{ data, field, frozenRow }">
          <p
            class="font-poppins font-normal flex justify-center whitespace-nowrap py-2"
            :class="{ 'font-bold': frozenRow }"
          >
            {{ data[field] }}
          </p>
        </template>
      </Column>
    </DataTable>
  </Dialog>
</template>

<script setup>
import { ref, computed } from "vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps({
  tableData: Object,
});

const visible = ref(false);

console.log("tableData from table", props.tableData);

const showPaginator = computed(() => {
  return props.tableData.sublists?.length > 5;
});
const columns = computed(() => {
  if (props.tableData?.sublists?.length > 0) {
    return Object.keys(props.tableData.sublists[0]).filter(
      (key) => key !== "sublists"
    );
  }
  return [];
});

const updateVisible = (value) => {
  emit("update:visible", value);
};
</script>

<style scoped>
.custom-header {
  display: flex;
  align-items: center;
  padding: 0;
}

::v-deep .p-datatable-thead > tr {
  border: none !important;
}

::v-deep .p-datatable-thead > tr > th {
  border-top: none !important;
  border-left: none !important;
  white-space: nowrap;
}

::v-deep .p-datatable-tbody > tr > td {
  border-left: none !important;
}
</style>
