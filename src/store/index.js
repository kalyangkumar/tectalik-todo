import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

let db = new Localbase("db");
db.config.debut = false;
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    tasks: [
      // {
      //   id: 1,
      //   title: "wake up",
      //   done: false,
      //   dueDate: "2021-08-21",
      // },
      // {
      //   id: 2,
      //   title: "fetch breakfast",
      //   done: false,
      //   dueDate: "2021-08-23",
      // },
      // {
      //   id: 3,
      //   title: "do coding",
      //   done: false,
      //   dueDate: null,
      // },
    ],
    sorting: false,
    snackBar: {
      show: false,
      text: "",
    },
  },
  mutations: {
    setSearch(state, value) {
      state.search = value;
      console.log(value);
    },
    addTask(state, newTask) {
      state.tasks.unshift(newTask);
    },
    doneTask(state, key) {
      const updatedTask = state.tasks.filter((task) => task.id === key)[0];
      updatedTask.done = !updatedTask.done;
      // console.log(state.tasks);
    },
    deleteTask(state, key) {
      state.tasks = state.tasks.filter((task) => task.id !== key);
    },
    editTask(state, payload) {
      // console.log(payload);
      const newTask = state.tasks.filter((task) => task.id === payload.id)[0];
      newTask.title = payload.title;
    },
    editDate(state, payload) {
      // console.log(payload);
      const newTask = state.tasks.filter((task) => task.id === payload.id)[0];
      newTask.dueDate = payload.dueDate;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackBar.show) {
        state.snackBar.show = false;
        timeout = 300;
      }
      setTimeout(function() {
        (state.snackBar.show = true), (state.snackBar.text = text);
      }, timeout);
    },
    toggleSort(state) {
      state.sorting = !state.sorting;
      // console.log(state.sorting);
    },
    setTasks(state, tasks) {
      // console.log("tasks", tasks);
      state.tasks = tasks;
    },
  },
  actions: {
    getTasks({ commit }) {
      db.collection("tasks")
        .get()
        .then((tasks) => {
          commit("setTasks", tasks);
        });
    },
    addTask({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      db.collection("tasks")
        .add(newTask)
        .then(() => {
          commit("addTask", newTask);
          commit("showSnackbar", "task added");
        });
    },
    deleteTask({ commit }, key) {
      db.collection("tasks")
        .doc({ id: key })
        .delete()
        .then(() => {
          commit("deleteTask", key);
          commit("showSnackbar", "task deleted");
        });
    },
    doneTask({ state, commit }, key) {
      const updatedTask = state.tasks.filter((task) => task.id === key)[0];
      db.collection("tasks")
        .doc({ id: key })
        .update({
          done: !updatedTask.done,
        })
        .then(() => {
          commit("doneTask", key);
          commit("showSnackbar", "task completed");
        });
    },
    editTask({ state, commit }, payload) {
      const newTask = state.tasks.filter((task) => task.id === payload.id)[0];
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          title: payload.title,
        })
        .then(() => {
          commit("editTask", payload);
          commit("showSnackbar", "task edited");
        });
    },
    editDate({ state, commit }, payload) {
      const newTask = state.tasks.filter((task) => task.id === payload.id)[0];
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          dueDate: payload.dueDate,
        })
        .then(() => {
          commit("editDate", payload);
          commit("showSnackbar", "date edited");
        });
    },
    setTasks({ commit }, tasks) {
      db.collection("tasks").set(tasks);
      commit("setTasks", tasks);
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks;
      } else {
        return state.tasks.filter((task) =>
          task.title.toLowerCase().includes(state.search.toLowerCase())
        );
      }
    },
  },
});
