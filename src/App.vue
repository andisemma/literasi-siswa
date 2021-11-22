<template>
  <VApp>
    <div>
      <Toolbar />
      <router-view />
    </div>
  </VApp>
</template>

<script>
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    Toolbar,
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
}
</script>
