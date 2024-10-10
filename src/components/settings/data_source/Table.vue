<template>
  <DataTable
    v-model:filters="filters"
    striped-rows
    show-gridlines
    :value="tableData"
    :paginator="tableData?.length > 0 ? true : false"
    :rows="6"
    :row-reorder="true"
    :global-filter-fields="['name']"
    table-style="min-width: 50rem; border-radius:20%;border:none;"
    class="rounded-md p-datatable-header p-datatable-wrapper border-none"
    @row-reorder="onRowReorder"
  >
    <!-- DataTable content -->
    <template #empty>
      <p class="flex text-center">
        No data
      </p>
    </template>

    <template #header>
      <div class="flex flex-row ">
        <!-- <p class="font-semibold text-lg self-center">
          {{ tableData.title }}
        </p> -->
        <div class="mr-auto">
          <span class="relative flex">
            <i
              class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600 text-gray-400 "
              style="color: rgb(117, 119, 120);"
            ></i>
            <InputText
              v-model="filters.global.value" placeholder="Keyword search"
              class="pl-10 font-normal rounded-xl "
            />
          </span>
        </div>
      </div>
    </template>

    <Column field="index" :body-style="{ margin: '0rem', padding: '0rem' }" row-reorder style="width: 3%">
      <template #rowreordericon>
        <i class="pi pi-ellipsis-v cursor-move p-8 " data-pc-section="rowreordericon"></i>
      </template>
    </Column>
    <Column field="type" header="Type" :header-style="{ height: '4.5rem' }">
      <template #body="{ data, field }">
        <div class="flex items-center space-x-4">
          <font-awesome-icon :icon="['fat', 'list-tree']" style="color: #00000000;" />
          <p class="font-poppins">
            {{ data[field] }}
          </p>
        </div>
      </template>
    </Column>
    <Column field="name" header="Name" :header-style="{ height: '4.5rem' }">
      <template #body="{ data, field }">
        <div class="flex items-center space-x-4">
          <font-awesome-icon :icon="['fat', 'list-tree']" style="color: #00000000;" />
          <p class="font-poppins">
            {{ data[field] }}
          </p>
        </div>
      </template>
    </Column>

    <Column header="Actions" icon="pi pi-trash" header-style="text-center" style="width: 10%">
      <template #body="{ data }">
        <div class="flex gap-4">
          <Button class="w-max px-4 " severity="success" @click="handleEditItem(data)">
            Edit
          </Button>
          <Button outlined class="w-max px-4 " severity="danger" @click="handleOpenDelete(data)">
            Delete
          </Button>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tableData: Array,
  filters: Object,
})
const emit = defineEmits(['rowReorder', 'editItem', 'openDelete'])

const filters = ref(props.filters)
console.log("tableData from data source",props.tableData);
function onRowReorder(event) {
  emit('rowReorder', event.value)
}

function handleEditItem(data) {
  emit('editItem', data)
}

function handleOpenDelete(data) {
  emit('openDelete', data)
}
</script>

<style scoped>
::v-deep .p-datatable-header {
    border-radius: 0.4rem 0.4rem 0 0!important;
}

/* Bottom Left Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:first-of-type {
    border-radius:  0  0  0 0.5rem!important;
}
/* Bottom Right Would Be: */
::v-deep .p-datatable-table > tbody > tr:last-of-type > td:last-of-type {
    border-radius:  0  0 0.5rem 0 !important;
}
</style>
