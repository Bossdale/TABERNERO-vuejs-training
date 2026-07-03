// =============================================================
//  DAY 3 ASSIGNMENT — Vue Router: router/index.js
//  Topic: Dynamic Routes, Navigation Guards, Programmatic Navigation
//  Files: router/index.js  |  HomeView.vue  |  TaskDetailView.vue
// =============================================================
//
//  1. /home         → HomeView.vue  (task list with router-link to each task)
//  2. /task/:id     → TaskDetailView.vue  (detail page for one task)
//  3. /about        → AboutView.vue  (static info page)
//  4. /             → redirects to /home
//
//  NAVIGATION GUARD: navigating to /task/:id with a non-existent ID
//  redirects to /home?error=notfound
// =============================================================

import { createRouter, createWebHistory } from 'vue-router'

// ── Day 1 & Day 2 pages ──
import Day1TaskCounter  from '@/days/day1/components/TaskCounter.vue'
import Day2TaskListView from '@/days/day2/components/TaskListView.vue'

// ── Day 3 views (TODO 1) ──
import HomeView       from '@/days/day3/views/HomeView.vue'
import TaskDetailView from '@/days/day3/views/TaskDetailView.vue'
import AboutView      from '@/days/day3/views/AboutView.vue'

// ── Day 4 page (Pinia) ──
import Day4TaskListView from '@/days/day4/views/TaskListView.vue'

// ── Day 5 page (API / useFetch composable) ──
import Day5TodoListView from '@/days/day5/views/TodoListView.vue'

// TODO 2: Import your task store so the guard can check if a task exists
import { useTaskStore } from '@/days/day3/stores/taskStore.js'

const routes = [
  // TODO 3: Redirect from '/' to '/home'
  { path: '/', redirect: '/day1' },

  // ── Day 1 & Day 2 ──
  { path: '/day1', component: Day1TaskCounter },
  { path: '/day2', component: Day2TaskListView },

  // ── Day 3 (Vue Router assignment) ──
  // TODO 4: The /home route
  { path: '/home', component: HomeView },

  // TODO 5: The /task/:id dynamic route (protected by the guard)
  { path: '/task/:id', component: TaskDetailView, meta: { requiresTask: true } },

  // TODO 6: The /about route
  { path: '/about', component: AboutView },

  // ── Day 4 (Pinia assignment) ──
  { path: '/day4', component: Day4TaskListView },

  // ── Day 5 (API integration assignment) ──
  { path: '/day5', component: Day5TodoListView },
]

const router = createRouter({
  // TODO 7: Use createWebHistory() for clean URLs
  history: createWebHistory(),
  routes,
})

// TODO 8: beforeEach navigation guard
// - If to.meta.requiresTask is true, check the store for a matching task.
// - If NOT found: redirect to /home?error=notfound
// - Otherwise: continue.
router.beforeEach((to, from, next) => {
  if (to.meta.requiresTask) {
    const taskStore = useTaskStore()
    const exists = taskStore.tasks.some(t => t.id === Number(to.params.id))
    if (!exists) {
      return next({ path: '/home', query: { error: 'notfound' } })
    }
  }
  next() // don't remove this — it must always be called
})

export default router
