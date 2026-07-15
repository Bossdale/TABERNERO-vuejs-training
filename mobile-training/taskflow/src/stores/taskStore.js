// =============================================================
//  Pinia Store: stores/taskStore.js  (copied from Day 4 training)
//  Setup Store pattern: state (refs), getters (computed), actions.
//
//  Pinia holds tasks in memory (reactive). @capacitor/preferences
//  gives durability: we save on every mutation and load on app mount,
//  so tasks survive closing/reopening the tab.
// =============================================================
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

// Key under which the task list is persisted
const STORAGE_KEY = 'taskflow.tasks'

export const useTaskStore = defineStore('tasks', () => {
  // --- state ---
  // Each task: { id, name, done, photo } — photo holds a webPath string or null
  const tasks = ref([
    { id: 1, name: 'Finish Vue Day 2 assignment', done: true, photo: null },
    { id: 2, name: 'Review props and emits', done: true, photo: null },
    { id: 3, name: 'Mag Lunch sa Ayala', done: false, photo: null },
    { id: 4, name: 'Explore Vue Router guards', done: true, photo: null },
    { id: 5, name: 'Web Development Training', done: false, photo: null },
  ])
  const nextId = ref(6)

  // --- getters ---
  const totalCount   = computed(() => tasks.value.length)
  const doneCount    = computed(() => tasks.value.filter(t => t.done).length)
  const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

  // --- persistence ---
  // Serialize the whole task list (photo webPath is already a string, so JSON-safe).
  async function saveTasks() {
    try {
      await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(tasks.value) })
    } catch (err) {
      console.warn('Failed to save tasks:', err)
    }
  }

  // Load persisted tasks on app mount. Guards for missing keys and corrupt JSON.
  async function loadTasks() {
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEY })
      // Preferences.get() returns null for a missing key — keep the seed tasks.
      if (value == null) return
      const parsed = JSON.parse(value)
      if (!Array.isArray(parsed)) return
      tasks.value = parsed
      // Derive nextId from saved data so new ids never collide with existing ones.
      nextId.value = parsed.reduce((max, t) => Math.max(max, t.id), 0) + 1
    } catch (err) {
      // Corrupt JSON: fail gracefully and default to an empty list.
      console.warn('Failed to load tasks, starting empty:', err)
      tasks.value = []
    }
  }

  // --- actions ---
  function addTask(name) {
    const trimmed = (name ?? '').trim()
    if (!trimmed) return
    tasks.value.push({ id: nextId.value++, name: trimmed, done: false, photo: null })
    saveTasks()
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
    saveTasks()
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  // Attach a photo (webPath from Capacitor Camera) to a task
  function addPhotoToTask(id, path) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.photo = path
    saveTasks()
  }

  return {
    tasks, nextId, totalCount, doneCount, pendingCount,
    addTask, toggleTask, removeTask, addPhotoToTask,
    saveTasks, loadTasks,
  }
})
