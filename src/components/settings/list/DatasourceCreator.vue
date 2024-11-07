<template>
  <div class="py-2 h-[60vh] overflow-auto px-5">
    <div class="flex flex-col gap-2 mb-6">
      <label for="tableName" class="font-semibold w-6rem text-lg">
        Table name <span class="text-red-400">*</span>
      </label>
      <span v-if="addClicked && !tableName.trim()" class="text-sm text-error">
        <i class="pi pi-exclamation-triangle text-error mr-2"></i>
        Table name should not be empty
      </span>
      <InputText
        id="tableName"
        v-model="tableName"
        placeholder="Enter table name"
        :invalid="addClicked && !tableName.trim()"
      />
    </div>

    <label for="upload" class="font-semibold w-6rem text-lg">
      Upload a file <span class="text-red-400">*</span>
    </label>
    <div
      v-if="selectedFiles.length === 0"
      class="custom-file-upload mt-2"
      :class="{ 'error-border': hasError }"
      @dragover.prevent
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <FileUpload
        ref="fileupload"
        mode="basic"
        name="demo[]"
        :multiple="false"
        accept=".csv, .xlsx"
        :max-file-size="100000000"
        choose-label="Browse"
        class="hidden-input"
        @select="onFileSelect"
      />
      <div class="drop-zone py-6">
        <span v-if="!hasError" class="font-poppins p-4">
          Drag and drop csv or xlsx files here to upload or
        </span>
        <span v-else class="bg-red-50 p-4 text-red-400 font-poppins">
          {{ fileErrorText }}
        </span>
        <Button
          label="Browse"
          icon="pi pi-plus"
          class="font-poppins mt-4"
          @click="triggerFileInput"
        />
      </div>
    </div>

    <div
      v-else
      class="file-list custom-file-upload flex flex-col gap-6 items-center justify-center"
    >
      <ul>
        <li
          v-for="file in selectedFiles"
          :key="file.name"
          class="font-poppins p-4"
        >
          {{ file.name }}
        </li>
      </ul>
      <Button
        severity="danger"
        outlined
        label="Remove"
        icon="pi pi-times"
        class="mt-4 font-poppins"
        @click="removeFiles"
      />
    </div>

    <TableForDataSourceEdit
      v-if="dataSourceFileCompleteJSON?.length > 0"
      :data-source-file-complete-j-s-o-n="dataSourceFileCompleteJSON"
      :data-source-column-names="dataSourceColumnNames"
      :data-source-selected-columns="dataSourceSelectedColumns"
      :data-source-selected-rows="dataSourceSelectedRows"
      @change-selected-columns="handleChangeSelectedColumns"
      @change-selected-rows="handleChangeSelectedRows"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import TableForDataSourceEdit from "../data_source/TableForDataSourceEdit.vue";

const props = defineProps({
  initialFileName: {
    type: String,
    default: "",
  },
  initialTableName: {
    type: String,
    default: "",
  },
  selectedFiles: {
    type: Array,
    default: () => [],
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  fileErrorText: {
    type: String,
    default: "",
  },
  dataSourceFileCompleteJSON: {
    type: Array,
    default: () => [],
  },
  dataSourceColumnNames: {
    type: Array,
    default: () => [],
  },
  dataSourceSelectedColumns: {
    type: Array,
    default: () => [],
  },
  dataSourceSelectedRows: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "fileSelected",
  "tableNameUpdated",
  "removeFiles",
  "handleDragEnter",
  "handleDragLeave",
  "handleDrop",
  "changeSelectedColumns",
  "changeSelectedRows",
]);

const tableName = ref(props.initialTableName);
const fileName = ref(props.initialFileName);
const addClicked = ref(false);
const fileupload = ref(null); // Define the fileupload reference


watch(tableName, () => emit("tableNameUpdated", tableName.value));

const triggerFileInput = () => {
  fileupload.value.choose(); // Use the fileupload reference
};

const removeFiles = () => {
  emit("removeFiles");
};

const handleDragEnter = () => {
  emit("handleDragEnter");
};

const handleDragLeave = () => {
  emit("handleDragLeave");
};

const handleDrop = (event) => {
  emit("handleDrop", event);
};

const onFileSelect = (event) => {
  emit("fileSelected", event);
};

const handleChangeSelectedColumns = (data) => {
  emit("changeSelectedColumns", data);
};

const handleChangeSelectedRows = (data) => {
  emit("changeSelectedRows", data);
};
</script>
