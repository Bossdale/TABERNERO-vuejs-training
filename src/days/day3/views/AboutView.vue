<!--
=============================================================
  DAY 3 ASSIGNMENT — AboutView.vue
  Static info page reached via the /about route
=============================================================
-->
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/home')
}

const features = [
  { icon: '🧭', title: 'Dynamic routes', text: 'Each task opens on its own /task/:id page.' },
  { icon: '🔎', title: 'Query params', text: 'Invalid IDs redirect home with ?error=notfound.' },
  { icon: '🛡️', title: 'Navigation guard', text: 'beforeEach protects the detail page.' },
]
</script>

<template>
  <div class="page-shell">
    <div class="glass-panel about-view">
      <button class="glass-btn back-btn" @click="goHome">← Back</button>

      <header>
        <h1>ℹ️ About</h1>
        <p class="lead">A small task manager built for the Vue.js Day 3 training.</p>
      </header>

      <ul class="features">
        <li v-for="f in features" :key="f.title" class="feature">
          <span class="icon">{{ f.icon }}</span>
          <div>
            <p class="f-title">{{ f.title }}</p>
            <p class="f-text">{{ f.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-view { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }

.back-btn { align-self: flex-start; }

h1 { color: var(--text); font-size: 28px; font-weight: 700; letter-spacing: 0.3px; }
.lead { margin-top: 6px; color: var(--text-dim); font-size: 15px; }

.features { list-style: none; padding: 0; margin: 0; width: 100%; display: flex; flex-direction: column; gap: 10px; }
.feature {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  transition: transform 0.25s var(--ease), background 0.25s var(--ease), border-color 0.25s var(--ease);
}
.feature:hover {
  transform: translateX(6px);
  background: var(--surface-hover);
  border-color: var(--border-strong);
}
.icon { font-size: 22px; flex-shrink: 0; }
.f-title { font-size: 15px; font-weight: 600; }
.f-text { font-size: 13px; color: var(--text-dim); margin-top: 2px; }
</style>
