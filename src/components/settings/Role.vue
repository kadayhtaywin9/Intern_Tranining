<template>
  <v-container class="py-6" style="max-width: 1120px;">
    <v-card rounded="xl" elevation="0" class="border bg-white">
      <v-card-title class="pa-5 d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <!-- <v-icon color="primary" class="mr-2">mdi-shield-account-outline</v-icon> -->
          <span class="text-subtitle-1 font-weight-bold">Role Management</span>
        </div>
        <v-btn color="primary" size="small" rounded="lg" prepend-icon="mdi-plus" class="text-none" @click="dialog = true">
          Add Role
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-table class="bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role Name</th>
            <th>Description</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>#{{ role.id }}</td>
            <td class="font-weight-medium">{{ role.name }}</td>
            <td>{{ role.description || '—' }}</td>
            <td class="text-right">
              <v-btn icon="mdi-delete-outline" size="x-small" color="error" variant="text" @click="deleteRole(role.id)"></v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="450">
      <v-card rounded="xl" class="pa-6">
        <h3 class="text-h6 font-weight-bold mb-4">New Role</h3>
        <v-text-field v-model="newRole.name" label="Role Name *" variant="outlined" density="compact" class="mb-3"></v-text-field>
        <v-text-field v-model="newRole.description" label="Description" variant="outlined" density="compact" class="mb-4"></v-text-field>
        <div class="d-flex justify-end ga-2">
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="createRole">Save</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { apiRequest } from '@/services/api'

const roles = ref([])
const dialog = ref(false)
const newRole = reactive({ name: '', description: '' })

const fetchRoles = async () => {
  try {
    roles.value = await apiRequest('/roles')
  } catch (err) {
    console.error(err)
  }
}

const createRole = async () => {
  if (!newRole.name.trim()) return
  try {
    await apiRequest('/roles', {
      method: 'POST',
      body: JSON.stringify(newRole),
    })
    newRole.name = ''
    newRole.description = ''
    dialog.value = false
    await fetchRoles()
  } catch (err) {
    alert(err.message)
  }
}

const deleteRole = async (id) => {
  if (!confirm('Delete this role?')) return
  try {
    await apiRequest(`/roles/${id}`, { method: 'DELETE' })
    await fetchRoles()
  } catch (err) {
    alert(err.message)
  }
}

onMounted(fetchRoles)
</script>

<style scoped>
.border {
  border: 1px solid #e2e8f0 !important;
}
</style>
