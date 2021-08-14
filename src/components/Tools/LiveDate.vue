<template>
  <v-row class="text-subtitle-1 ml-4">
    {{ date }}
  </v-row>
</template>

<script>
import { format } from "date-fns";

export default {
  data() {
    return {
      date: "",
    };
  },
  methods: {
    niceDate() {
      this.date = format(new Date(), "dd-MMMM-yyyy | HH:mm:ss a");
      setTimeout(this.niceDate, 1000);
    },
  },
  mounted() {
    this.niceDate();
  },
};
</script>

<style></style>
