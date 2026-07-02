<!--
=============================================================
  DAY 3 ASSIGNMENT — TaskDetailView.vue
  Displays full details for a single task
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/days/day3/stores/taskStore.js'

// TODO 1: Get the current route and router instances
const route  = useRoute()
const router = useRouter()

const taskStore = useTaskStore()

// TODO 2: Find the task matching the route param
// route.params.id is a STRING — cast to Number before comparing
const task = computed(() => taskStore.tasks.find(t => t.id === Number(route.params.id)))

// TODO 3: goBack() using router.push() to navigate to '/home'
function goBack() {
  router.push('/home')
}
</script>

<template>
  <div class="page-shell">
    <div class="glass-panel detail-view">

      <!-- TODO 4: Show this only if task is found -->
      <template v-if="task">
        <button class="glass-btn back-btn" @click="goBack">← Back</button>

        <span class="pill" :class="task.done ? 'done' : 'pending'">
          {{ task.done ? '✅ Done' : '⏳ Pending' }}
        </span>

        <!-- TODO 5: Display task.name, task.dueDate, and task.done status -->
        <h1>{{ task.name }}</h1>

        <div class="meta">
          <div class="meta-row">
            <span class="label">Status</span>
            <span class="value">{{ task.done ? 'Completed' : 'In progress' }}</span>
          </div>
          <div class="meta-row">
            <span class="label">Due date</span>
            <span class="value">{{ task.dueDate }}</span>
          </div>
          <div class="meta-row">
            <span class="label">Task ID</span>
            <span class="value">#{{ task.id }}</span>
          </div>
        </div>
      </template>

      <!-- Fallback (the guard normally prevents this) -->
      <div v-else class="empty">
        <h1>🚫 Task not found</h1>
        <p>The task you're looking for doesn't exist.</p>
        <button class="glass-btn" @click="goBack">Go Back</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-view { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }

.back-btn { align-self: flex-start; }

h1 { color: var(--text); font-size: 28px; font-weight: 700; letter-spacing: 0.3px; }

.meta {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
}
.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 4px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
.meta-row:last-child { border-bottom: none; }
.label { font-size: 13px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.6px; }
.value { font-size: 15px; font-weight: 600; }

.empty { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
.empty p { color: var(--text-dim); font-size: 15px; }
</style>
