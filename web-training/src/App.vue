<script setup lang="ts">
// Persistent top navigation between Day 1–Day 4, each rendered via the router.
// @ts-ignore — JS single-file component (no <script lang="ts">, so no type declarations)
import DayTabs from './components/DayTabs.vue'
</script>

<template>
  <DayTabs />

  <!-- Each day's task is rendered here based on the active route -->
  <RouterView />
</template>
