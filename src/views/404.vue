<template>
  <div>
    <v-alert dark color="red">404: Page Not Found </v-alert>
    <v-btn
      class="mx-auto display"
      elevation="5"
      color="primary"
      @click="$router.push('/')"
      >Home</v-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 5,
    }
  },
  methods: {},
  computed: {},
  mounted() {},
}
</script>

<style scoped>
.display {
  display: grid;
  align-items: center;
}
</style>
