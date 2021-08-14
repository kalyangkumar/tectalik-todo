<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-img
        height="170"
        class="pa-5 pt-7"
        src="blackberries.jpg"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img src="kalyan1.jpg" alt="kalyan" />
        </v-avatar>
        <div class="text-subtitle-1 white--text font-weight-bold">
          Kalyan Kumar
        </div>
        <div class="text-subtitle-2 white--text">kalyan@tectalik.com</div>
      </v-img>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="blackberries.jpg"
      prominent
      :height="$route.path === '/' ? '200' : '150'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search-tool></search-tool>
        </v-row>

        <v-row>
          <v-app-bar-title class="ml-4">{{
            $store.state.appTitle
          }}</v-app-bar-title>
        </v-row>
        <v-row>
          <live-date></live-date>
        </v-row>
        <v-row>
          <task-add v-if="$route.path === '/'"></task-add>
        </v-row>
      </v-container>

      <v-btn icon>
        <v-icon></v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snack-bar></snack-bar>
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from "../src/components/Base/SnackBar.vue";
import TaskAdd from "./components/ToDo/TaskAdd.vue";
import LiveDate from "./components/Tools/LiveDate.vue";
import SearchTool from "./components/Tools/SearchTool.vue";

export default {
  components: { SnackBar, SearchTool, LiveDate, TaskAdd },
  data: () => ({
    drawer: null,
    items: [
      { title: "ToDo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
  }),
  mounted() {
    this.$store.dispatch("getTasks");
  },
};
</script>
