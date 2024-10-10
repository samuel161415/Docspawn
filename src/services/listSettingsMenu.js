import { ref } from 'vue'

export const listSettingsMenu = ref([
  {
    title: 'List 1',
    isHovered: false,
    opensubmenu: true,
    subitems: [
      {
        title: 'Sublist 1',
        isHovered: false,
      },
      {
        title: 'Sublist 2',
        isHovered: false,
      },
    ],
  },
  {
    title: 'List 2',
    isHovered: false,
    opensubmenu: true,
    subitems: [
      {
        title: 'Sublist 1',
        isHovered: false,
      },
    ],
  },
])
