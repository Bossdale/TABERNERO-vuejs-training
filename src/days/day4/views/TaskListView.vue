<!--
=============================================================
  DAY 4 ASSIGNMENT — TaskListView.vue (refactored for Pinia)
  Remove all local state. Use the store for everything.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// TODO 1: Import your store
import { useTaskStore } from '@/days/day4/stores/taskStore.js'

// TODO 2: Get the store instance
const taskStore = useTaskStore()

// TODO 3: Destructure REACTIVE STATE using storeToRefs()
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)

// TODO 4: Destructure ACTIONS directly (no storeToRefs needed for functions)
const { addTask, toggleTask, removeTask } = taskStore

// This local ref is fine — it's UI state, not task state
const newTaskName = ref('')

function handleAdd() {
  // TODO 5: Call addTask() from the store, then clear the input
  addTask(newTaskName.value)
  newTaskName.value = ''
}
</script>

<template>
  <div class="page-shell">
    <div class="glass-panel task-view">
      <header class="head">
        <div>
          <h1>📝 Tasks</h1>
          <p class="subtitle">Pinia-powered · state lives in the store</p>
        </div>

        <!-- TODO 6: Display totalCount, doneCount, pendingCount from the store -->
        <div class="stats">
          <span class="stat"><b>{{ totalCount }}</b> Total</span>
          <span class="stat done"><b>{{ doneCount }}</b> Done</span>
          <span class="stat pending"><b>{{ pendingCount }}</b> Pending</span>
        </div>
      </header>

      <div class="input-row">
        <input v-model="newTaskName" placeholder="Add a new task…" @keyup.enter="handleAdd" />
        <button class="glass-btn add-btn" @click="handleAdd">＋ Add</button>
      </div>

      <!-- TODO 7: Render the task list using tasks from the store -->
      <TransitionGroup tag="ul" name="list" class="task-list">
        <li v-for="task in tasks" :key="task.id" class="task-row" :class="{ done: task.done }">
          <label class="check">
            <input type="checkbox" :checked="task.done" @change="toggleTask(task.id)" />
            <span class="box"></span>
          </label>

          <span class="name" :class="{ done: task.done }">{{ task.name }}</span>

          <span class="pill" :class="task.done ? 'done' : 'pending'">
            {{ task.done ? 'Done' : 'Pending' }}
          </span>

          <button class="remove" @click="removeTask(task.id)" aria-label="Remove task">✕</button>
        </li>
      </TransitionGroup>

      <p v-if="totalCount === 0" class="empty">No tasks yet — add your first one above ✨</p>
    </div>
  </div>
</template>

<style scoped>
.task-view { display: flex; flex-direction: column; gap: 20px; }

.head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
h1 { font-size: 26px; font-weight: 700; letter-spacing: 0.3px; }
.subtitle { margin-top: 4px; font-size: 13px; color: var(--text-dim); }

.stats { display: flex; gap: 8px; flex-wrap: wrap; }
.stat {
  display: inline-flex; align-items: baseline; gap: 4px;
  padding: 5px 11px; border-radius: 999px; font-size: 12.5px;
  color: var(--text-dim); background: var(--surface-2); border: 1px solid var(--border);
}
.stat b { font-size: 14px; color: var(--text); }
.stat.done b { color: var(--done); }
.stat.pending b { color: var(--pending); }

/* input row */
.input-row { display: flex; gap: 10px; }
.input-row input {
  flex: 1; padding: 11px 15px; font-size: 14px; color: var(--text);
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 12px;
  transition: border-color 0.25s var(--ease), background 0.25s var(--ease), box-shadow 0.25s var(--ease);
}
.input-row input::placeholder { color: var(--text-dim); }
.input-row input:focus {
  outline: none; background: var(--surface);
  border-color: rgba(47, 143, 102, 0.5);
  box-shadow: 0 0 0 3px rgba(47, 143, 102, 0.12);
}
.add-btn { flex-shrink: 0; }

/* task list */
.task-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.task-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; border-radius: 14px;
  background: var(--surface-2); border: 1px solid var(--border);
  transition: transform 0.25s var(--ease), background 0.25s var(--ease),
    border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
}
.task-row:hover {
  transform: translateX(6px);
  background: var(--surface-hover);
  border-color: var(--border-strong);
  box-shadow: 0 10px 22px rgba(17, 24, 39, 0.08);
}

/* custom checkbox */
.check { position: relative; display: inline-flex; flex-shrink: 0; cursor: pointer; }
.check input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
.box {
  width: 20px; height: 20px; border-radius: 6px;
  border: 2px solid var(--border-strong); background: var(--surface);
  transition: background 0.2s var(--ease), border-color 0.2s var(--ease);
}
.check input:checked + .box {
  background: var(--done); border-color: var(--done);
}
.check input:checked + .box::after {
  content: '✓'; color: #fff; font-size: 13px; font-weight: 700;
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -52%);
}

.name { flex: 1; font-size: 15px; font-weight: 500; }
.name.done { text-decoration: line-through; color: var(--text-dim); }

.remove {
  flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px;
  border: 1px solid transparent; background: transparent; color: var(--text-dim);
  font-size: 13px; cursor: pointer; opacity: 0;
  transition: opacity 0.2s var(--ease), background 0.2s var(--ease), color 0.2s var(--ease);
}
.task-row:hover .remove { opacity: 1; }
.remove:hover { background: #fdecec; color: #dc2626; border-color: #f6cfcf; }

.empty { text-align: center; color: var(--text-dim); font-size: 14px; padding: 8px 0; }

/* list add/remove animation */
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-12px); }
.list-enter-active, .list-leave-active { transition: all 0.3s var(--ease); }
.list-leave-active { position: absolute; }
</style>
