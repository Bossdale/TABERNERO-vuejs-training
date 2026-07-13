// =============================================================
//  Pinia Store: stores/taskStore.js  (copied from Day 4 training)
//  Setup Store pattern: state (refs), getters (computed), actions.
// =============================================================
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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

  // --- actions ---
  function addTask(name) {
    const trimmed = (name ?? '').trim()
    if (!trimmed) return
    tasks.value.push({ id: nextId.value++, name: trimmed, done: false, photo: null })
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  // Attach a photo (webPath from Capacitor Camera) to a task
  function addPhotoToTask(id, path) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.photo = path
  }

  return { tasks, nextId, totalCount, doneCount, pendingCount, addTask, toggleTask, removeTask, addPhotoToTask }
})
