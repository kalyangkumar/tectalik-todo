<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-delete
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :task="task"
    ></dialog-delete>
    <edit-dialog
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
      :task="task"
    ></edit-dialog>
    <dates-dialog
      v-if="dialogs.date"
      @close="dialogs.date = false"
      :task="task"
    ></dates-dialog>
  </div>
</template>

<script>
import DatesDialog from "../Base/DatesDialog.vue";
import DialogDelete from "../Base/DialogDelete.vue";
import EditDialog from "../Base/EditDialog.vue";

export default {
  components: { DialogDelete, EditDialog, DatesDialog },
  props: ["task"],
  data: () => ({
    dialogs: {
      delete: false,
      edit: false,
      date: false,
      sort: false,
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
          console.log("edit");
        },
      },
      {
        title: "Due Date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.date = true;
          console.log("edit");
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
          console.log("edit");
        },
      },
      {
        title: "Sort",
        icon: "mdi-sort",
        click() {
          if (!this.$store.state.search) this.$store.commit("toggleSort");
          //   console.log("edit");
          else {
            this.$store.commit("showSnackbar", "cannot sort when searching");
          }
        },
      },
    ],
  }),
  methods: {
    handleClick(i) {
      this.items[i].click.call(this);
    },
  },
};
</script>

<style></style>
