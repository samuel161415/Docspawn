<template>
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="sublists"
      dataKey="id"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
      tableStyle="min-width: 60rem"
    >
      <template #header>
        <div class="flex flex-wrap justify-end gap-2">
          <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
          <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
        </div>
      </template>
      <Column expander style="width: 5rem" />
      <Column field="title" header="List elements" :headerStyle="{ height: '4.5rem' }">
        <template #body="{ data, field }">
          <div class="flex items-center space-x-4">
            <font-awesome-icon
              v-if="data?.sublists?.length > 0"
              :icon="['fat', 'list-tree']"
              style="color: #3d3d3d"
            />
            <font-awesome-icon
              v-else
              :icon="['fat', 'list-tree']"
              style="color: #00000000"
            />
            <p class="font-poppins">{{ data[field] }}</p>
          </div>
        </template>
      </Column>
      <Column header="Actions" icon="pi pi-trash" header-style="text-center" style="width: 5%">
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
      <template #expansion="{ data }">
        <div class="p-4">
          <h5>Sublists for {{ data.title }}</h5>
          <NestedDataTable
            v-if="data.sublists && data.sublists.length > 0"
            :sublists="data.sublists"
            @edit-item="handleEditItem"
            @open-delete="handleOpenDelete"
          />
        </div>
      </template>
    </DataTable>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useToast } from 'primevue/usetoast';
  
  const props = defineProps({
    sublists: Array,
  });
  
  const emit = defineEmits(['edit-item', 'open-delete']);
  const expandedRows = ref({});
  const toast = useToast();
  
  const onRowExpand = (event) => {
    toast.add({ severity: 'info', summary: 'Row Expanded', detail: event.data.title, life: 3000 });
  };
  
  const onRowCollapse = (event) => {
    toast.add({ severity: 'success', summary: 'Row Collapsed', detail: event.data.title, life: 3000 });
  };
  
  const expandAll = () => {
    expandedRows.value = props.sublists.reduce((acc, item) => (acc[item.id] = true) && acc, {});
  };
  
  const collapseAll = () => {
    expandedRows.value = null;
  };
  
  const handleEditItem = (data) => {
    emit('edit-item', data);
  };
  
  const handleOpenDelete = (data) => {
    emit('open-delete', data);
  };
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