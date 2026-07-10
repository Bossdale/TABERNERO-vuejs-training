<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Stat cards -->
      <div class="stat-grid">
        <div class="stat-card">
          <ion-icon :icon="listOutline" />
          <span class="stat-value">{{ store.totalCount }}</span>
          <span class="stat-label">Total</span>
        </div>
        <div class="stat-card">
          <ion-icon color="success" :icon="checkmarkCircleOutline" />
          <span class="stat-value">{{ store.doneCount }}</span>
          <span class="stat-label">Done</span>
        </div>
        <div class="stat-card">
          <ion-icon color="secondary" :icon="timeOutline" />
          <span class="stat-value">{{ store.pendingCount }}</span>
          <span class="stat-label">Pending</span>
        </div>
      </div>

      <!-- Appearance -->
      <p class="section-title">Appearance</p>
      <ion-list class="app-cards" lines="none">
        <ion-item>
          <ion-icon slot="start" :icon="isDark ? moon : sunny" color="primary" />
          <ion-label>Dark mode</ion-label>
          <ion-toggle slot="end" :checked="isDark" @ionChange="onToggleDark" />
        </ion-item>
      </ion-list>

      <!-- About -->
      <p class="section-title">About</p>
      <ion-list class="app-cards" lines="none">
        <ion-item>
          <ion-icon slot="start" :icon="informationCircleOutline" color="primary" />
          <ion-label>Version</ion-label>
          <ion-note slot="end">1.0.0</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonNote, IonToggle, IonIcon,
} from '@ionic/vue';
import {
  moon, sunny, listOutline, checkmarkCircleOutline,
  timeOutline, informationCircleOutline,
} from 'ionicons/icons';
import { useTaskStore } from '@/stores/taskStore';
import { useTheme } from '@/composables/useTheme';

const store = useTaskStore();

// Shared theme state — persists to localStorage and toggles the Ionic dark palette
const { isDark, setDark } = useTheme();
const onToggleDark = (ev: CustomEvent) => setDark(ev.detail.checked);
</script>

<style scoped>
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 4px 16px 8px;
}
.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 8px;
  border-radius: var(--app-radius);
  background: var(--ion-card-background);
  box-shadow: var(--app-shadow);
}
.stat-card ion-icon {
  font-size: 1.5rem;
  color: var(--ion-color-primary);
}
.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--app-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  margin: 20px 16px 8px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--app-muted);
}
</style>
