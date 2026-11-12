<template>
  <button @click="btnClick">{{ props.name }}</button>
</template>
<script setup>
const props = defineProps(['name', 'value'])
const emits = defineEmits(['valueChange'])
const btnClick = () =>{
    emits('valueChange', props.name )
}
</script>
<style scoped>
button {
  background-color: #007bff; /* A standard modern blue */
  color: white;             /* White text for good contrast */
  border: none;             /* Removes the default border */
  padding: 10px 20px;       /* Adds some space inside the button */
  font-size: 16px;          /* Adjusts text size */
  border-radius: 4px; 
  margin: 5px 5px;      /* Rounds the corners slightly */
  cursor: pointer;          /* Changes the cursor to a pointer on hover */
}

button:hover {
  background-color: #0056b3; /* A darker blue for the hover effect */
}
</style>