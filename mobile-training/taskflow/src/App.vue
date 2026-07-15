<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useTaskStore } from '@/stores/taskStore';

// Load persisted tasks once the app mounts so they survive tab close/reopen.
const store = useTaskStore();
onMounted(() => store.loadTasks());
</script>
