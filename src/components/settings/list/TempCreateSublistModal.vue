<template>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    class="shadow-none w-[50vw] md:ww-[60vw]"
    :style="{ height: '90vh', overflow: 'hidden' }"
  >
    <template #header>
      <div class="flex justify-center items-center ml-5">
        <p class="font-semibold text-xl flex justify-center text-center">
          Create Sublist
        </p>
      </div>
    </template>

    <div class="h-full overflow-hidden">
      <!-- List Type Selection Buttons -->
      <div class="flex flex-col align-items-center gap-3 px-5 mb-5 mt-2">
        <label class="font-semibold w-6rem text-lg">List Type</label>
        <div class="flex gap-2">
          <button
            :class="[
              listType === 'simple'
                ? 'bg-success text-white hover:bg-success hover:border-success'
                : 'border border-success text-success hover:bg-primary-50  transition-all transform duration-200 ease-in-out ',
              'px-4 py-2 rounded-lg border ',
            ]"
            @click="listType = 'simple'"
          >
            Simple list
          </button>
          <button
            :class="[
              listType === 'dataSource'
                ? 'bg-success text-white hover:bg-success hover:border-success'
                : 'border border-success text-success hover:bg-primary-50  transition-all transform duration-200 ease-in-out ',
              'px-4 py-2 rounded-lg border ',
            ]"
            @click="listType = 'dataSource'"
          >
            Data source
          </button>
        </div>
      </div>

      <!-- Conditional Rendering of SublistCreator or DatasourceCreator -->
      <SublistCreator
        v-if="listType === 'simple'"
        :initialItems="sublistItems"
        :initialSublistName="sublistName"
        @SublistNameUpdated="sublistName = $event"
        @updateItems="sublistItems = $event"
      />

      <DatasourceCreator
        v-else
        :initialTableName="tableName"
        :initialFileName="fileName"
        :selectedFiles="selectedFiles"
        :hasError="hasError"
        :fileErrorText="fileErrorText"
        :dataSourceFileCompleteJSON="dataSourceFileCompleteJSON"
        :dataSourceColumnNames="dataSourceColumnNames"
        :dataSourceSelectedColumns="dataSourceSelectedColumns"
        :dataSourceSelectedRows="dataSourceSelectedRows"
        @fileSelected="onFileSelect"
        @tableNameUpdated="tableName = $event"
        @removeFiles="removeFiles"
        @handleDragEnter="handleDragEnter"
        @handleDragLeave="handleDragLeave"
        @handleDrop="handleDrop"
        @changeSelectedColumns="handleChangeSelectedColumns"
        @changeSelectedRows="handleChangeSelectedRows"
      />
    </div>

    <template #footer>
      <div class="flex justify-center items-center mt-6 h-full w-full">
        <Button
          label="Create sublist"
          icon="pi pi-check"
          :class="[
            'flex justify-center text-center',
            {
              'bg-success text-white hover:bg-success hover:border-success':
                (listType === 'simple' &&
                  sublistItems.length > 0 &&
                  sublistName) ||
                (listType === 'dataSource' &&
                  selectedFiles.length > 0 &&
                  tableName),
              'bg-gray-300 text-gray-500 disable':
                (listType === 'simple' &&
                  (sublistItems.length === 0 || !sublistName)) ||
                (listType === 'dataSource' &&
                  (selectedFiles.length === 0 || !tableName)),
            },
          ]"
          @click="handleCreateList"
          v-tooltip.top.html="{
            value: getTooltipMessage(),
            disabled: isTooltipDisabled(),
            escape: false,
          }"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import Button from "primevue/button";
import SublistCreator from "./SublistCreator.vue";
import DatasourceCreator from "./DatasourceCreator.vue";
import ExcelJS from "exceljs";
import { useToast } from "primevue/usetoast";

const emit = defineEmits(["createSubSubList", "success", "error"]);
const props = defineProps({
  level: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const visible = ref(false);
const listType = ref("simple");
const sublistItems = ref([]);
const selectedFiles = ref([]);
const tableName = ref("");
const sublistName = ref("");
const fileName = ref("");
const hasError = ref(false);
const fileErrorText = ref("");
const dataSourceFileCompleteJSON = ref([]);
const dataSourceColumnNames = ref([]);
const dataSourceSelectedColumns = ref([]);
const dataSourceSelectedRows = ref([]);
const fileupload = ref(null);
const toast = useToast();
const isSublistSimple = ref(true);

const onFileSelect = (event) => {
  const file = event.files[0];
  if (!file) return;

  const fileType = file.name.split(".").pop().toLowerCase();
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    processFiles(data, fileType, file);
  };
  reader.readAsArrayBuffer(file);
  selectedFiles.value = [file];
};

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  if (files.length > 1) {
    fileErrorText.value = "Only one file is allowed";
    hasError.value = true;
    setTimeout(() => {
      hasError.value = false;
    }, 3000);
    return;
  }
  const invalidFiles = files.filter((file) => !isValidFileType(file));
  if (invalidFiles.length > 0) {
    fileErrorText.value = "Only CSV or XLSX files are allowed";
    hasError.value = true;
    setTimeout(() => {
      hasError.value = false;
    }, 3000);
    return;
  }
  selectedFiles.value = files;
};

const removeFiles = () => {
  selectedFiles.value = [];
};

const handleDragEnter = () => {
  hasError.value = false;
};

const handleDragLeave = () => {
  hasError.value = false;
};

const validFileTypes = [".csv", ".xlsx"];
const isValidFileType = (file) => {
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return validFileTypes.includes(`.${fileExtension}`);
};

const isObjectEmpty = (obj) => {
  for (const key in obj) {
    if (obj[key] !== "") return false;
  }
  return true;
};

const handleChangeSelectedColumns = (data) => {
  dataSourceSelectedColumns.value = data;
};

const handleChangeSelectedRows = (data) => {
  dataSourceSelectedRows.value = data;
};

const processFiles = async (data, fileType, file) => {
  fileName.value = file?.name
    ? file?.name
    : file?.fileName
    ? file?.fileName
    : " ";
  if (data && fileType) {
    if (fileType === "csv") {
      const Papa = await import("papaparse");
      const csvText = new TextDecoder().decode(data);
      Papa.parse(csvText, {
        complete: (results) => {
          const parsedData = results.data;
          const filteredData = parsedData.filter(
            (entry) => !isObjectEmpty(entry)
          );
          dataSourceFileCompleteJSON.value = filteredData?.map((f, i) => {
            return { ...f, auto_index_by_docspawn: i + 1 };
          });
        },
        header: true,
      });
    } else if (["xls", "xlsx"].includes(fileType)) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        const worksheet = workbook.worksheets[0];
        const jsonData = [];
        const headers = [];
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
          if (rowNumber === 1) {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              headers.push(cell.text);
            });
          } else {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              rowData[headers[colNumber - 1]] = cell.text;
            });
            jsonData.push(rowData);
          }
        });
        dataSourceFileCompleteJSON.value = jsonData?.map((f, i) => {
          return { ...f, auto_index_by_docspawn: i + 1 };
        });
      } catch (error) {
        console.error("Error processing file:", error);
        throw error;
      }
    }
  }
};

watch(selectedFiles, () => {
  if (selectedFiles.value.length > 0) {
    const file = selectedFiles.value[0];
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const fileType = file.name.split(".").pop().toLowerCase();
        processFiles(data, fileType, file);
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Error reading file:", err);
    }
  } else {
    dataSourceColumnNames.value = [];
    dataSourceFileCompleteJSON.value = [];
    dataSourceSelectedColumns.value = [];
  }
});

watch(dataSourceFileCompleteJSON, () => {
  if (dataSourceFileCompleteJSON.value.length > 0) {
    const JSON = dataSourceFileCompleteJSON.value;
    dataSourceColumnNames.value = Object.keys(JSON[0]);
    dataSourceSelectedColumns.value = Object.keys(JSON[0]);
  }
});

const handleCreateList = () => {
  //   addClicked.value = true;
  if (
    listType.value === "simple" &&
    sublistItems.value.length > 0 &&
    sublistName.value !== ""
  ) {
    isSublistSimple.value = true;
    const mainSublist = {
      id: Date.now(),
      title: sublistName.value,
      isHovered: false,
      level: props.level + 1,
      isSublistSimple: true,
      sublists: sublistItems.value.map((item, index) => ({
        id: index,
        title: item.name,
        isHovered: false,
        level: props.level + 2,
        isSublistSimple: true,
        sublists: [],
      })),
    };

    // console.log("main Sublist",mainSublist)
    emit("createSubSubList", {
      sublistItems: [mainSublist],
      isSublistSimple: isSublistSimple.value,
    });
    emit("success");
  } else if (
    listType.value === "dataSource" &&
    selectedFiles.value.length > 0 &&
    tableName.value !== ""
  ) {
    emit("createSubSubList", {
      sublistItems: dataSourceFileCompleteJSON.value,
      isSublistSimple: false,
      name: tableName.value,
    });
    emit("success");
  } else if (listType.value === "dataSource" && !tableName.value) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Table name is required",
      life: 3000,
    });
  }
};

const getTooltipMessage = () => {
  // console.log("the list type selected is ", listType.value);
  let messages = [];

  if (listType.value === "simple") {
    console.log("!sublistName.value", !sublistName.value);
    console.log("is selected file", sublistItems.value.length === 0);
    if (sublistItems.value.length === 0 && !sublistName.value) {
      messages.push("Enter table name", "Please enter items in the text area");
    } else if (sublistItems.value.length === 0) {
      messages.push("Please enter items in the text area");
    } else if (!sublistName.value) {
      console.log("no sublist name");
      messages.push("Please provide a sublist name.");
    }
  } else if (listType.value === "dataSource") {
    if (selectedFiles.value.length === 0 && !tableName.value) {
      messages.push("Enter table name", "Upload a file");
    } else if (selectedFiles.value.length === 0) {
      messages.push("Please upload a file.");
    } else if (!tableName.value) {
      messages.push("Please provide a table name.");
    }
  }

  if (messages.length === 1) {
    return messages[0];
  } else if (messages.length > 1) {
    return `<ul style="list-style-type: disc; padding-left: 20px;">
                ${messages
                  .map((msg) => `<li style="margin-bottom: 5px;">${msg}</li>`)
                  .join("")}
              </ul>`;
  }

  return "";
};

const isTooltipDisabled = () => {
  if (
    listType.value === "simple" &&
    (sublistItems.value.length === 0 || !sublistName.value)
  ) {
    return false;
  } else if (
    listType.value === "dataSource" &&
    (selectedFiles.value.length === 0 || !tableName.value)
  ) {
    return false;
  }
  return true;
};
</script>

<style scoped>
.p-dialog {
  padding: 0 !important;
  overflow: hidden !important;
  height: 60vh;
}

.disable {
  background-color: rgb(169, 167, 167);
  cursor: not-allowed;
  border: none;
}
</style>
