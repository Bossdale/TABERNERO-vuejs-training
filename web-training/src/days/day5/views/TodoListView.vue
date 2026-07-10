<!--
=============================================================
  DAY 5 ASSIGNMENT — TodoListView.vue
  Uses useFetch() to load and display todos from JSONPlaceholder
=============================================================
-->
<script setup>
import { ref, computed } from 'vue'
import { useFetch } from '@/days/day5/composables/useFetch.js'

const filter = ref('all') // 'all' | 'done' | 'pending'
const search = ref('')     // extension: filter by title text

// TODO 1: Call useFetch with the JSONPlaceholder todos endpoint
// Rename 'data' to 'todos' using destructuring alias syntax
const { data: todos, loading, error, retry } = useFetch('https://jsonplaceholder.typicode.com/todos')

// Filter buttons metadata
const tabs = [
  { key: 'all', label: 'All' },
  { key: 'done', label: 'Done' },
  { key: 'pending', label: 'Pending' },
]

// TODO 2: Create a filteredTodos computed() that:
//  - Returns [] if todos.value is null (still loading)
//  - Filters by filter.value ('all' shows first 20, 'done' shows completed, 'pending' shows incomplete)
const filteredTodos = computed(() => {
  if (!todos.value) return []
  // Limit the display to the first 20 results, then narrow by status
  let list = todos.value.slice(0, 20)
  if (filter.value === 'done') list = list.filter(t => t.completed)
  else if (filter.value === 'pending') list = list.filter(t => !t.completed)
  // Extension: search by title text
  const q = search.value.trim().toLowerCase()
  if (q) list = list.filter(t => t.title.toLowerCase().includes(q))
  return list
})
</script>

<template>
  <div class="page-shell">
    <div class="glass-panel todo-view">
      <header>
        <h1> Todo List</h1>
        <p class="subtitle">Loaded from JSONPlaceholder API</p>
      </header>

      <!-- TODO 3: Show a loading message/spinner while loading is true -->
      <div v-if="loading" class="loading">
        <span class="spinner"></span>
        <span>Loading todos…</span>
      </div>

      <!-- TODO 4: Show an error message if error has a value -->
      <div v-else-if="error" class="error-box">
        <p>⚠️ Failed to load todos: {{ error }}</p>
        <!-- Extension: Retry button -->
        <button class="glass-btn" @click="retry">↻ Retry</button>
      </div>

      <!-- TODO 5: Show the content block when NOT loading and NO error -->
      <div v-else>
        <!-- Filter buttons -->
        <div class="filters">
          <!-- TODO 6: Three buttons — All, Done, Pending -->
          <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="{ active: filter === tab.key }"
            @click="filter = tab.key"
          >
            {{ tab.label }}
          </button>

          <!-- Extension: search input -->
          <input v-model="search" class="search" placeholder="Search title…" />
        </div>

        <!-- TODO 7: Render filteredTodos using v-for -->
        <ul class="todo-list">
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            :class="{ 'done-item': todo.completed }"
          >
            <input type="checkbox" :checked="todo.completed" disabled />
            <span :class="{ 'completed-text': todo.completed }">{{ todo.title }}</span>
            <span class="pill" :class="todo.completed ? 'done' : 'pending'">
              {{ todo.completed ? 'Done' : 'Pending' }}
            </span>
          </li>
        </ul>

        <p v-if="filteredTodos.length === 0" class="empty">No todos match this filter.</p>

        <!-- TODO 8: Show count of visible items -->
        <p class="count">Showing {{ filteredTodos.length }} item(s)</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-view { display: flex; flex-direction: column; gap: 18px; }
h1 { font-size: 26px; font-weight: 700; letter-spacing: 0.3px; }
.subtitle { color: var(--text-dim); font-size: 13px; margin-top: 4px; }

/* loading */
.loading { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 48px; color: var(--done); font-size: 15px; }
.spinner {
  width: 34px; height: 34px; border-radius: 50%;
  border: 3px solid rgba(47, 143, 102, 0.2);
  border-top-color: var(--done);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* error */
.error-box {
  display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
  background: #fdf2f2; border: 1px solid #f6c9c9; border-radius: 12px;
  padding: 16px; color: #b91c1c; font-size: 14px;
}

/* filters + search */
.filters { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 18px; }
.filters button {
  padding: 7px 16px; border: 1px solid var(--border-strong); border-radius: 999px;
  background: var(--surface); color: var(--text-dim); cursor: pointer; font-size: 13px; font-weight: 600;
  transition: background 0.25s var(--ease), color 0.25s var(--ease), border-color 0.25s var(--ease), transform 0.25s var(--ease);
}
.filters button:hover { transform: translateY(-1px); background: var(--surface-hover); color: var(--text); }
.filters button.active { background: var(--done); color: #fff; border-color: var(--done); }
.search {
  flex: 1; min-width: 140px; padding: 8px 14px; font-size: 13px; color: var(--text);
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 999px;
  transition: border-color 0.25s var(--ease), box-shadow 0.25s var(--ease), background 0.25s var(--ease);
}
.search::placeholder { color: var(--text-dim); }
.search:focus { outline: none; background: var(--surface); border-color: rgba(47, 143, 102, 0.5); box-shadow: 0 0 0 3px rgba(47, 143, 102, 0.12); }

/* list */
.todo-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.todo-list li {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; font-size: 14px;
  background: var(--surface-2); border: 1px solid var(--border); border-radius: 12px;
  transition: transform 0.25s var(--ease), background 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease);
}
.todo-list li:hover { transform: translateX(5px); background: var(--surface-hover); border-color: var(--border-strong); box-shadow: 0 8px 18px rgba(17, 24, 39, 0.07); }
.todo-list li.done-item { opacity: 0.72; }
.todo-list li span { flex: 1; }
.todo-list li .pill { flex: 0 0 auto; }
.completed-text { text-decoration: line-through; color: var(--text-dim); }

.empty { text-align: center; color: var(--text-dim); font-size: 14px; padding: 8px 0; }
.count { font-size: 13px; color: var(--text-dim); margin-top: 4px; text-align: right; }
</style>
