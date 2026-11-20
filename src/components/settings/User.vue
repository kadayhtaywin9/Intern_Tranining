<template>
  <v-container class="py-6" style="max-width: 1120px;">
    <v-card rounded="xl" elevation="0" class="border bg-white">
      <v-card-title class="pa-5 d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <!-- <v-icon color="primary" class="mr-2">mdi-account-group-outline</v-icon> -->
          <span class="text-subtitle-1 font-weight-bold">User List</span>
        </div>
        <v-btn color="primary" size="small" rounded="lg" prepend-icon="mdi-plus" class="text-none" @click="OpenEntry">
          Add User
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :items="userList"
          :headers="header"
          :loading="loading"
          v-model:items-per-page="pagination.itemPerPage"
          class="bg-white"
        >
          <template v-slot:item.id="{ item }">
            <v-icon @click="Edit(item)" color="orange" size="small" class="cursor-pointer">mdi-table-edit</v-icon>
            <v-icon @click="Delete(item.id)" class="ml-2 cursor-pointer" color="red" size="small">mdi-delete-circle</v-icon>
          </template>
          <template v-slot:item.role_name="{ item }">
            <v-chip size="x-small" color="primary" variant="tonal">
              {{ item.role_name || 'Intern / Member' }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <UserEntry :dialog="entryDialog" @saved="Save" @edited="Edited" @close="CloseEntry" ref="entryRef" />
  </v-container>
</template>

<script setup>
import UserEntry from './UserEntry.vue'
import { ref, onMounted } from 'vue'
import { apiRequest } from '@/services/api'

const entryRef = ref(null)
const entryDialog = ref(false)
const loading = ref(false)
const pagination = ref({
  itemPerPage: 10,
})

const header = ref([
  { title: 'Action', align: 'start', sortable: false, key: 'id' },
  { title: 'Name', align: 'start', sortable: true, key: 'name' },
  { title: 'Username', align: 'start', sortable: true, key: 'username' },
  { title: 'Email', align: 'start', sortable: true, key: 'email' },
  { title: 'Role', align: 'start', sortable: true, key: 'role_name' },
])

const userList = ref([])

const fetchUsers = async () => {
  loading.value = true
  try {
    userList.value = await apiRequest('/users')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const OpenEntry = () => {
  entryDialog.value = true
}
const CloseEntry = () => {
  entryDialog.value = false
}

const Save = async (data) => {
  try {
    await apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    await fetchUsers()
    CloseEntry()
  } catch (err) {
    alert(err.message)
  }
}

const Edited = async (data) => {
  try {
    await apiRequest(`/users/${data.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    await fetchUsers()
    entryRef.value.isEdited = false
    CloseEntry()
  } catch (err) {
    alert(err.message)
  }
}

const Delete = async (id) => {
  if (!confirm('Delete this user from MySQL?')) return
  try {
    await apiRequest(`/users/${id}`, { method: 'DELETE' })
    await fetchUsers()
  } catch (err) {
    alert(err.message)
  }
}

const Edit = (data) => {
  entryRef.value.user = { ...data, password: '' }
  entryRef.value.isEdited = true
  OpenEntry()
}

onMounted(fetchUsers)
</script>

<style scoped>
.border {
  border: 1px solid #e2e8f0 !important;
}
</style>
