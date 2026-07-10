<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tasks</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Summary counts from the Pinia getters -->
      <ion-list-header>
        <ion-label>{{ pendingCount }} pending · {{ doneCount }} done · {{ totalCount }} total</ion-label>
      </ion-list-header>

      <!-- Task list: was <ul>/<li>, now IonList/IonItem -->
      <ion-list>
        <ion-item
          v-for="task in tasks"
          :key="task.id"
          button
          :detail="true"
          @click="openTask(task.id)"
        >
          <ion-checkbox
            slot="start"
            :checked="task.done"
            @click.stop
            @ionChange="toggleTask(task.id)"
          />
          <ion-label :class="{ done: task.done }">{{ task.name }}</ion-label>
          <!-- was a <button>, now an IonButton -->
          <ion-button
            slot="end"
            fill="clear"
            color="danger"
            @click.stop="removeTask(task.id)"
          >
            <ion-icon slot="icon-only" :icon="trashOutline" />
          </ion-button>
        </ion-item>

        <ion-item v-if="totalCount === 0">
          <ion-label color="medium">No tasks yet — tap + to add one.</ion-label>
        </ion-item>
      </ion-list>

      <!-- Floating action button to add a new task -->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="promptNewTask">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>

      <!-- Alert with a text input, opened by the FAB -->
      <ion-alert
        :is-open="alertOpen"
        header="New Task"
        :buttons="alertButtons"
        :inputs="alertInputs"
        @didDismiss="alertOpen = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonListHeader, IonItem, IonLabel, IonCheckbox,
  IonButton, IonIcon, IonFab, IonFabButton, IonAlert,
} from '@ionic/vue';
import { add, trashOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/taskStore';

const router = useRouter();
// Tapping a task item navigates to its detail page
const openTask = (id: number) => router.push(`/tabs/tasks/${id}`);

const store = useTaskStore();
// Reactive state + getters via storeToRefs
const { tasks, totalCount, doneCount, pendingCount } = storeToRefs(store);
// Actions destructured directly (no storeToRefs)
const { addTask, toggleTask, removeTask } = store;

// FAB -> alert-with-input flow
const alertOpen = ref(false);
const promptNewTask = () => { alertOpen.value = true; };

const alertInputs = [
  { name: 'name', type: 'text', placeholder: 'What needs doing?' },
];

const alertButtons = [
  { text: 'Cancel', role: 'cancel' },
  {
    text: 'Add',
    handler: (data: { name: string }) => {
      addTask(data.name);
    },
  },
];
</script>

<style scoped>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
