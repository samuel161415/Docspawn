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

    <div class="flex justify-left mt-3 pl-1">
      <Button
        :icon="isAllExpanded ? 'pi pi-minus' : 'pi pi-plus'"
        :label="isAllExpanded ? 'Collapse' : 'Expand'"
        class="p-button-success w-48"
        outlined
        @click="toggleExpandCollapse"
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
      cssClass="font-poppins text-lg text-gray-500 py-2"
    ></ejs-treeview>
  </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from "vue";
import { useToast } from "primevue/usetoast";
import { addNewListItem } from "~/services/newListData.js";

const transformData = (items) => {
  return items.map((item) => ({
    nodeId: item.path,
    nodeText: item.title,
    nodeChild: item.isSublistSimple ? (item.sublists ? transformData(item.sublists) : []) : [],
    iconCss: item.isSublistSimple ? "" : "pi pi-file-excel text-success",
    cssClass:
      item.sublists && item.sublists.length > 0 ? "clickable" : "non-clickable",
  }));
};
const nodeTemplate = (data) => {
  return `<span>${data.nodeText} <i class="${data.iconCss}" style="margin-right: 5px;"></i></span>`;
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
  iconCss: "iconCss",
  nodeTemplate: nodeTemplate,
});


const filteredList = computed(() => {
  const filterItems = (items, fn) => {
    return items.reduce((result, item) => {
      const sublists = filterItems(item.sublists || [], fn);
      if (fn(item)) {
        // If the item itself matches, include it with all its sublists
        result.push(Object.assign({}, item, { sublists: item.sublists }));
      } else if (sublists.length) {
        // If any sublists match, include only the matching sublists
        result.push(...sublists);
      }
      return result;
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
    console.log("searchQuery",searchQuery)
    console.log("filteredLists",filteredLists.value)
    console.log("single filteredList",filteredList.value)
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
  const nodeId = clickedNode.getAttribute("data-uid");
  console.log("clicked node",nodeId)
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
  const droppedNodeData = args.droppedNodeData;

  // Check if droppedNodeData is null
  if (!droppedNodeData) {
    console.error("Dropped node data is null");
    return;
  }

  const droppedNodeId = droppedNodeData.id;
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

  // Expand the parent node of the dropped item
  // expandParentNodeById(droppedNodeId);
};

const isAllExpanded = ref(false);

const toggleExpandCollapse = () => {
  nextTick(() => {
    const treeView = document.querySelector(".e-treeview");
    if (treeView && treeView.ej2_instances && treeView.ej2_instances[0]) {
      if (isAllExpanded.value) {
        treeView.ej2_instances[0].collapseAll();
      } else {
        treeView.ej2_instances[0].expandAll();
      }
      isAllExpanded.value = !isAllExpanded.value;
    }
  });
};

const expandParentNodeById = (nodeId) => {
  nextTick(() => {
    setTimeout(() => {
      const treeView = document.querySelector(".e-treeview");
      console.log("treeView", treeView);
      const node = treeView.querySelector(`[data-uid="${nodeId}"]`);
      console.log('nodeId', nodeId);
      console.log("node ", node);
      if (node) {
        const parentNode = node.closest('li.e-list-item.e-level-1');
        console.log("parentNode ", parentNode);
        if (parentNode) {
          try {
            treeView.ej2_instances[0].expandNode(parentNode);
          } catch (error) {
            console.error("Error expanding parent node:", error);
          }
        } else {
          console.warn("Parent node not found for nodeId:", nodeId);
        }
      } else {
        console.warn("Node not found for nodeId:", nodeId);
      }
    }, 500); // Adjust the delay as needed
  });
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


</script>

<style scoped>


::v-deep .e-treeview .e-ul .e-level-1 {
  margin-left: -14px !important
}

::v-deep .e-treeview .e-list-text {
  font-family: "Poppins", sans-serif; /* font-poppins */
  font-weight: 400; /* font-normal */
  font-size: 14px !important; /* Ensure font size is applied */
  color: #4b5563 !important; /* Ensure color is applied */
}

::v-deep .clickable .e-list-text {
  cursor: pointer;
}

::v-deep .e-active > .e-text-content > .e-list-text {
  color: #009ee2 !important;
}
::v-deep .e-drag-item.e-dragging::before {
  background-color: #009ee2 !important; /* Change the color of the drag indicator dot */
}

::v-deep .non-clickable .e-list-text {
  pointer-events: none;
  color: #4b5563 !important; /* Ensure color is applied */
  cursor: not-allowed; /* Change the cursor to not-allowed for non-clickable nodes */
}
</style>
