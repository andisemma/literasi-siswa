<template>
  <v-app-bar color="white" elevation="12">
    <img src="@/assets/logo.png" height="32" width="32" alt="" />

    <h1>MELISA</h1>

    <VSpacer />
    <span></span>
    <button v-if="$route.path == '/'">
      <img
        src="@/assets/google.png"
        height="40"
        width="120"
        alt=""
        @click="signIn"
      />
    </button>
    <div v-else class="">
      <v-row>
        <h3 class="mr-2">{{ $store.state.profile.displayName }}</h3>
        <v-avatar @click="menu = true" style="cursor: pointer" size="36">
          <img :src="$store.state.profile.photoURL" alt="" />
        </v-avatar>
      </v-row>

      <!-- menu -->
      <VDialog
        v-model="menu"
        scrollable
        :overlay="false"
        max-width="300px"
        transition="dialog-transition"
      >
        <VCard>
          <v-img
            class="white--text align-end"
            height="200px"
            :src="$store.state.profile.photoURL"
          >
          </v-img>
          <VCardTitle> {{ $store.state.profile.displayName }} </VCardTitle>
          <v-card-subtitle class="pb-0">
            Guru berintegritas dan dedikasi tinggi ❤️
          </v-card-subtitle>

          <VCardActions>
            <VBtn color="orange" text> Catatan </VBtn>
            <VSpacer />
            <VIcon color="red" @click="signOut()">mdi-logout-variant</VIcon>
          </VCardActions>
        </VCard>
      </VDialog>
    </div>
  </v-app-bar>
</template>

<script>
import * as Auth from '../firebase/auth'
import { getOnce } from '../firebase/firestore'

export default {
  computed: {},
  methods: {
    signOut() {
      this.$store.commit('signOut')
      localStorage.clear()
      Auth.fireSignOut()
      this.$router.replace('/')
    },
    signIn() {
      Auth.googleLogin().then((res) => {
        const profile = res
        getOnce('admin', res.email).then((res) => {
          if (res) {
            this.$store.commit('setProfile', {
              ...profile,
              ...{ isAdmin: true },
            })
            this.$router.push('/admin')
          }
        })
      })
    },
  },
  data() {
    return {
      menu: false,
    }
  },
}
</script>

<style scoped>
.plus {
  position: fixed;
  bottom: 3%;
  right: 3%;
}
</style>
