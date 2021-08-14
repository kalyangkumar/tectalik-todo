<template>
  <v-btn
    @click="$store.commit('toggleSort')"
    color="primary"
    class="button-done-sorting"
    >Done Sorting</v-btn
  >
</template>

<script>
export default {};
</script>

<style lang="sass">
.button-done-sorting
    position: fixed
    left: 50%
    bottom: 20px
    transform: translateX(-50%)
</style>
