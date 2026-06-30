<!--
=============================================================
  DAY 2 ASSIGNMENT — Reusable TaskCard Component
  Topic: Props, Emits, Slots, Component Lifecycle
  Files: TaskCard.vue (child)  +  TaskListView.vue (parent)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reusable TaskCard child component that accepts data as props
and communicates back to the parent via custom events (emits). The
parent renders a list of TaskCards and handles all state changes.

WHAT TO BUILD — TaskCard.vue (this file)
-----------------------------------------
  1. Accept a "task" prop: { id, name, done, dueDate }
  2. Display the task name and dueDate (via a named slot "meta")
  3. Emit "complete" event (payload: task.id) when Complete/Undo clicked
  4. Emit "delete" event (payload: task.id) when Delete clicked
  5. Show "Complete" when task.done is false, "Undo" when true
  6. Apply a visual style change when task.done is true

WHAT TO BUILD — TaskListView.vue (see that file)
-------------------------------------------------
  1. Hold a tasks ref array with at least 3 sample tasks
  2. Render a TaskCard for each task using v-for
  3. Handle @complete → toggle that task's done property
  4. Handle @delete → remove that task from the array
  5. Fill the "meta" named slot with the due date

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] TaskCard uses defineProps({ task: Object })
  [x] TaskCard uses defineEmits(['complete', 'delete'])
  [x] TaskCard has <slot name="meta" /> for optional metadata
  [x] Parent passes :task="task" and listens @complete @delete
  [x] Parent fills the slot with <template #meta>...</template>
  [x] Data flows DOWN (props) and events flow UP (emits)
  [x] Parent owns the state — TaskCard never mutates props directly

EXTENSION (additional points)
---------------------------------
  - Add a priority badge prop (low/medium/high) with colour coding
  - Add an edit mode: clicking the task name turns it into an input
  - Emit an "update" event when the edited name is saved

HINTS (read only if stuck)
---------------------------
  Hint 1: const props = defineProps({ task: { type: Object, required: true } })
  Hint 2: const emit = defineEmits(['complete', 'delete'])
  Hint 3: @click="emit('complete', props.task.id)"
  Hint 4: In the parent — @complete="handleComplete"
           function handleComplete(id) { find task by id, toggle done }
  Hint 5: Named slot in child  → <slot name="meta" />
           Fill in parent      → <template #meta>Due: {{ task.dueDate }}</template>
  Hint 6: NEVER do this inside TaskCard: props.task.done = !props.task.done
           That mutates a prop directly — Vue will warn you. Emit instead.
=============================================================
-->

<!-- ─── TaskCard.vue ─── -->
<script setup>
// TODO 2: Define the task prop with type Object, required: true
const props = defineProps({
  task: { type: Object, required: true }
})

// TODO 3: Define emits for 'complete' and 'delete'
const emit = defineEmits(['complete', 'delete'])
</script>

<template>
  <!-- TODO 4: Wrap everything in a div with class "task-card"
               Add :class="{ completed: task.done }" to the wrapper div -->
  <div class="task-card" :class="{ completed: task.done }">

    <div class="task-header">
      <!-- TODO 5: Display the task name -->
      <span class="name">{{ task.name }}</span>

      <!-- TODO 6: Add the named slot for metadata -->
      <span class="meta"><slot name="meta" /></span>
    </div>

    <div class="task-actions">
      <!-- TODO 7: Add Complete/Undo button — text changes based on task.done -->
      <!--         @click should emit 'complete' with task.id as payload -->
      <button class="btn-complete" @click="emit('complete', props.task.id)">
        {{ task.done ? 'Undo' : 'Complete' }}
      </button>

      <!-- TODO 8: Add Delete button — emits 'delete' with task.id -->
      <button class="btn-delete" @click="emit('delete', props.task.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── Glassmorphic card: frosted, translucent, sitting on the gradient ── */
.task-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 18px;
  padding: 18px 20px;
  margin-bottom: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}
.task-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.3);
}
/* Completed tasks get a soft green-tinted glass */
.task-card.completed {
  background: linear-gradient(
    135deg,
    rgba(66, 184, 131, 0.28),
    rgba(52, 211, 153, 0.12)
  );
  border-color: rgba(134, 239, 172, 0.55);
}
.task-card.completed span.name {
  text-decoration: line-through;
  opacity: 0.75;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}
.task-header span.name {
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0.2px;
}
.task-header .meta {
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 999px;
}
.task-actions {
  display: flex;
  gap: 10px;
}
/* Gradient fill button for the primary action */
.btn-complete {
  padding: 8px 18px;
  background: linear-gradient(135deg, #42B883, #2f9e6b);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(47, 158, 107, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}
.btn-complete:hover {
  transform: translateY(-1px);
  filter: brightness(1.08);
  box-shadow: 0 6px 18px rgba(47, 158, 107, 0.55);
}
/* Translucent glass button for the destructive action */
.btn-delete {
  padding: 8px 18px;
  background: rgba(248, 113, 113, 0.16);
  color: #fecaca;
  border: 1px solid rgba(248, 113, 113, 0.45);
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.btn-delete:hover {
  transform: translateY(-1px);
  background: rgba(248, 113, 113, 0.3);
  color: #ffffff;
}
</style>
