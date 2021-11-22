<template>
  <div class="pa-4">
    <p class="text-h5 judul text-justify">{{ detail.judul }}</p>
    <v-row class="">
      <v-avatar size="64" class="col-0 mt-1 ml-7">
        <v-img :src="detail.photoURL"></v-img>
      </v-avatar>
      <div class="col-8">
        <span>
          <b>{{ detail.displayName }}</b
          >, <b>{{ detail.contributor }}</b>
        </span>
        <p>{{ tgl(detail.id) }}</p>
      </div>
    </v-row>
    <br />
    <p class="text-justify" v-for="(item, index) in detail.isi" :key="index">
      {{ item }}
    </p>

    <hr style="border: solid black 1px" />

    <v-row class="mt-4 px-4">
      <v-icon color="red">mdi-heart</v-icon><b class="mr-6">3456</b>
      <v-icon color="success">mdi-message-text</v-icon><b class="mr-6">1237</b>
    </v-row>

    <v-row class="pl-4">
      <v-avatar size="64" class="col-0 mt-1">
        <v-img :src="detail.photoURL"></v-img>
      </v-avatar>
      <div class="col-6">
        <b>WRITTEN BY</b>
        <br />
        <i>{{ detail.displayName }} </i>
      </div>
    </v-row>
    <br />
    <p class="text-justify">
      Seorang guru yang supel, sabar, disiplin, jujur, rendah hati, berwibawa,
      santun, empati, ikhlas, berakhlak mulia, bertindak sesuai norma sosial &
      hukum
    </p>
  </div>
</template>

<script>
import { getData } from '../firebase/firestore'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      detail: {
        judul: '',
        id: null,
        groupId: null,
        isi: [''],
        snap: '',
        photoURL: null,
        displayName: null,
      },
    }
  },
  methods: {
    tgl(date) {
      return dayjs(date).format('DD MMM YYYY')
    },
  },
  computed: {},
  mounted() {
    getData('details', 'id', '==', parseInt(this.$route.params.id)).then(
      (res) => (this.detail = res[0])
    )
  },
}
</script>

<style scoped>
.judul {
  font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>
