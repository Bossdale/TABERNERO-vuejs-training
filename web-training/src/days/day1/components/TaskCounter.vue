<!--
=============================================================
  DAY 1 Task — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (Additional Points)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup>
import { ref, computed } from 'vue'

// TODO 1: Create a ref for the text input value (initial value: '')
const newTaskName = ref('')

// TODO 2: Create a ref for the tasks array (initial value: [])
const tasks = ref([])

// EXTENSION: priority selected for the next task to be added
const newTaskPriority = ref('Medium')

// EXTENSION: which tasks are currently visible — 'All' | 'Done' | 'Pending'
const filter = ref('All')

// TODO 3: Create computed() values for total, done, and pending counts
const totalCount = computed(() => tasks.value.length)
const doneCount = computed(() => {
  let count = 0
  for (const t of tasks.value) {
    if (t.done) count++
  }
  return count
})
const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

// EXTENSION: the list actually rendered, narrowed by the active filter
const visibleTasks = computed(() => {
  if (filter.value === 'Done') return tasks.value.filter(t => t.done)
  if (filter.value === 'Pending') return tasks.value.filter(t => !t.done)
  return tasks.value
})

// TODO 4: Write the addTask() function
// - Prevent empty tasks
// - Push a new task object to tasks.value: { id, name, done }
// - Clear the input
function addTask() {
  const name = newTaskName.value.trim()
  if (!name) return
  tasks.value.push({
    id: Date.now(),
    name,
    done: false,
    priority: newTaskPriority.value,
  })
  newTaskName.value = ''
}

// TODO 5: Write toggleTask(id) — flip task.done for the matching task
function toggleTask(id) {
  for (const t of tasks.value) {
    if (t.id === id) {
      t.done = !t.done
      break
    }
  }
}

// TODO 6: Write removeTask(id) — filter out the task with this id
function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

// EXTENSION: remove every completed task at once
function clearDone() {
  tasks.value = tasks.value.filter(t => !t.done)
}
</script>

<template>
  <div class="app">
    <h1>Task Counter</h1>

    <!-- TODO 7 + 8: input (v-model + @keyup.enter), priority select, Add button -->
    <div class="input-row">
      <input
        v-model="newTaskName"
        @keyup.enter="addTask"
        placeholder="What needs to be done?"
      />
      <select v-model="newTaskPriority" class="priority-select">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="addTask">Add Task</button>
    </div>

    <!-- TODO 9: Live stats bar -->
    <div class="stats">
      Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
    </div>

    <!-- EXTENSION: filter bar + clear-all-done -->
    <div class="toolbar">
      <div class="filters">
        <button
          v-for="f in ['All', 'Done', 'Pending']"
          :key="f"
          :class="{ active: filter === f }"
          @click="filter = f"
        >
          {{ f }}
        </button>
      </div>
      <button class="clear-done" @click="clearDone" :disabled="doneCount === 0">
        Clear All Done
      </button>
    </div>

    <!-- TODO 10: Empty state — only when there are no tasks at all -->
    <p v-if="totalCount === 0" class="empty">No tasks yet. Add one above!</p>

    <!-- EXTENSION: tasks exist but none match the current filter -->
    <p v-else-if="visibleTasks.length === 0" class="empty">
      No {{ filter.toLowerCase() }} tasks.
    </p>

    <!-- TODO 11: Render the (filtered) task list -->
    <ul v-else class="task-list">
      <li v-for="task in visibleTasks" :key="task.id">
        <input
          type="checkbox"
          :checked="task.done"
          @change="toggleTask(task.id)"
        />
        <span :class="{ done: task.done }">{{ task.name }}</span>
        <span class="priority" :class="task.priority.toLowerCase()">
          {{ task.priority }}
        </span>
        <button @click="removeTask(task.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

h1 { color: #1B2A4A; margin-bottom: 20px; }

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-row button {
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.input-row .priority-select {
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.stats {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
}

.filters {
  display: flex;
  gap: 6px;
}

.filters button {
  padding: 5px 12px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #555;
}

.filters button.active {
  background: #42B883;
  border-color: #42B883;
  color: white;
  font-weight: bold;
}

.clear-done {
  padding: 5px 12px;
  background: #fff;
  border: 1px solid #fca5a5;
  color: #dc2626;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.clear-done:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.priority {
  font-size: 11px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.priority.low    { background: #e0f2fe; color: #0369a1; }
.priority.medium { background: #fef9c3; color: #a16207; }
.priority.high   { background: #fee2e2; color: #dc2626; }

.empty {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 32px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.task-list li span {
  flex: 1;
  font-size: 14px;
}

/* TODO: Apply this class to task names when task.done is true */
.done {
  text-decoration: line-through;
  color: #aaa;
}

.task-list li button {
  padding: 4px 10px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
</style>
