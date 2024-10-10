import { ref } from 'vue'
import engFlag from '../assets/usa.png'
import chineesFlag from '../assets/china.png'
import frenchFlag from '../assets/france.png'

export const languageLists = ref([
  {
    flag: engFlag,
    label: 'English',
  },
  {
    flag: frenchFlag,
    label: 'French',
  },
  // {
  //   flag: chineesFlag,
  //   label: "Chinees",
  // },
])
