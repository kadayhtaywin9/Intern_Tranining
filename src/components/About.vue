
<script setup>
import { ref } from 'vue'

const students = ref([
  { id: 1, name: 'Aung Aung', course: 'Vue.js', status: 'Active' },
  { id: 2, name: 'Mg Mg', course: 'React.js', status: 'Active' },
  { id: 3, name: 'Su Su', course: 'Python', status: 'Inactive' },
])

const studentName = ref('')
const course = ref('Vue.js')

function addStudent() {
  if (!studentName.value.trim()) return

  students.value.push({
    id: Date.now(),
    name: studentName.value,
    course: course.value,
    status: 'Active'
  })

  studentName.value = ''
  course.value = 'Vue.js'
}

function deleteStudent(id) {
  students.value = students.value.filter(
    student => student.id !== id
  )
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title>
        Student Management
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container class="py-6">

        <h1 class="text-h4 mb-5">
          Dashboard
        </h1>

        <!-- Statistics -->
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-card color="blue-lighten-5" class="pa-4">
              <div class="text-subtitle-1">
                Total Students
              </div>
              <div class="text-h4 font-weight-bold">
                {{ students.length }}
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card color="green-lighten-5" class="pa-4">
              <div class="text-subtitle-1">
                Active Students
              </div>
              <div class="text-h4 font-weight-bold">
                {{ students.filter(s => s.status === 'Active').length }}
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card color="orange-lighten-5" class="pa-4">
              <div class="text-subtitle-1">
                Inactive Students
              </div>
              <div class="text-h4 font-weight-bold">
                {{ students.filter(s => s.status === 'Inactive').length }}
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Add Student -->
        <v-card class="mt-5 pa-4">
          <v-card-title>
            Add Student
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="5">
                <v-text-field
                  v-model="studentName"
                  label="Student Name"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12" md="5">
                <v-select
                  v-model="course"
                  :items="['Vue.js', 'React.js', 'Python']"
                  label="Course"
                  variant="outlined"
                  hide-details
                />
              </v-col>

              <v-col cols="12" md="2">
                <v-btn
                  color="primary"
                  block
                  height="56"
                  @click="addStudent"
                >
                  Add
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Student Table -->
        <v-card class="mt-5">
          <v-card-title>
            Student List
          </v-card-title>

          <v-table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Course</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="student in students"
                :key="student.id"
              >
                <td>{{ student.id }}</td>
                <td>{{ student.name }}</td>
                <td>{{ student.course }}</td>
                <td>
                  <v-chip
                    :color="student.status === 'Active' ? 'success' : 'warning'"
                    size="small"
                  >
                    {{ student.status }}
                  </v-chip>
                </td>
                <td>
                  <v-btn
                    color="error"
                    size="small"
                    variant="tonal"
                    @click="deleteStudent(student.id)"
                  >
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>

      </v-container>
    </v-main>
  </v-app>
</template>
