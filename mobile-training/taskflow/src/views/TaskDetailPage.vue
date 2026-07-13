<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tasks" />
        </ion-buttons>
        <ion-title>Task Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Found the task -->
      <template v-if="task">
        <div class="detail-hero">
          <div class="status-chip" :class="task.done ? 'is-done' : 'is-pending'">
            <ion-icon :icon="task.done ? checkmarkCircle : ellipseOutline" />
            {{ task.done ? 'Completed' : 'Pending' }}
          </div>
          <h1 :class="{ done: task.done }">{{ task.name }}</h1>
          <p class="task-id">Task #{{ route.params.id }}</p>
        </div>

        <!-- Attached photo -->
        <div v-if="task.photo" class="task-photo">
          <ion-img :src="task.photo" />
        </div>

        <ion-list class="app-cards" lines="none">
          <ion-item>
            <ion-icon slot="start" :icon="pricetagOutline" color="primary" />
            <ion-label>ID</ion-label>
            <ion-note slot="end">{{ route.params.id }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" :icon="documentTextOutline" color="primary" />
            <ion-label>Name</ion-label>
            <ion-note slot="end" class="ion-text-wrap">{{ task.name }}</ion-note>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" :icon="flagOutline" color="primary" />
            <ion-label>Status</ion-label>
            <ion-badge slot="end" :color="task.done ? 'success' : 'medium'">
              {{ task.done ? 'Done' : 'Pending' }}
            </ion-badge>
          </ion-item>
        </ion-list>

        <!-- Interactive actions -->
        <div class="actions">
          <ion-button
            expand="block"
            :color="task.done ? 'medium' : 'primary'"
            @click="toggleTask(task.id)"
          >
            <ion-icon slot="start" :icon="task.done ? arrowUndoOutline : checkmarkOutline" />
            {{ task.done ? 'Mark as pending' : 'Mark as done' }}
          </ion-button>
          <ion-button expand="block" fill="outline" @click="onAddPhoto">
            <ion-icon slot="start" :icon="cameraOutline" />
            {{ task.photo ? 'Change photo' : 'Add photo' }}
          </ion-button>
          <ion-button expand="block" fill="clear" color="danger" @click="onDelete">
            <ion-icon slot="start" :icon="trashOutline" />
            Delete task
          </ion-button>
        </div>
      </template>

      <!-- Not found -->
      <div v-else class="empty-state">
        <ion-icon :icon="alertCircleOutline" />
        <p>Task #{{ id }} not found.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
  IonNote, IonBadge, IonButton, IonIcon, IonImg,
  actionSheetController,
} from '@ionic/vue';
import {
  checkmarkCircle, ellipseOutline, pricetagOutline, documentTextOutline,
  flagOutline, checkmarkOutline, arrowUndoOutline, trashOutline, alertCircleOutline,
  cameraOutline, imagesOutline,
} from 'ionicons/icons';
import { Camera } from '@capacitor/camera';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const router = useRouter();
const store = useTaskStore();
const { toggleTask, removeTask, addPhotoToTask } = store;

// Read the :id route param (a string) and coerce to a number to match store ids
const id = computed(() => Number(route.params.id));
const task = computed(() => store.tasks.find(t => t.id === id.value));

const onAddPhoto = async () => {
  const sheet = await actionSheetController.create({
    header: 'Add photo',
    buttons: [
      { text: 'Take Photo', icon: cameraOutline, handler: () => { capture('camera'); } },
      { text: 'Choose from Gallery', icon: imagesOutline, handler: () => { capture('gallery'); } },
      { text: 'Cancel', role: 'cancel' },
    ],
  });
  await sheet.present();
};

const capture = async (source: 'camera' | 'gallery') => {
  try {
    let webPath: string | undefined;
    if (source === 'camera') {
      const result = await Camera.takePhoto({ quality: 80 });
      webPath = result.webPath;
    } else {
      const { results } = await Camera.chooseFromGallery({ quality: 80 });
      webPath = results[0]?.webPath;
    }
    if (webPath) addPhotoToTask(id.value, webPath);
  } catch (err) {
    // User cancelled the picker, or permission denied — no-op
    console.warn('Photo capture cancelled or failed:', err);
  }
};

// Delete then return to the task list
const onDelete = () => {
  removeTask(id.value);
  router.replace('/tabs/tasks');
};
</script>

<style scoped>
.detail-hero {
  padding: 20px 20px 4px;
}
.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.status-chip ion-icon {
  font-size: 1rem;
}
.status-chip.is-done {
  background: rgba(46, 158, 107, 0.15);
  color: var(--ion-color-success);
}
.status-chip.is-pending {
  background: rgba(63, 111, 181, 0.15);
  color: var(--ion-color-secondary);
}
.detail-hero h1 {
  margin: 12px 0 4px;
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1.2;
}
.detail-hero h1.done {
  text-decoration: line-through;
  opacity: 0.5;
}
.task-id {
  margin: 0;
  color: var(--app-muted);
  font-size: 0.85rem;
}

.task-photo {
  margin: 16px;
  border-radius: var(--app-radius);
  overflow: hidden;
  box-shadow: var(--app-shadow-strong);
}
.task-photo ion-img {
  display: block;
  width: 100%;
  max-height: 320px;
  object-fit: cover;
}

.actions {
  margin: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.actions ion-button {
  --border-radius: 14px;
  font-weight: 600;
}

.empty-state {
  margin-top: 15vh;
  text-align: center;
  color: var(--app-muted);
}
.empty-state ion-icon {
  font-size: 3rem;
  opacity: 0.5;
}
.empty-state p {
  margin-top: 10px;
  font-size: 1rem;
  font-weight: 600;
}
</style>
