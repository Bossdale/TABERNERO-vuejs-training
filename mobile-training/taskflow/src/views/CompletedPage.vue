<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Completed</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Completed</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="task in completedTasks" :key="task.id">
          <ion-icon slot="start" color="success" :icon="checkmarkCircle" />
          <ion-label>{{ task.name }}</ion-label>
        </ion-item>

        <ion-item v-if="completedTasks.length === 0">
          <ion-label color="medium">Nothing completed yet.</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/vue';
import { checkmarkCircle } from 'ionicons/icons';
import { computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();
const completedTasks = computed(() => store.tasks.filter(t => t.done));
</script>
