<template>
  <div class="w-full h-full bg-white overflow-scroll no-scrollbar">
    <div class="py-8 rounded-lg">
      <p class="font-semibold text-surface-600 text-xl py-2">Data source</p>
      <div>
        <div class="flex flex-col">
          <!-- left side menu -->
          <div class="w-full flex">
            <Button
              icon="pi pi-plus"
              label="Create new data source"
              outlined
              class="text-success border-success hover:bg-green-50 hover:border-success w-max ml-auto"
              severity="success"
              @click="visible = true"
            />
          </div>

          <!-- right section -->
          <div class="w-full py-5">
            <!-- table -->
            <div class="mt-4 mb-12 ml-2">
              <DataTableComponent
                :table-data="tableData"
                :filters="filters"
                @row-reorder="onRowReorder"
                @edit-item="handleEditItem"
                @open-delete="handleOpenDelete"
              />
              <Toast />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- components -->
    <Toast />
    <CreateListModal
      v-if="visible"
      v-model:visible="visible"
      :editable-item="editableItem"
      @create-list="handleCreateList"
      @create-data-source="handleCreateDataSource"
      @update-data-source="handleUpdateDataSource"
      @cancel="
        visible = false;
        editableItem = {};
      "
      @remove-editable="editableItem = {}"
      @error="showError"
      @success="showSuccess"
    />

    <!-- <EditItemOptionModal
      v-if="editableItem" v-model:visible="openItemOptions" v-model:editableItem="editableItem"
      @edit-item="handleEditItem" @cancel="openItemOptions = false"
      @open-create-list-modal="createSubList"
    /> -->

    <!-- delete -->
    <Dialog
      v-model:visible="openDeleteModal"
      header="Delete"
      modal
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5"
        ><i class="pi pi-exclamation-triangle text-error mr-2"></i>Are you sure
        you want to delete this Item?</span
      >

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          outlined
          @click="openDeleteModal = false"
        />
        <Button
          type="button"
          label="Delete"
          severity="error"
          class="bg-error hover:bg-red-500 hover:border-error text-white"
          @click="handleDelete"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useToast } from "primevue/usetoast";
import DataTableComponent from "~/components/settings/data_source/Table.vue";
import CreateListModal from "~/components/settings/data_source/CreateListModal.vue";

// import EditItemOptionModal from '~/components/settings/data_source/EditItemOptionModal.vue'
import { addNewListItem } from "~/services/newListData.js";
import { sampleDataSources } from "~/services/sampleDataSources.js";

const allDataSources = ref([]);

const copiedList = ref(JSON.parse(JSON.stringify(addNewListItem.value)));
const toast = useToast();
const visible = ref(false);
const openDeleteModal = ref(false);
const editableItem = ref();
const tableData = ref([]);
const deleteItem = ref();

const searchQuery = ref("");
const filteredLists = ref(addNewListItem.value);

const filteredList = computed(() => {
  const filterItems = (items, fn) => {
    return items.reduce((r, o) => {
      const sublists = filterItems(o.sublists || [], fn);
      if (fn(o) || sublists.length)
        r.push(Object.assign({}, o, sublists.length && { sublists }));
      return r;
    }, []);
  };

  if (!searchQuery.value) return copiedList.value;
  return filterItems(addNewListItem.value, (item) => {
    return item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

watch(searchQuery, (newValue) => {
  if (newValue === "") filteredLists.value = addNewListItem.value;
  else filteredLists.value = filteredList.value;
});

// function highlight(data) {
//   if (searchQuery.value) {
//     const pattern = new RegExp(searchQuery.value, 'i')
//     const highlightedData = data.replace(
//       pattern,
//             `<span class="bg-primary-100 capitalize">${searchQuery.value}</span>`,
//     )
//     return highlightedData
//   }
// }

onMounted(() => {
  // tableData.value = sampleDataSources.value
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  list_elements: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});
function handleCreateDataSource(data) {
  allDataSources.value = [
    ...allDataSources.value,
    { ...data, type: "Data table", index: allDataSources.value?.length + 1 },
  ];
  visible.value = false;
}
function handleUpdateDataSource(data) {
  if (data?.isEditable) {
    allDataSources.value = allDataSources.value?.map((d) => {
      if (d?.index === data?.index) return { ...data, type: "Data table" };
      else return d;
    });

    visible.value = false;
  }
}
watch(allDataSources, (newVal) => {
  tableData.value = newVal;
});
function handleCreateList(data) {
  // data is new list created from createListModal
  const { listName, listItems } = data;
  const newSubitems = [];

  listItems.forEach((listitem, index) => {
    const newsubitem = {
      id: index + 1,
      title: listitem.name,
      isHovered: false,
      opensubmenu: false,
      sublists: [],
    };
    newSubitems.push(newsubitem);
  });

  const newList = {
    id: addNewListItem.value.length + 1,
    title: listName,
    isHovered: false,
    opensubmenu: true,
    level: 0,
    sublists: newSubitems,
  };

  addNewListItem.value.push(newList);
}

function handleEditItem(data) {
  editableItem.value = data;
  visible.value = true;
}

function handleOpenDelete(data) {
  deleteItem.value = data;
  openDeleteModal.value = true;
}

function handleDelete() {
  allDataSources.value = allDataSources.value.filter(
    (item) => item.index !== deleteItem.value.index
  );
  openDeleteModal.value = false;
}

function onRowReorder(event) {
  allDataSources.value = event;
}

function showSuccess() {
  toast.add({
    severity: "success",
    summary: "Success Message",
    detail: "List successfully created.",
    life: 3000,
  });
}
</script>

<style scoped>
.highlight {
  background-color: yellow;
  color: black;
}
</style>
