<template>
  <v-list flat class="pt-0">
    <draggable v-model="tasks" handle=".handle">
      <task-item v-for="task of tasks" :key="task.id" :task="task"> </task-item>
    </draggable>
  </v-list>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import draggable from "vuedraggable";
export default {
  components: { TaskItem, draggable },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.tasksFiltered;
      },
      set(value) {
        this.$store.dispatch("setTasks", value);
      },
    },
  },
};
</script>

<style></style>
