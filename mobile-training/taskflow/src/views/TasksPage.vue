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

      <!-- Progress summary card -->
      <div class="progress-card">
        <div class="progress-head">
          <div>
            <p class="progress-kicker">Your progress</p>
            <h2 class="progress-count">{{ doneCount }}<span>/{{ totalCount }}</span></h2>
          </div>
          <div class="progress-ring">{{ percent }}%</div>
        </div>
        <ion-progress-bar :value="percent / 100" />
        <p class="progress-sub">
          {{ pendingCount === 0 && totalCount > 0 ? 'All done — nice work! 🎉' : `${pendingCount} left to do` }}
        </p>
      </div>

      <!-- Filter segment -->
      <ion-segment v-model="filter" class="filter-seg" mode="ios">
        <ion-segment-button value="all"><ion-label>All</ion-label></ion-segment-button>
        <ion-segment-button value="active"><ion-label>Active</ion-label></ion-segment-button>
        <ion-segment-button value="done"><ion-label>Done</ion-label></ion-segment-button>
      </ion-segment>

      <!-- Task list as cards -->
      <ion-list class="app-cards" lines="none">
        <ion-item
          v-for="task in filteredTasks"
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
          <ion-label :class="{ done: task.done }" class="task-name">{{ task.name }}</ion-label>
          <ion-button
            slot="end"
            fill="clear"
            color="danger"
            @click.stop="removeTask(task.id)"
          >
            <ion-icon slot="icon-only" :icon="trashOutline" />
          </ion-button>
        </ion-item>
      </ion-list>

      <!-- Empty state -->
      <div v-if="filteredTasks.length === 0" class="empty-state">
        <ion-icon :icon="emptyIcon" />
        <p>{{ emptyText }}</p>
      </div>

      <!-- Add-task FAB -->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="promptNewTask">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>

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
  IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonIcon,
  IonFab, IonFabButton, IonAlert, IonProgressBar,
  IonSegment, IonSegmentButton,
} from '@ionic/vue';
import { add, trashOutline, listOutline, checkmarkDoneOutline, sparklesOutline } from 'ionicons/icons';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/taskStore';

const router = useRouter();
// Tapping a task item navigates to its detail page
const openTask = (id: number) => router.push(`/tabs/tasks/${id}`);

const store = useTaskStore();
const { tasks, totalCount, doneCount, pendingCount } = storeToRefs(store);
const { addTask, toggleTask, removeTask } = store;

// Completion percentage for the progress card
const percent = computed(() =>
  totalCount.value === 0 ? 0 : Math.round((doneCount.value / totalCount.value) * 100),
);

// Filter: all | active | done
const filter = ref<'all' | 'active' | 'done'>('all');
const filteredTasks = computed(() => {
  if (filter.value === 'active') return tasks.value.filter(t => !t.done);
  if (filter.value === 'done') return tasks.value.filter(t => t.done);
  return tasks.value;
});

// Contextual empty-state copy + icon
const emptyText = computed(() => {
  if (filter.value === 'active') return 'No active tasks — you\'re all caught up!';
  if (filter.value === 'done') return 'Nothing completed yet.';
  return 'No tasks yet — tap + to add one.';
});
const emptyIcon = computed(() => {
  if (filter.value === 'active') return sparklesOutline;
  if (filter.value === 'done') return checkmarkDoneOutline;
  return listOutline;
});

// FAB -> alert-with-input flow
const alertOpen = ref(false);
const promptNewTask = () => { alertOpen.value = true; };

const alertInputs = [
  { name: 'name', type: 'text' as const, placeholder: 'What needs doing?' },
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
/* Progress card */
.progress-card {
  margin: 4px 16px 16px;
  padding: 18px 20px;
  border-radius: var(--app-radius);
  background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-secondary));
  color: #fff;
  box-shadow: var(--app-shadow-strong);
}
.progress-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.progress-kicker {
  margin: 0;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.75;
}
.progress-count {
  margin: 2px 0 0;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}
.progress-count span {
  font-size: 1.1rem;
  font-weight: 600;
  opacity: 0.7;
}
.progress-ring {
  min-width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  font-weight: 700;
  font-size: 0.95rem;
}
.progress-card ion-progress-bar {
  --background: rgba(255, 255, 255, 0.25);
  --progress-background: #fff;
}
.progress-sub {
  margin: 10px 0 0;
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Task name + completed strike-through animation */
.task-name {
  transition: opacity 0.25s ease;
  font-weight: 500;
}
.done {
  text-decoration: line-through;
  opacity: 0.45;
}

/* Empty state */
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
  margin-top: 10px;
  font-size: 0.95rem;
}
</style>
