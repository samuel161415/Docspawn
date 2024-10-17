// FILE: src/composables/useTableActions.js
import { ref } from 'vue';

export function useTableActions(emit) {
  const items = ref([
    {
      label: 'Add Item',
      icon: 'fas fa-plus',
      command: (data) => {
        emit('open-add-items', data.title);
      },
    },
    {
      label: 'Edit Item',
      icon: 'fas fa-pencil-alt',
      command: (data) => {
        emit('edit-item', data);
      },
    },
    {
      label: 'Delete Item',
      icon: 'fas fa-trash-alt',
      command: (data) => {
        emit('open-delete', data);
      },
    },
  ]);

  const toggleSelectRow = (data) => {
    // Add your logic for selecting a row here
    console.log('Row selected:', data);
  };

  return { items, toggleSelectRow };
}