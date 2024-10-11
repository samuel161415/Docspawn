<template>
  <div class="p-4">
    <h5 class="font-semibold">
      <span v-if="data.sublists?.length" class="">
        {{ data.sublists.length }} sublist{{
          data.sublists.length > 1 ? "s" : ""
        }}
      </span> for {{ data.title }}
     
    </h5>
    <DataTable :value="data.sublists" v-if="data?.sublists?.length > 0">
      <Column  expander style="width: 5rem" />
      <Column
        v-for="(column, index) in columns"
        :key="index"
        :field="column"
        :header="column"
        sortable
      ></Column>
      <template #expansion="{ data: subData }">
        <div v-if="hasSublists(subData)">
          <SublistComponent :data="subData" />
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
import SublistComponent from "./SublistComponent.vue";

const props = defineProps({
  data: Object,
});

const hasSublists = (data) => {
  return data?.sublists?.length > 0;
};

// Compute the columns for both simple list and data source
const columns = computed(() => {
  if (props.data?.sublists?.length > 0) {
    return Object.keys(props.data.sublists[0]).filter(
      (key) => key !== "sublists"
    );
  }
  return [];
});

onMounted(() => {
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
