<template>
  <Dialog v-model:visible="visible" modal :draggable="false" :style="{ width: '80vw' } ">
    <template #header>
      <div class="flex justify-center items-center ml-5">
        <p class="font-semibold text-xl flex justify-center text-center font-poppins">
          Create data source
        </p>
      </div>
    </template>
    <div v-if="!isEditable" class="w-full flex justify-center">
      <div class="w-max flex flex-col gap-6 items-center justify-center  ">
        <Toast />

        <div
          v-if="selectedFiles.length === 0" class="custom-file-upload" :class="{ 'error-border': hasError }"
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
            <span v-if="!hasError" class="font-poppins p-4">Drag and drop csv or xlsx files here to upload or</span>
            <span v-else class="bg-red-50 p-4 text-red-400 font-poppins">{{ fileErrorText }}</span>
            <Button label="Browse" icon="pi pi-plus" class=" font-poppins mt-4" @click="triggerFileInput" />
          </div>
        </div>

        <div v-else class="file-list custom-file-upload flex flex-col gap-6 items-center justify-center">
          <ul>
            <li v-for="file in selectedFiles" :key="file.name" class="font-poppins p-4">
              {{ file.name }}
            </li>
          </ul>
          <Button severity="danger" outlined label="Remove" icon="pi pi-times" class="mt-4 font-poppins" @click="removeFiles" />
        </div>
      </div>
    </div>

    <div
      v-if="dataSourceFileCompleteJSON?.length > 0"
      class="my-6  p-4 py-8 w-full flex flex-col gap-8 bg-primary-50 rounded"
    >
      <div class="gap-4">
        <p class="font-poppins text-lg text-surface-600 mb-1">
          Lookup column
        </p>
        <Dropdown
          v-model="lookupColumn" :options="dataSourceColumnNames" filter placeholder="Select country"
          class="w-full md:w-80"
        />
      </div>
      <div class="gap-4">
        <p class="font-poppins text-lg text-surface-600 ">
          Data starts on line
        </p>
        <p class="font-poppins text-sm text-surface-600 mb-2">
          write between 1 to {{ dataSourceFileCompleteJSON?.length }}
        </p>
        <!-- <Dropdown
          v-model="selectedLine" :options="lines" option-label="name" filter placeholder="Select row number"
          class="w-full md:w-80"
        /> -->
        <InputNumber v-model="dataStartLine" disabled class="w-full md:w-80" input-id="minmax-buttons" mode="decimal" show-buttons :min="1" :max="dataSourceFileCompleteJSON?.length ? dataSourceFileCompleteJSON?.length : 100" />
      </div>
    </div>
    <div v-if="dataSourceFileCompleteJSON?.length > 0" class="w-full flex justify-center  mt-12">
      <SelectButton v-model="tableViewType" :options="tableViewOptions" aria-labelledby="basic" class=" font-poppins" />
    </div>

    <TableForDataSourceEdit
      v-if="dataSourceFileCompleteJSON?.length > 0"
      :data-source-file-complete-j-s-o-n="dataSourceFileCompleteJSON"
      :data-source-column-names="dataSourceColumnNames"
      :data-source-selected-columns="dataSourceSelectedColumns"
      :data-source-selected-rows="dataSourceSelectedRows"
      :table-view-type="tableViewType"
      @change-selected-columns="handleChangeSelectedColumns"
      @change-selected-rows="handleChangeSelectedRows"
    />
    <div v-if="dataSourceFileCompleteJSON?.length > 0" class="mb-4 mt-2 flex justify-center gap-2">
      <Button outlined label="Cancel" @click="emit('cancel')" />
      <Button :label="isEditable ? 'Update data source' : 'Create data source'" @click="createDataSource" />
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import ExcelJS from 'exceljs'
import TableForDataSourceEdit from './TableForDataSourceEdit.vue'

const props = defineProps(['editableItem'])
const emit = defineEmits(['cancel', 'createDataSource', 'updateDataSource', 'removeEditable'])

const toast = useToast()

const lookupColumn = ref(null)
const dataStartLine = ref(1)
const fileName = ref()
const tableViewType = ref('Editable View')
const tableViewOptions = ref(['Editable View', 'Final View'])

const fileupload = ref()
const selectedFiles = ref([])
const hasError = ref(false)
const fileErrorText = ref('')
const dataSourceFileCompleteJSON = ref([])
const dataSourceColumnNames = ref([])
const dataSourceSelectedColumns = ref([])
const dataSourceSelectedRows = ref([])
const isEditable = ref(false)
const editIndex = ref()

onMounted(() => {
  if (props?.editableItem?.name) {
    isEditable.value = true
    dataSourceColumnNames.value = props?.editableItem?.columnNames,
    dataSourceSelectedColumns.value = props?.editableItem?.selectedColumns
    dataSourceFileCompleteJSON.value = props?.editableItem?.completeData
    dataSourceSelectedRows.value = props?.editableItem?.selectedRows
    fileName.value = props?.editableItem?.name
    editIndex.value = props?.editableItem?.index
    lookupColumn.value = props?.editableItem?.lookupColumn
    emit('removeEditable')
  }
})

const validFileTypes = ['.csv', '.xlsx']

function isValidFileType(file) {
  const fileExtension = file.name.split('.').pop().toLowerCase()
  return validFileTypes.includes(`.${fileExtension}`)
}

function onFileSelect(event) {
  const files = event.files
  if (files.length > 1) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Only one file allowed', life: 3000 })
    fileErrorText.value = 'Only one file is allowed'
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 3000)
    return
  }
  const invalidFiles = files.filter(file => !isValidFileType(file))

  if (invalidFiles.length > 0) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Only CSV or XLSX files are allowed', life: 3000 })

    fileErrorText.value = 'Only CSV or XLSX files are allowed'
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 3000)
    return
  }

  selectedFiles.value = files
}

function handleDrop(event) {
  const files = Array.from(event.dataTransfer.files)
  if (files.length > 1) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Only one file allowed', life: 3000 })
    fileErrorText.value = 'Only one file is allowed'
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 3000)
    return
  }
  const invalidFiles = files.filter(file => !isValidFileType(file))

  if (invalidFiles.length > 0) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Only CSV or XLSX files are allowed', life: 3000 })
    hasError.value = true
    setTimeout(() => {
      hasError.value = false
    }, 3000)
    return
  }

  selectedFiles.value = files
}

function triggerFileInput() {
  fileupload.value.choose()
}

function removeFiles() {
  selectedFiles.value = []
}

function handleDragEnter() {
  hasError.value = false
}

function handleDragLeave() {
  hasError.value = false
}
function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj[key] !== '')
      return false
  }
  return true
}

async function processFiles(data, fileType, file) {
  fileName.value = file?.name ? file?.name : file?.fileName ? file?.fileName : ' '
  if (data && fileType) {
    if (fileType === 'csv') {
    // Dynamically import xlsx
      const Papa = await import('papaparse')
      // Parse CSV file using PapaParse
      const csvText = new TextDecoder().decode(data)

      Papa.parse(csvText, {
        complete: (results) => {
          const parsedData = results.data
          const filteredData = parsedData.filter(
            entry => !isObjectEmpty(entry),
          )

          dataSourceFileCompleteJSON.value = filteredData?.map((f, i) => {
            return { ...f, auto_index_by_docspawn: i + 1 }
          })
        // setCSVFileJSON(filteredData)
        },
        header: true,
      })
    }
    else if (['xls', 'xlsx'].includes(fileType)) {
      try {
        // Read the file as an ArrayBuffer
        const arrayBuffer = await file.arrayBuffer()

        // Create a new workbook and read the file
        const workbook = new ExcelJS.Workbook()
        await workbook.xlsx.load(arrayBuffer)

        // Get the first worksheet
        const worksheet = workbook.worksheets[0]

        // Convert worksheet to JSON
        const jsonData = []
        const headers = []
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
          if (rowNumber === 1) {
            // Assuming the first row contains headers
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              headers.push(cell.text)
            })
          }
          else {
            const rowData = {}
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              rowData[headers[colNumber - 1]] = cell.text
            })
            jsonData.push(rowData)
          }
        })

        // return jsonData
        dataSourceFileCompleteJSON.value = jsonData?.map((f, i) => {
          return { ...f, auto_index_by_docspawn: i + 1 }
        })
      }
      catch (error) {
        console.error('Error processing file:', error)
        throw error
      }
    }
  }
}
function handleChangeSelectedColumns(data) {
  dataSourceSelectedColumns.value = data
}
function handleChangeSelectedRows(data) {
  dataSourceSelectedRows.value = data
}
function createDataSource() {
  if (isEditable.value)
    emit('updateDataSource', { name: fileName.value, completeData: dataSourceFileCompleteJSON.value, columnNames: dataSourceColumnNames.value, selectedColumns: dataSourceSelectedColumns.value, selectedRows: dataSourceSelectedRows.value, isEditable: isEditable.value, editIndex: editIndex.value, lookupColumn: lookupColumn.value })
  else
    emit('createDataSource', { name: fileName.value, completeData: dataSourceFileCompleteJSON.value, columnNames: dataSourceColumnNames.value, selectedColumns: dataSourceSelectedColumns.value, selectedRows: dataSourceSelectedRows.value, lookupColumn: lookupColumn.value })
}
watch(dataStartLine, (newVal) => {
  if (newVal > dataSourceFileCompleteJSON.value?.length)
    newVal = dataSourceFileCompleteJSON.value?.length
})
watch(selectedFiles, () => {
  if (selectedFiles?.value?.length > 0) {
    const file = selectedFiles.value[0]
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const fileType = file.name.split('.').pop().toLowerCase()

        processFiles(data, fileType, file)
      }
      reader.readAsArrayBuffer(file)
    }
    catch (err) {
      // console.log('err', err)
    }
  }
  else {
    dataSourceColumnNames.value = []
    dataSourceFileCompleteJSON.value = []
    dataSourceSelectedColumns.value = []
  }
})

watch(dataSourceFileCompleteJSON, () => {
  if (dataSourceFileCompleteJSON?.value?.length > 0) {
    const JSON = dataSourceFileCompleteJSON?.value
    dataSourceColumnNames.value = Object.keys(JSON[0])
    dataSourceSelectedColumns.value = isEditable.value ? dataSourceSelectedColumns.value : Object.keys(JSON[0])
  }
})
</script>

<style>
.custom-file-upload {
    position: relative;
    border: 2px dashed #c8c8c8;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s;
}

.custom-file-upload .hidden-input {
    display: none;
}

.custom-file-upload .drop-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.file-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.error-border{
  border-color:red
}
</style>
