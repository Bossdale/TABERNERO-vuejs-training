import { reactive } from 'vue'

// Module-level reactive state — created once, shared everywhere.
const state = reactive({
  tasks: [
    { id: 1, name: 'Finish Vue Day 2 assignment', done: true, dueDate: '2026-07-01' },
    { id: 2, name: 'Review props and emits',      done: true,  dueDate: '2026-06-29' },
    { id: 3, name: 'Mag Lunch sa Ayala',          done: false, dueDate: '2026-07-03' },
    { id: 4, name: 'Explore Vue Router guards',    done: true, dueDate: '2026-07-05' },
    { id: 5, name: 'Web Development Training', done: false,  dueDate: '2026-06-30' },
  ],
})

export function useTaskStore() {
  return state
}
