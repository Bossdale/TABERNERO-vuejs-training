<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Back button returns to the Tasks tab -->
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks" />
        </ion-buttons>
        <ion-title>Task Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Found the task: show all of its fields -->
      <ion-list v-if="task">
        <ion-item>
          <ion-label>ID</ion-label>
          <ion-note slot="end">{{ route.params.id }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-wrap">Name</ion-label>
          <ion-note slot="end">{{ task.name }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Status</ion-label>
          <ion-badge slot="end" :color="task.done ? 'success' : 'medium'">
            {{ task.done ? 'Done' : 'Pending' }}
          </ion-badge>
        </ion-item>
      </ion-list>

      <!-- No task matched the :id param -->
      <ion-list v-else>
        <ion-item>
          <ion-label color="medium">Task #{{ id }} not found.</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
  IonNote, IonBadge,
} from '@ionic/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const store = useTaskStore();

// Read the :id route param (a string) and coerce to a number to match store ids
const id = computed(() => Number(route.params.id));
const task = computed(() => store.tasks.find(t => t.id === id.value));
</script>
