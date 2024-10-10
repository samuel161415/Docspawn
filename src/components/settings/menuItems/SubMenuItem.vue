<template>
    <div class="ml-5">
        <div class="flex py-2 pl-1 hover:bg-surface-100 items-center" @click="toggleVisible">
            <i style="font-size: 0.9rem" :class="[subItem.icon, 'ml-1 py-1 text-gray-500']"></i>
            <p class="text-base font-normal ml-2 text-gray-500">{{ subItem.title }}</p>
        </div>

        <ul v-if="subItem.nestedMenuVisible">
            <li v-if="subItem.nestedMenuVisible">
                <div  
                    v-for="subSubItem in subItem.subitems"
                    :key="subSubItem.title"
                    class="flex ml-6 py-2 pl-2 hover:bg-surface-100"
                    @click="handleSubSubItemClick(subSubItem)"  >
                    <i style="font-size: 0.9rem" :class="[subSubItem?.icon, 'py-1 ml-1 text-gray-500']"></i>

                    <p class="text-base font-normal ml-2 text-gray-500">
                        {{ subSubItem?.title }}
                    </p>
                </div>
            </li> 
        </ul>
    </div>
    
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    subItem: {
        type: Object,
        required: false
    }
  });
  
  const toggleVisible = () => {
    props.subItem.nestedMenuVisible = !props.subItem.nestedMenuVisible;
  };
  </script>