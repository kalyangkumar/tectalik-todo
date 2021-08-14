<template>
  <div class="home">
    <!-- <task-add></task-add> -->
    <task-list v-if="$store.state.tasks.length > 0"></task-list>
    <no-tasks v-else class="no-tasks"></no-tasks>
    <button-sort v-if="$store.state.sorting"></button-sort>
  </div>
</template>

<script>
import ButtonSort from "../components/Base/ButtonSort.vue";
import NoTasks from "../components/ToDo/NoTasks.vue";
import TaskList from "../components/ToDo/TaskList.vue";
// import TaskAdd from "../components/ToDo/TaskAdd.vue";
export default {
  components: { TaskList, NoTasks, ButtonSort },
};
</script>
