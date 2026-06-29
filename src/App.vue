<script setup lang="ts">
// @ts-expect-error — JS single-file component (the day1 activity) has no type declarations
import TaskCounter from './components/day1_taskCounter.vue'
</script>

<template>
  <TaskCounter />
</template>
