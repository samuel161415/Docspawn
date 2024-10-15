<template>
  <div class="p-4">
    <h5 class="font-normal">
      {{ subData.title }}
    </h5>
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="subData.sublists"
      v-if="subData?.sublists?.length > 0"
      :paginator="showPaginator"
      :rows="5"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
    >
      <Column v-if="hasSublists(subData)" expander style="width: 5rem" />
      <Column
        v-for="(column, index) in columns"
        :key="index"
        :field="column"
        :header="column"
        sortable
      ></Column>
      <template #expansion="{ data }">
        <div v-if="hasSublists(data)">
        <h1>hi</h1>
          <!-- <SublistComponent :subData="data" /> -->
        </div>
        <div v-else>
          <p>No sublists available</p>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from "vue";
// import SublistComponent from "./SublistComponent.vue";

const props = defineProps({
  subData: Object,
});

const expandedRows = ref({});

const hasSublists = (data) => {
  console.log("has sublist sublist", data?.sublists?.length);
  return data?.sublists?.length > 0;
};

const showPaginator = computed(() => {
  console.log("sublist length", props.subData.sublists?.length > 5);
  return props.subData.sublists?.length > 5;
});

const onRowExpand = (event) => {
  console.log("Row Expanded", event.data.title);
};

const onRowCollapse = (event) => {
  console.log("Row Collapsed", event.data.title);
};

// Compute the columns for both simple list and data source
const columns = computed(() => {
  console.log(
    "SublistComponent property isSublistSimple",
    props.subData.isSublistSimple,
    " sublits sublist value",
    props.subData?.sublists
  );
  if (!props.subData.isSublistSimple && props.subData.sublists?.length > 0) {
    return Object.keys(props.subData.sublists[0]).filter(
      (key) => key !== "sublists"
    );
  } else if (props.subData.sublists?.length > 0) {
    return ["id", "title"];
  }
  return [];
});

// onMounted(() => {});
</script>

<style scoped>
/* Add any necessary styles here */
</style>