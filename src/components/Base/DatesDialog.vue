<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="taskDate"
    persistent
    width="290px"
  >
    <v-date-picker v-model="taskDate" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="$emit('close')">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="saveTask">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      date: null,
      taskDate: "",
    };
  },
  methods: {
    saveTask() {
      let payload = {
        id: this.task.id,
        dueDate: this.taskDate,
      };
      this.$store.dispatch("editDate", payload);
      this.$emit("close");
    },
  },
  mounted() {
    this.taskDate = this.task.dueDate;
  },
};
</script>

<style></style>
