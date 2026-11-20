<template>
    <v-dialog v-model="props.dialog" persistent width="50%">
        <v-toolbar color="primary">
            <v-toolbar-title>
                User Entry
            </v-toolbar-title>
        </v-toolbar>
        <v-card rounded="0">
             <v-row  no-gutters class="mt-4">
                <v-col cols="3" class="text-right">
                    <p class="mr-2">Name</p>
                </v-col>
                <v-col cols="8">
                    <v-text-field v-model="user.name" variant="outlined" density="compact"></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="3" class="text-right">
                    <p class="mr-2">Username</p>
                </v-col>
                <v-col cols="8">
                    <v-text-field v-model="user.username" variant="outlined" density="compact"></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="3" class="text-right">
                    <p class="mr-2">Password</p>
                </v-col>
                <v-col cols="8">
                    <v-text-field v-model="user.password" variant="outlined" density="compact"></v-text-field>
                </v-col>
            </v-row>
            <v-row no-gutters class="mb-3">
                <v-col cols="11" class="text-right">
                    <v-btn @click="CloseDialog" class="mr-2" color="warning">Cancel</v-btn>
                    <v-btn color="primary" @click="Save">Save</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>
<script setup>
import User from '@/model/user.model';
import { ref } from 'vue';
const props = defineProps({
    dialog: Boolean
})
const emits = defineEmits(['close', 'saved', 'edited'])
const user = ref(new User())
const isEdited = ref(false)
const CloseDialog = () => {
    emits('close')
    isEdited.value = false
    user.value = new User()
}
const Save = () => {
    if(isEdited.value){
        emits('edited', user.value)
    }else{
        emits('saved', user.value)
    }
    user.value = new User()
    
}
defineExpose({
    user, isEdited
})
</script>