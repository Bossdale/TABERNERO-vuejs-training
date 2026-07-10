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

      <ion-list>
        <ion-item>
          <ion-label>Total tasks</ion-label>
          <ion-note slot="end">{{ store.totalCount }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Completed</ion-label>
          <ion-note slot="end">{{ store.doneCount }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Pending</ion-label>
          <ion-note slot="end">{{ store.pendingCount }}</ion-note>
        </ion-item>
        <ion-item>
          <ion-label>Dark mode</ion-label>
          <ion-toggle slot="end" :checked="darkMode" @ionChange="toggleDark" />
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonNote, IonToggle,
} from '@ionic/vue';
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();

// Simple dark-mode toggle that flips the Ionic palette class on <html>
const darkMode = ref(document.documentElement.classList.contains('ion-palette-dark'));
const toggleDark = (ev: CustomEvent) => {
  darkMode.value = ev.detail.checked;
  document.documentElement.classList.toggle('ion-palette-dark', darkMode.value);
};
</script>
