<template>
  <!-- md:max-w-[30vw] -->
  <div
    class="min-w-80 flex  flex-col items-center justify-between h-full overflow-y-scroll overflow-x-auto pt-5  no-scrollbar"
  >
    <div class="flex max-md:justify-center ml-1 ">
      <Button
        icon="pi pi-plus"
        label="Create new list"
        outlined
        class="text-success text-center border-success whitespace-nowrap hover:bg-green-50 hover:border-success w-64 flex justify-center items-center"
        @click="visible = true"
      />
    </div>

    <div class="flex justify-left mt-3 pl-1">
      <Button
        :icon="isAllExpanded ? 'pi pi-minus' : 'pi pi-plus'"
        :label="isAllExpanded ? 'Collapse' : 'Expand'"
        class="p-button-success text-center w-64 whitespace-nowrap flex justify-center items-center"
        outlined
        @click="toggleExpandCollapse"
      />
    </div>

    <div class="mt-4 flex max-md:justify-center">
      <span class="relative flex h-10 ml-1">
        <i
          class="pi pi-search absolute top-2/4 -mt-2 left-2 text-surface-400 dark:text-surface-600 text-sm"
          style="color: rgb(117, 119, 120)"
        ></i>
        <InputText
          v-model="searchQuery"
          placeholder="Search"
          class="pl-7 w-64 font-normal rounded-md font-poppins"
        />
      </span>
    </div>

    <div
      class="w-64 py-2   flex justify-center items-start overflow-x-hidden "
    >
      <TreeViewComponent
        :fields="treeFields"
        @nodeClicked="onNodeClicked"
        @nodeDragStop="onNodeDragStop"
        :allowDragAndDrop="true"
        @created="onTreeViewCreated"
        @destroyed="onTreeViewDestroyed"
        @nodeCollapsing="onNodeCollapsing"
      ></TreeViewComponent>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, nextTick } from "vue";
import { useToast } from "primevue/usetoast";
import { addNewListItem } from "~/services/newListData.js";
import { TreeViewComponent } from "@syncfusion/ej2-vue-navigations";

const transformData = (items, expandedPath = null) => {
  return items.filter((item) =>item.sublists && item.sublists.length > 0)
  .map((item) => ({
    nodeId: item.path,
    nodeText: item.title,
    nodeChild: item.isSublistSimple
      ? item.sublists
        ? transformData(item.sublists)
        : []
      : [],
      expanded: item.path === expandedPath,
    iconCss: item.isSublistSimple
      ? ""
      : "pi pi-file-excel   excel-icon ",
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
const treeData = ref([
  {
    nodeId: "root",
    nodeText: "Lists",
    nodeChild: transformData(filteredLists.value),
    expanded: true,
    // iconCss: "pi pi-folder",
  },
]);

const treeFields = ref({
  dataSource: treeData,
  id: "nodeId",
  text: "nodeText",
  child: "nodeChild",
  iconCss: "iconCss",
  // nodeTemplate: nodeTemplate,
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
  } else {;
    filteredLists.value = filteredList.value;
  }
});

watch(
  filteredLists,
  (newValue) => {
    console.log("wath filteredlist excution ")
    treeData.value = [
      {
        nodeId: "root",
        nodeText: "Lists",
        nodeChild: transformData(newValue, props.tableData.path),
        expanded: true,
        // iconCss: "pi pi-folder",
      },
    ];
  },
  { deep: true }
);

watch(
  treeData,
  (newValue) => {
    console.log('treeData watch is called');
    if (newValue.length > 0 && newValue[0].nodeId === "root") {
      newValue[0].expanded = true; // Ensure the root node is always expanded
    }
    treeFields.value = {
      dataSource: newValue,
      id: "nodeId",
      text: "nodeText",
      child: "nodeChild",
    };
    nextTick(() => {
      const treeView = document.querySelector(".e-treeview");
      if (treeView && treeView.ej2_instances && treeView.ej2_instances[0]) {
        treeView.ej2_instances[0].expandAll();
      } else {
        console.warn("TreeView instance not found");
      }
    });
  },
  { deep: true }
);

watch(addNewListItem, (newValue) => {
  filteredLists.value = JSON.parse(JSON.stringify(newValue));
},{ deep: true });



const onNodeClicked = (args) => {
  const clickedNode = args.node;
  const nodeId = clickedNode.getAttribute("data-uid");
  const clickedItem =
    nodeId === "root"
      ? { path: "root" }
      : props.findItemByPath(addNewListItem.value, nodeId, "treeView");

  const treeView = document.querySelector(".e-treeview");
  const activeNodes = treeView.querySelectorAll(".e-active");
  activeNodes.forEach((node) => node.classList.remove("e-active"));
  clickedNode.classList.add("e-active");

  if (
    clickedItem &&
    clickedItem?.path !== "root" &&
    (!clickedItem.sublists || clickedItem.sublists.length === 0)
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
    args.cancel = true; // Cancel the drag-and-drop operation
    return;
  }

  const droppedNodeId = droppedNodeData.id;
  const dropPosition = args.position;
  console.log('droped node id',droppedNodeId)

  // Prevent dragging and dropping outside the root folder
  if (droppedNodeId === "root" && dropPosition !== "Inside") {
    console.warn("Cannot drop outside the root folder");
    args.cancel = true; // Cancel the drag-and-drop operation
    return;
  }

  // Prevent dragging and dropping above the root folder
  if (dropPosition === "Before" && droppedNodeId === "root") {
    console.warn("Cannot drop above the root folder");
    args.cancel = true; // Cancel the drag-and-drop operation
    return;
  }

  // Prevent dragging and dropping to the same level as the root folder
  if (dropPosition === "After" && droppedNodeId === "root") {
    console.warn("Cannot drop to the same level as the root folder");
    args.cancel = true; // Cancel the drag-and-drop operation
    return;
  }

  // Prevent dragging the root node to any other node
  if (draggedNodeId === "root") {
    console.warn("Cannot drag the root node to any other node");
    args.cancel = true; // Cancel the drag-and-drop operation
    return;
  }

  // Prevent dragging a parent to its child
  const draggedItem = props.findItemByPath(
    addNewListItem.value,
    draggedNodeId,
    "treeView"
  );
  const droppedItem = props.findItemByPath(
    addNewListItem.value,
    droppedNodeId,
    "treeView"
  );


  if (isDescendant(draggedItem, droppedItem)) {
    console.warn("Cannot drop a parent node to its child");
    args.cancel = true; // Cancel the drag-and-drop operation
    return;
  }

  removeItemByPath(addNewListItem.value, draggedNodeId);

  if (dropPosition === "Before") {
    insertBefore(addNewListItem.value, droppedItem, draggedItem);
  } else if (dropPosition === "After") {
    insertAfter(addNewListItem.value, droppedItem, draggedItem);
  } else if (dropPosition === "Inside") {
    insertInside(droppedItem, draggedItem, droppedNodeId);
  }

  updatePaths(addNewListItem.value);
  emit("update:addNewListItem", [...addNewListItem.value]);
  filteredLists.value = JSON.parse(JSON.stringify(addNewListItem.value));
  emit("update:tableData", { ...props.tableData });

  // Expand the parent node of the dropped item
  // expandParentNodeById(droppedNodeId);
};

const isDescendant = (parent, child) => {
  if (!parent || !child) return false;
  if (parent.path === child.path) return true;
  if (!parent.sublists || parent.sublists.length === 0) return false;
  return parent.sublists.some((sublist) => isDescendant(sublist, child));
};

const onTreeViewCreated = () => {
  try {
    console.log("I am on create view")
    // Any additional setup can be done here
    nextTick(() => {
      setTimeout(() => {
        const treeView = document.querySelector(".e-treeview");
        if (treeView && treeView.ej2_instances && treeView.ej2_instances[0]) {
          treeView.ej2_instances[0].expandAll();
          const rootNode = treeView.querySelector('[data-uid="root"]');
          if (rootNode) {
            try {
              rootNode.classList.add("e-active"); // Make the root node active
            } catch (error) {
              console.error("Error expanding root node:", error);
            }
        }  else {
          console.warn("root node is no instance not found");
        }
      
        } else {
          console.warn("TreeView instance not found");
        }
      }, 100); // Adjust the delay as needed
    });
  } catch (error) {
    console.error("Error during TreeView creation:", error);
  }
};

const onTreeViewDestroyed = () => {
  try {
    // Any cleanup can be done here
    console.log("TreeView destroyed successfully");
  } catch (error) {
    console.error("Error during TreeView destruction:", error);
  }
};

const isAllExpanded = ref(true);

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

const onNodeCollapsing = (args) => {
  // Prevent collapsing for the root node
  console.log("prenvent collapsing is called")
  if (args.node.getAttribute("data-uid") === "root") {
    args.cancel = true;
  }
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

const insertInside = (parentItem, newItem, droppedNodeId) => {
  if (droppedNodeId === "root") {
    // Handle the case where the parentItem is the root node
    newItem.path = `${addNewListItem.value.length + 1}`;
    addNewListItem.value.push(newItem);
  } else {
    if (!Array.isArray(parentItem.sublists)) {
      parentItem.sublists = [];
    }
    newItem.path = `${parentItem.path}-${parentItem.sublists.length + 1}`;
    parentItem.sublists.push(newItem);
  }
};

</script>



<style scoped>
:deep(.e-treeview) {
  max-height: 370px; /* Set the fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  -ms-overflow-style: none; /* Hide scrollbar in Internet Explorer and Edge */
  /* scrollbar-width: none; */
  overflow-x: auto;
  width: 100%;
  
  
}
:deep(.p-button-label) {
  margin-left: 10px; /* or padding-left: 10px; */
  flex: none; /* Remove flex-1 */
}
:deep(.e-treeview .e-fullrow) {
  background-color: transparent !important;
  border: none;
}

:deep(.e-treeview .e-text-content) {
  /* padding:0 !important; */
  padding-left: 10px;
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: start;
  /* margin-left:8px; */
  /* background-color: yellow; */
}
/* I had to use this to make the cssIcon to be next to nodetext as pi-excel doesn't have e-icon-wrapper */
:deep(.e-treeview .e-icon-wrapper) {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: start;
  width : 16rem;
}


:deep(.e-active > .e-icon-wrapper) {
  background-color: #eeeeee !important;
  padding-top: 3px;
  padding-bottom: 3px;
  color: #009ee2 !important;

}
:deep(.e-treeview .e-list-item .e-ul) {
  padding: 0px 0px 0px 26px !important;
}

:deep(.e-treeview .e-ul .e-level-1) {
  margin-left: -20px !important;
}

:deep(.e-treeview .e-list-text) {
  font-family: "Poppins", sans-serif; /* font-poppins */
  font-weight: 400; /* font-normal */
  font-size: 14px !important; /* Ensure font size is applied */
  color: #4b5563 !important; /* Ensure color is applied */
  padding: 0 !important;
  padding-left: 9px !important;
  /* border : solid blue 1.5px */
}


:deep(.e-icons) {
  margin-left: 0px !important;
  padding: 0 !important;
  padding-right: 0 !important;

  /* border : solid red 1.5px */
}
:deep(.e-treeview .e-list-icon) {
  width: 0 !important;
  margin: 0 !important;
  height: 5px !important;

}
:deep(.e-treeview .excel-icon){

  font-size: 13px;
  padding: 0 0px 13px 4px;
  text-align: center;


}

:deep(.e-active > .e-text-content > .e-list-text) {
  color: #009ee2 !important;
}
:deep(.e-active > .e-text-content > .e-list-icon) {
  color: #009ee2 !important;
}
:deep(.e-active > .e-text-content > .e-icons) {
  color: #009ee2 !important;
}
:deep(.e-drag-item.e-dragging::before) {
  background-color: #009ee2 !important; /* Change the color of the drag indicator dot */
}
</style>
