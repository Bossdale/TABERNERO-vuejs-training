<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard_day2.vue'

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
const tasks = ref([
  { id: 1, name: 'Finish Vue Day 2 assignment', done: false, dueDate: '2026-07-01' },
  { id: 2, name: 'Review props and emits', done: true, dueDate: '2026-06-29' },
  { id: 3, name: 'Mag Lunch sa Ayala', done: false, dueDate: '2026-07-03' }
])

// TODO 2: Write handleComplete(id) — toggle the done state of the task with this id
function handleComplete(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}

// TODO 3: Write handleDelete(id) — remove the task with this id from the array
function handleDelete(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <!-- Full-screen gradient backdrop -->
  <div class="page">
    <div class="task-list-view">
      <header class="list-header">
        <h1>My Tasks</h1>
        <p class="subtitle">Stay on top of your day ✨</p>
      </header>

      <!-- TODO 4: Render a <TaskCard> for each task using v-for
           - Pass :task="task" as a prop
           - Listen @complete="handleComplete"
           - Listen @delete="handleDelete"
           - Fill the "meta" named slot with the due date
      -->
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @complete="handleComplete"
        @delete="handleDelete"
      >
        <template #meta>
          Due: {{ task.dueDate }}
        </template>
      </TaskCard>
    </div>
  </div>
</template>

<style scoped>
/* Gradient backdrop fills the whole viewport */
.page {
  min-height: 100vh;
  width: 100%;
  padding: 48px 20px;
  background: linear-gradient(135deg, #1B2A4A 0%, #34598a 45%, #42B883 100%);
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
/* Centered content column */
.task-list-view {
  width: 100%;
  max-width: 540px;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.list-header {
  margin-bottom: 28px;
  text-align: center;
}
h1 {
  color: #ffffff;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}
.subtitle {
  margin-top: 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
