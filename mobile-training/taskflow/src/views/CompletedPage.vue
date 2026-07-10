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

      <!-- Celebratory banner -->
      <div v-if="completedTasks.length > 0" class="done-banner">
        <ion-icon :icon="trophyOutline" />
        <div>
          <h2>{{ completedTasks.length }} completed</h2>
          <p>Great momentum — keep it going.</p>
        </div>
      </div>

      <ion-list class="app-cards" lines="none">
        <ion-item v-for="task in completedTasks" :key="task.id">
          <ion-icon slot="start" color="success" :icon="checkmarkCircle" />
          <ion-label class="task-name">{{ task.name }}</ion-label>
        </ion-item>
      </ion-list>

      <!-- Empty state -->
      <div v-if="completedTasks.length === 0" class="empty-state">
        <ion-icon :icon="checkmarkDoneOutline" />
        <p>Nothing completed yet.</p>
        <span>Tick off a task to see it here.</span>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/vue';
import { checkmarkCircle, checkmarkDoneOutline, trophyOutline } from 'ionicons/icons';
import { computed } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();
const completedTasks = computed(() => store.tasks.filter(t => t.done));
</script>

<style scoped>
.done-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 4px 16px 16px;
  padding: 16px 18px;
  border-radius: var(--app-radius);
  background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-secondary));
  color: #fff;
  box-shadow: var(--app-shadow-strong);
}
.done-banner ion-icon {
  font-size: 2.2rem;
}
.done-banner h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 800;
}
.done-banner p {
  margin: 2px 0 0;
  font-size: 0.85rem;
  opacity: 0.9;
}

.task-name {
  font-weight: 500;
}

.empty-state {
  margin-top: 12vh;
  text-align: center;
  color: var(--app-muted);
}
.empty-state ion-icon {
  font-size: 3rem;
  opacity: 0.5;
}
.empty-state p {
  margin: 10px 0 2px;
  font-size: 1rem;
  font-weight: 600;
}
.empty-state span {
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>
