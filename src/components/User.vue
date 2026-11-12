<template>
    <h1>{{ props.name }}</h1>
    <input type="button" value="SendEvent" @click="clickBtn" >
</template>
<script setup>
import { defineEmits } from 'vue';
const props = defineProps(['name'])
const emits=defineEmits(['save','change'])
const clickBtn = () =>{
    emits('save', 1)
}
</script>