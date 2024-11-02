<template>
  <div class="w-full flex bg-white overflow-scroll no-scrollbar">
    <div class="px-4 py-2 rounded-md bg-white w-full">
      <p class="font-semibold text-surface-700 text-xl my-5 ml-1">List</p>
      <div class="flex flex-col md:flex-row md:justify-between w-full">
        <!-- left side menu -->
        <LeftSideMenu
          :tableData="tableData"
          :filters="filters"
          :visible="visible"
          :findItemByPath="findItemByPath"
          @update:visible="visible = $event"
          @update:searchQuery="searchQuery = $event"
          @update:filteredLists="filteredLists = $event"
          @update:tableData="tableData = $event"
          @handleopensubmenu="handleopensubmenu"
        />

        <!-- right section -->
        <!-- md:max-w-[70vw] -->
        <div class="w-full  py-2 ml-2">
          <div class="mb-12 md:w-full relative  overflow-y-auto">
            <!-- Iterate over addNewListItem to call DataTableComponent for each list initially -->
            <template v-if="isInitialLoad">
              <DataTableComponent
                v-for="list in addNewListItem"
                :key="list.id"
                :tableData="list"
                :filters="filters"
                @row-reorder="onRowReorder"
                @edit-item="handleEditItem"
                @open-delete="handleOpenDelete"
                @open-add-items="handleOpenAddItems"
                @open-list-options="openListOptions = true"
                @open-create-sublist-modal="createSubList"
                calledFrom="root"
                :c_level="0"
              />
            </template>

            <!-- Call DataTableComponent with the selected value when a list is selected -->
            <template v-else>
              <DataTableComponent
                :tableData="tableData"
                :filters="filters"
                @row-reorder="onRowReorder"
                @edit-item="handleEditItem"
                @open-delete="handleOpenDelete"
                @open-add-items="handleOpenAddItems"
                @open-list-options="openListOptions = true"
                @open-create-sublist-modal="createSubList"
                calledFrom="root"
                :c_level="0"
              />
            </template>

            <Toast />
          </div>
        </div>
      </div>
    </div>

    <!-- components -->
    <Toast />
    <CreateListModal
      v-if="visible"
      v-model:visible="visible"
      @createList="handleCreateList"
      @cancel="visible = false"
      @error="showError"
      @success="showSuccess"
    />

    <CreateSublistModal
      v-if="openCreateSubList"
      v-model:visible="openCreateSubList"
      :level="currentListLevel"
      :title="currentListTitle"
      @createSubSubList="handleCreateSubSublist"
      @cancel="openCreateSubList = false"
    />

    <AddItemsModal
      v-model:visible="openAddItems"
      :listTitle="addItemsTitle"
      @addItems="handleAddItems"
      @cancel="openAddItems = false"
    />

    <ListOptionModal
      v-if="openListOptions"
      v-model:visible="openListOptions"
      @cancel="openListOptions = false"
      v-model:tableData="tableData"
    />

    <EditItemOptionModal
      v-if="editableItem"
      v-model:visible="openItemOptions"
      @editItem="handleEditItem"
      v-model:editableItem="editableItem"
      @cancel="openItemOptions = false"
      @openCreateListModal="createSubList"
    />

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
        ></Button>
        <Button
          type="button"
          label="Delete"
          severity="error"
          @click="handleDelete"
          class="bg-error hover:bg-red-500 hover:border-error text-white"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useToast } from "primevue/usetoast";
import DataTableComponent from "~/components/settings/list/Table.vue";
import CreateListModal from "~/components/settings/list/CreateListModal.vue";
import AddItemsModal from "~/components/settings/list/AddItemsModal.vue";
import EditItemOptionModal from "~/components/settings/list/EditItemOptionModal.vue";
import ListOptionModal from "~/components/settings/list/ListOptionModal.vue";
import CreateSublistModal from "~/components/settings/list/CreateSublistModal.vue";
import { addNewListItem } from "~/services/newListData.js";
import LeftSideMenu from "~/components/settings/list/LeftSideMenu.vue";

const toast = useToast();
const visible = ref(false);
const openAddItems = ref(false);
const addItemsTitle = ref("");
const openListOptions = ref(false);
const openItemOptions = ref(false);
const openDeleteModal = ref(false);
const editableItem = ref();
const tableData = ref({});
const deleteItem = ref();
const openCreateSubList = ref(false);
const currentListLevel = ref();
const currentListTitle = ref();
const isSublistSimple = ref(true);
const sublistId = ref();
const sublistPath = ref();
const searchQuery = ref("");
const filteredLists = ref(addNewListItem.value);
const isInitialLoad = ref(true); // Track if the page is loaded initially

const handleopensubmenu = (clickedItem) => {
  tableData.value = clickedItem;
  isInitialLoad.value = false; // Update the state to indicate that a list is selected
};

onMounted(() => {
  tableData.value = addNewListItem.value[0];
});

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  list_elements: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});

// this is emitted from editItemOptionModal
const createSubList = (data) => {
  openItemOptions.value = false;
  openCreateSubList.value = true;
  sublistId.value = data.id;
  currentListLevel.value = data.level;
  sublistPath.value = data.path; // Store the unique path
  currentListTitle.value = data.title;
};

const handleCreateSubSublist = (data) => {
  isSublistSimple.value = data.isSublistSimple;
  console.log("data.name", data.name);
  // Update tableData
  const tableDataList = findItemByPath(
    tableData.value,
    sublistPath.value,
    "tableEdit"
  );
  if (tableDataList) {
    const newSublistItems = data.sublistItems.map((item, index) => {
      if (isSublistSimple.value) {
        const newPath =
          tableDataList.sublists.length === 0
            ? `${tableDataList.path}-1`
            : `${tableDataList.path}-${
                tableDataList.sublists.length + index + 1
              }`;
        return { ...item, path: newPath };
      } else {
        return { ...item };
      }
    });

    if (!isSublistSimple.value) {
      tableDataList.sublists = newSublistItems;
      tableDataList.name = data.name;
    } else {
      if (tableDataList.isSublistSimple) {
        tableDataList.sublists = Array.isArray(tableDataList.sublists)
          ? tableDataList.sublists.concat(newSublistItems)
          : newSublistItems;
      } else {
        tableDataList.sublists = newSublistItems;
      }
    }
    tableDataList.isSublistSimple = data.isSublistSimple;
    openCreateSubList.value = false;
    console.log("tableDataList", tableDataList);
  }
};
const findItemByPath = (list, path, from) => {
  if (from === "tableEdit") {
    console.log("list is ", list, " path is ", path);
    if (list.path === path) {
      return list;
    }
    if (Array.isArray(list.sublists)) {
      for (const sublist of list.sublists) {
        const found = findItemByPath(sublist, path, from);
        if (found) {
          return found;
        }
      }
    }
    return null;
  } else if (from === "treeView") {
    for (const item of list) {
      if (item.path === path) {
        return item;
      }
      if (Array.isArray(item.sublists) && item.sublists.length > 0) {
        const found = findItemByPath(item.sublists, path, from);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
};

const handleEditItem = (data) => {
  editableItem.value = data;
  openItemOptions.value = true;

  // Update addNewListItem
  const itemToEditInAddNewListItem = findItemByPath(
    tableData.value,
    data.path,
    "tableEdit"
  );
  if (itemToEditInAddNewListItem) {
    itemToEditInAddNewListItem.title = data.title;
  }

  // Update tableData
  const itemToEditInTableData = findItemByPath(
    tableData.value,
    data.path,
    "tableEdit"
  );
  if (itemToEditInTableData) {
    itemToEditInTableData.title = data.title;
  }

  // Force reactivity update
  tableData.value = { ...tableData.value };
};

const handleOpenAddItems = (title) => {
  addItemsTitle.value = title;
  openAddItems.value = true;
};

const handleCreateList = (data) => {
  // data is new list created from createListModal
  const { listName, listItems } = data;
  const newSubitems = [];

  listItems.map((listitem, index) => {
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
};

const handleAddItems = (data) => {
  const lastid = addNewListItem.value.length;
  data.map((item, index) => {
    const newItem = {
      id: lastid + index + 1,
      title: item.name,
      isHovered: false,
      level: tableData.value.level + 1,
      sublists: [],
    };

    tableData.value.sublists.push(newItem);
  });
};

const handleOpenDelete = (data) => {
  deleteItem.value = data;
  openDeleteModal.value = true;
};

const handleDelete = () => {
  tableData.value.sublists = tableData.value.sublists.filter(
    (item) => item.id !== deleteItem.value.id
  );
  openDeleteModal.value = false;
};

const onRowReorder = (event) => {
  tableData.value.sublists = event.value;
};

const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Success Message",
    detail: "List successfully created.",
    life: 3000,
  });
};
</script>

<style scoped>
.highlight {
  background-color: yellow;
  color: black;
}
/* :deep(.p-datatable-row-expansion) */
:deep(.e-list-text) {
  color: black; /* Default color for all text */
}

:deep(.clickable .e-list-text) {
  cursor: pointer;
}

/* ::v-deep .e-active .e-list-text {
  color: #009EE2 !important; 
} */

:deep(.non-clickable .e-list-text) {
  pointer-events: none;
  color: gray; /* Change the text color of non-clickable nodes to gray */
  cursor: not-allowed; /* Change the cursor to not-allowed for non-clickable nodes */
}
</style>

