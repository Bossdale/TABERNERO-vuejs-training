<!--
=============================================================
  DayTabs.vue — top-level navigation between Day 1–Day 4
  Uses the router (RouterLink) to switch between each day's task.
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { label: 'Day 1', hint: 'Reactivity',  to: '/day1', match: ['/day1'] },
  { label: 'Day 2', hint: 'Props & Emits', to: '/day2', match: ['/day2'] },
  { label: 'Day 3', hint: 'Vue Router', to: '/home', match: ['/home', '/task', '/about'] },
  { label: 'Day 4', hint: 'Pinia',      to: '/day4', match: ['/day4'] },
  { label: 'Day 5', hint: 'API / Fetch', to: '/day5', match: ['/day5'] },
]

// A tab is active when the current path matches any of its owned paths
// (Day 3 stays active across /task/:id and /about too).
const activePath = computed(() => route.path)
function isActive(tab) {
  return tab.match.some(p => activePath.value === p || activePath.value.startsWith(p + '/'))
}
</script>

<template>
  <header class="day-tabs">
    <div class="brand">🗂️ Vue Training</div>
    <nav class="tabs">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="tab"
        :class="{ active: isActive(tab) }"
      >
        <span class="tab-label">{{ tab.label }}</span>
        <span class="tab-hint">{{ tab.hint }}</span>
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.day-tabs {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 14px 22px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border, rgba(17, 24, 39, 0.08));
}

.brand {
  font-size: 15px;
  font-weight: 700;
  color: var(--text, #1f2933);
  letter-spacing: 0.3px;
}

.tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tab {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  padding: 8px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-dim, #6b7280);
  border: 1px solid transparent;
  transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease,
    transform 0.25s ease;
}
.tab:hover {
  color: var(--text, #1f2933);
  background: var(--surface-hover, #eef0f3);
  transform: translateY(-1px);
}
.tab.active {
  color: #0f5132;
  background: #eaf6f0;
  border-color: rgba(47, 143, 102, 0.35);
}

.tab-label { font-size: 14px; font-weight: 600; }
.tab-hint { font-size: 11px; opacity: 0.75; }
</style>
