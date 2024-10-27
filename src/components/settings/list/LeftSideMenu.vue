<template>
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

    <ejs-treeview
      :fields="treeFields"
      @nodeClicked="onNodeClicked"
      @nodeDragStop="onNodeDragStop"
      :allowDragAndDrop="true"
      cssClass="font-poppins text-lg text-gray-500"
    ></ejs-treeview>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { addNewListItem } from "~/services/newListData.js";

const transformData = (items) => {
  return items.map((item) => ({
    nodeId: item.path,
    nodeText: item.title,
    nodeChild: item.sublists ? transformData(item.sublists) : [],
    cssClass:
      item.sublists && item.sublists.length > 0 ? "clickable" : "non-clickable",
  }));
};

const props = defineProps({
  tableData: Object,
  filters: Object,
  visible: Boolean,
  findItemByPath: Function,
});

const emit = defineEmits([
  "update:visible",
  "update:tableData",
  "handleopensubmenu",
]);

const searchQuery = ref("");
const filteredLists = ref(addNewListItem.value);
const copiedList = ref(JSON.parse(JSON.stringify(addNewListItem.value)));
const treeData = ref(transformData(filteredLists.value));
const treeFields = ref({
  dataSource: treeData,
  id: "nodeId",
  text: "nodeText",
  child: "nodeChild",
});

console.log("treeFields", treeFields.value);

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
  if (newValue === "") {
    filteredLists.value = addNewListItem.value;
  } else {
    filteredLists.value = filteredList.value;
  }
});

watch(
  filteredLists,
  (newValue) => {
    treeData.value = transformData(newValue);
  },
  { deep: true }
);

watch(
  treeData,
  (newValue) => {
    treeFields.value = {
      dataSource: newValue,
      id: "nodeId",
      text: "nodeText",
      child: "nodeChild",
    };
  },
  { deep: true }
);

watch(addNewListItem, (newValue) => {
  filteredLists.value = JSON.parse(JSON.stringify(newValue));
});

const onNodeClicked = (args) => {
  const clickedNode = args.node;
  console.log("clickedNode", clickedNode);
  const nodeId = clickedNode.getAttribute("data-uid");
  const clickedItem = props.findItemByPath(
    addNewListItem.value,
    nodeId,
    "treeView"
  );

  const treeView = document.querySelector(".e-treeview");
  const activeNodes = treeView.querySelectorAll(".e-active");
  activeNodes.forEach((node) => node.classList.remove("e-active"));
  clickedNode.classList.add("e-active");

  if (
    !clickedItem ||
    !clickedItem.sublists ||
    clickedItem.sublists.length === 0
  ) {
    args.event.preventDefault();
    return;
  }
  if (clickedItem) {
    emit("handleopensubmenu", clickedItem);
  }
};

const onNodeDragStop = (args) => {
  const draggedNodeId = args.draggedNodeData.id;
  const droppedNodeId = args.droppedNodeData.id;
  const dropPosition = args.position;

  const draggedItem = props.findItemByPath(
    addNewListItem.value,
    draggedNodeId,
    "treeView"
  );
  removeItemByPath(addNewListItem.value, draggedNodeId);

  const droppedItem = props.findItemByPath(
    addNewListItem.value,
    droppedNodeId,
    "treeView"
  );

  if (dropPosition === "Before") {
    insertBefore(addNewListItem.value, droppedItem, draggedItem);
  } else if (dropPosition === "After") {
    insertAfter(addNewListItem.value, droppedItem, draggedItem);
  } else if (dropPosition === "Inside") {
    insertInside(droppedItem, draggedItem);
  }

  updatePaths(addNewListItem.value);
  emit("update:addNewListItem", [...addNewListItem.value]);
  filteredLists.value = JSON.parse(JSON.stringify(addNewListItem.value));
  emit("update:tableData", { ...props.tableData });
};

const updatePaths = (list, parentPath = "") => {
  list.forEach((item, index) => {
    const newPath = parentPath ? `${parentPath}-${index + 1}` : `${index + 1}`;
    item.path = newPath;
    if (item.sublists && item.sublists.length > 0) {
      updatePaths(item.sublists, newPath);
    }
  });
};

const removeItemByPath = (list, path) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].path === path) {
      list.splice(i, 1);
      return true;
    }
    if (Array.isArray(list[i].sublists) && list[i].sublists.length > 0) {
      const found = removeItemByPath(list[i].sublists, path);
      if (found) {
        return true;
      }
    }
  }
  return false;
};

const insertBefore = (list, referenceItem, newItem) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].path === referenceItem.path) {
      list.splice(i, 0, newItem);
      return true;
    }
    if (Array.isArray(list[i].sublists) && list[i].sublists.length > 0) {
      const found = insertBefore(list[i].sublists, referenceItem, newItem);
      if (found) {
        return true;
      }
    }
  }
  return false;
};

const insertAfter = (list, referenceItem, newItem) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].path === referenceItem.path) {
      list.splice(i + 1, 0, newItem);
      return true;
    }
    if (Array.isArray(list[i].sublists) && list[i].sublists.length > 0) {
      const found = insertAfter(list[i].sublists, referenceItem, newItem);
      if (found) {
        return true;
      }
    }
  }
  return false;
};

const insertInside = (parentItem, newItem) => {
  if (!Array.isArray(parentItem.sublists)) {
    parentItem.sublists = [];
  }
  parentItem.sublists.push(newItem);
};

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

const updateSearchQuery = (event) => {
  searchQuery.value = event.target.value;
};
</script>

<style scoped>
::v-deep .e-treeview .e-list-text {
  font-family: 'Poppins', sans-serif; /* font-poppins */
  font-weight: 400; /* font-normal */
  font-size: 14px !important; /* Ensure font size is applied */
  color: #4B5563 !important; /* Ensure color is applied */
}

::v-deep .clickable .e-list-text {
  cursor: pointer;
}

::v-deep .e-active > .e-text-content > .e-list-text {
  color: #009EE2 !important; 
}
::v-deep .e-drag-item.e-dragging::before {
  background-color: #009EE2 !important; /* Change the color of the drag indicator dot */
}

::v-deep .non-clickable .e-list-text {
  pointer-events: none;
  color: #4B5563 !important; /* Ensure color is applied */
  cursor: not-allowed; /* Change the cursor to not-allowed for non-clickable nodes */
}
</style>
