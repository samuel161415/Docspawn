<template>
  <div class="w-full flex bg-white overflow-scroll no-scrollbar">
    <div class="px-4 py-2 rounded-md bg-white w-full">
      <p class="font-semibold text-surface-700 text-xl my-5 ml-1">List</p>
      <div class="flex flex-col md:flex-row md:justify-between w-full">
        <!-- left side menu -->
        <div
          class="flex md:max-w-[30vw] flex-col justify-between h-full overflow-y-scroll pt-5 no-scrollbar"
        >
          <div class="flex max-md:justify-center ml-1">
            <Button
              icon="pi pi-plus"
              label="Create new list"
              outlined
              class="text-success border-success hover:bg-green-50 hover:border-success max-md:w-3/4 w-48"
              @click="visible = true"
            />
          </div>

          <div class="mt-4 flex max-md:justify-center">
            <span class="relative flex h-10 ml-1 max-md:w-3/4">
              <i
                class="pi pi-search absolute top-2/4 -mt-2 left-2 text-surface-400 dark:text-surface-600 text-sm"
                style="color: rgb(117, 119, 120)"
              ></i>
              <InputText
                v-model="searchQuery"
                placeholder="Search"
                class="pl-7 font-normal rounded-md border-gray-300 font-poppins max-md:w-full w-48"
              />
            </span>
          </div>

          <ul class="">
            <li
              v-for="items in filteredLists"
              :key="items.title"
              class="cursor-pointer flex flex-col max-md:items-center mt-4 w-full mr-4"
            >
              <div
                :key="items.title"
                class="flex max-md:justify-start max-md:w-3/4 px-2 py-2 ml-1 hover:bg-surface-100 rounded font-poppins"
                @click="handleopensubmenu(items)"
              >
                <i
                  class="pt-1 text-gray-500"
                  :class="{
                    'pi pi-chevron-down': items.opensubmenu,
                    'text-primaryBlue': items.title === tableData.title,
                    'pi pi-chevron-right': !items.opensubmenu,
                  }"
                  @click="items.opensubmenu = !items.opensubmenu"
                ></i>
                <span
                  class="text-lg font-normal ml-3"
                  v-html="highlight(items.title) || items.title"
                  :class="{
                    'text-surface-600': items.isHovered,
                    'text-primaryBlue': items.title === tableData.title,
                    'text-gray-500': !items.isHovered,
                  }"
                />
              </div>

              <ul
                v-if="items.opensubmenu"
                class="ml-3 flex flex-col max-md:w-3/4"
              >
                <li v-for="subItem in items.sublists" :key="subItem.id">
                  <div
                    v-if="subItem?.sublists && subItem.sublists.length > 0"
                    :key="subItem.id"
                    class="flex py-2 pl-1 hover:bg-surface-100 ml-4 font-poppins"
                    @click="handleopensubmenu(subItem)"
                  >
                    <i
                      class="text-gray-500"
                      :class="{
                        'pi pi-chevron-down': subItem.opensubmenu,
                        'text-primaryBlue': subItem.title === tableData.title,
                        'pi pi-chevron-right': !subItem.opensubmenu,
                      }"
                      @click="subItem.opensubmenu = !subItem.opensubmenu"
                    ></i>

                    <p
                      class="text-base font-normal ml-3 text-gray-500"
                      :class="{
                        'text-primaryBlue': subItem.title === tableData.title,
                      }"
                      v-html="highlight(subItem.title) || subItem.title"
                    ></p>
                  </div>

                  <ul v-if="subItem.opensubmenu" class="ml-3">
                    <li
                      v-for="subsubItem in subItem.sublists"
                      :key="subsubItem.title"
                    >
                      <div
                        v-if="
                          subsubItem?.sublists && subsubItem.sublists.length > 0
                        "
                        :key="subsubItem.title"
                        class="ml-5 font-poppins flex py-2 pl-1 hover:bg-surface-100 items-center"
                        @click="handleopensubmenu(subsubItem)"
                      >
                        <i
                          class="text-gray-500"
                          :class="{
                            'pi pi-chevron-down': subsubItem.opensubmenu,
                            'text-primaryBlue':
                              subsubItem.title === tableData.title,
                            'pi pi-chevron-right': !subsubItem.opensubmenu,
                          }"
                          @click="
                            subsubItem.opensubmenu = !subsubItem.opensubmenu
                          "
                        ></i>
                        <p
                          class="text-base font-normal ml-4 text-gray-500"
                          :class="{
                            'text-primaryBlue':
                              subsubItem.title === tableData.title,
                          }"
                          v-html="
                            highlight(subsubItem.title) || subsubItem.title
                          "
                        ></p>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- right section -->
        <div class="w-full md:max-w-[70vw] py-5 ml-2">
          <div class="mb-12 max-w-[70vw]">
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
              c_level="0"
            />

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
import { ref, watch } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useToast } from "primevue/usetoast";
import DataTableComponent from "~/components/settings/list/Table.vue";
import TempTable from "~/components/settings/list/TempTable.vue";
import CreateListModal from "~/components/settings/list/CreateListModal.vue";
import AddItemsModal from "~/components/settings/list/AddItemsModal.vue";
import EditItemOptionModal from "~/components/settings/list/EditItemOptionModal.vue";
import ListOptionModal from "~/components/settings/list/ListOptionModal.vue";
import CreateSublistModal from "~/components/settings/list/CreateSublistModal.vue";
import { addNewListItem } from "~/services/newListData.js";

const copiedList = ref(JSON.parse(JSON.stringify(addNewListItem.value)));

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
const currentListTitle = ref()
const isSublistSimple = ref(true);
// sublist id
const sublistId = ref();
const sublistPath = ref();
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

watch(searchQuery, (newValue, oldValue) => {
  if (newValue === "") {
    filteredLists.value = addNewListItem.value;
  } else {
    filteredLists.value = filteredList.value;
  }
});

const highlight = (data) => {
  if (searchQuery.value) {
    const pattern = new RegExp(searchQuery.value, "i");
    const highlightedData = data.replace(
      pattern,
      `<span class="bg-primary-100 capitalize">${searchQuery.value}</span>`
    );
    return highlightedData;
  }
};

const handleopensubmenu = (clickedItem) => {
  tableData.value = clickedItem;
};

onMounted(() => {
  tableData.value = addNewListItem.value[0];
  // console.log("tableData after update", tableData.value);
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
  // console.log(
  //   "createSubList called",
  //   "data",
  //   data,
  //   "data.id",
  //   data.id,
  //   "data.level",
  //   data.level,
  //   "title",
  //   data.title,
  //   "path",
  //   data.path
  // );
  openItemOptions.value = false;
  openCreateSubList.value = true;
  sublistId.value = data.id;
  currentListLevel.value = data.level;
  sublistPath.value = data.path; // Store the unique path
  currentListTitle.value = data.title;
};

const handleCreateSubSublist = (data) => {
  isSublistSimple.value = data.isSublistSimple;



  // Update tableData
  const tableDataList = findItemByPath(tableData.value, sublistPath.value);
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
  }
};
const findItemByPath = (list, path) => {
  if (list.path === path) {
    return list;
  }
  if (Array.isArray(list.sublists)) {
    for (const sublist of list.sublists) {
      const found = findItemByPath(sublist, path);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

const handleEditItem = (data) => {
  editableItem.value = data;
  openItemOptions.value = true;

  // Update addNewListItem
  const itemToEditInAddNewListItem = findItemByPath(
    addNewListItem.value,
    data.path
  );
  if (itemToEditInAddNewListItem) {
    itemToEditInAddNewListItem.title = data.title;
  }

  // Update tableData
  const itemToEditInTableData = findItemByPath(tableData.value, data.path);
  if (itemToEditInTableData) {
    itemToEditInTableData.title = data.title;
  }

  // Force reactivity update
  tableData.value = { ...tableData.value };
};

//
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
</style>
