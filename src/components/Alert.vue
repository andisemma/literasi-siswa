<template>
  <v-alert dense text :type="type">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    type: String,
    text: String,
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
}
</script>
