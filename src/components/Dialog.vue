<template>
  <!-- Modal Parent -->
  <v-dialog
    v-model="this.$attrs.dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card>
      <div>
        <VToolbar dark :color="color">
          <VBtn icon dark @click="$emit('close')">
            <VIcon>mdi-close</VIcon>
          </VBtn>
          <v-toolbar-title> {{ title }} </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <VBtn dark text @click="$emit('save')"> Save </VBtn>
          </v-toolbar-items>
        </VToolbar>

        <slot />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: String,

    color: String,
  },
}
</script>
