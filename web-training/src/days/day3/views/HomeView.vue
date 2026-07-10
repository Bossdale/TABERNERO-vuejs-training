<!--
=============================================================
  DAY 3 ASSIGNMENT — HomeView.vue
  Shows the task list with router-link navigation to each task
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/days/day3/stores/taskStore.js'

const taskStore = useTaskStore()
const route     = useRoute()

// TODO 1: Read route.query.error — if it equals 'notfound', show a warning banner
const showErrorBanner = computed(() => route.query.error === 'notfound')

const doneCount = computed(() => taskStore.tasks.filter(t => t.done).length)
const total     = computed(() => taskStore.tasks.length)
</script>

<template>
  <div class="page-shell">
    <div class="glass-panel home-view">
      <header class="head">
        <div>
          <h1>📝 My Tasks</h1>
          <p class="subtitle">{{ doneCount }} of {{ total }} done · stay on top ✨</p>
        </div>
        <!-- TODO 3: Add a RouterLink to /about -->
        <nav class="page-nav">
          <RouterLink to="/home">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </header>

      <!-- TODO 2: Show a warning banner if showErrorBanner is true -->
      <Transition name="drop">
        <div class="error-banner" v-if="showErrorBanner">
          ⚠️ Task not found. Redirected back to home.
        </div>
      </Transition>

      <!-- TODO 4 & 5: Render each task as a RouterLink to /task/:id -->
      <ul class="task-list">
        <li v-for="task in taskStore.tasks" :key="task.id">
          <RouterLink :to="`/task/${task.id}`" class="task-row">
            <span class="dot" :class="{ done: task.done }"></span>
            <span class="name" :class="{ done: task.done }">{{ task.name }}</span>
            <span class="pill" :class="task.done ? 'done' : 'pending'">
              {{ task.done ? 'Done' : 'Pending' }}
            </span>
            <span class="chevron">→</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.home-view { display: flex; flex-direction: column; gap: 20px; }

.head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
h1 { font-size: 26px; font-weight: 700; letter-spacing: 0.3px; }
.subtitle { margin-top: 4px; font-size: 13px; color: var(--text-dim); }

.page-nav { display: flex; gap: 8px; flex-shrink: 0; }
.page-nav a {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-dim);
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: color 0.25s var(--ease), background 0.25s var(--ease), border-color 0.25s var(--ease);
}
.page-nav a:hover { color: var(--text); background: var(--surface-hover); }
.page-nav a.router-link-active {
  color: var(--text);
  background: var(--surface-hover);
  border-color: var(--border-strong);
}

.error-banner {
  background: var(--pending-bg);
  border: 1px solid rgba(180, 83, 9, 0.28);
  border-radius: 12px;
  padding: 11px 15px;
  color: var(--pending);
  font-size: 13.5px;
}

.task-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }

.task-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  text-decoration: none;
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--border);
  transition: transform 0.25s var(--ease), background 0.25s var(--ease),
    border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
}
.task-row:hover {
  transform: translateX(6px);
  background: var(--surface-hover);
  border-color: var(--border-strong);
  box-shadow: 0 10px 22px rgba(17, 24, 39, 0.08);
}

.dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; background: var(--pending); }
.dot.done { background: var(--done); }

.name { flex: 1; font-size: 15px; font-weight: 500; }
.name.done { text-decoration: line-through; color: var(--text-dim); }

.chevron { color: var(--text-dim); transition: transform 0.25s var(--ease), color 0.25s var(--ease); }
.task-row:hover .chevron { transform: translateX(4px); color: var(--text); }

/* banner transition */
.drop-enter-active, .drop-leave-active { transition: all 0.3s var(--ease); }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
