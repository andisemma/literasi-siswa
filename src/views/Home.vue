<template>
  <div>
    <VAlert type="info" :value="true">
      Selamat Datang di MELISA (MEdia LIterasi SiswA) SDN Sidorejo Lor 3
      Salatiga
    </VAlert>
    <vContainer class="d-flex d-flex-wrap" v-if="pak">
      <!-- list Pertemuan -->
      <vContainer v-if="pak" class="d-flex flex-wrap">
        <v-card
          class="ma-auto my-3 bounce"
          width="400"
          v-for="(pak, index) in pak"
          :key="index"
          elevation="8"
          @click="detail(pak.id)"
          style="cursor: pointer"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="
              'https://avatars.dicebear.com/api/identicon/' + pak.id + '.svg'
            "
          >
          </v-img>
          <p class="text-h5 px-3 mb-0">{{ pak.judul.slice(0, 60) }} ...</p>
          <v-card-title class="text-justify px-3"> </v-card-title>

          <p class="mt-0 px-3 text-right">
            <i>{{ tgl(pak.id) }}</i>
          </p>

          <p class="text-justify px-3">{{ pak.snap }} .....</p>
        </v-card>
      </vContainer>
    </vContainer>
  </div>
</template>

<script>
import { getData } from '../firebase/firestore'
import dayjs from 'dayjs'

export default {
  components: {},
  data() {
    return {
      dialog: false,
      pak: {},
    }
  },
  methods: {
    detail(id) {
      this.$router.push(`/artikel/${id}`)
    },
    getData() {
      getData('article', 'groupId', '!=', null).then((res) => (this.pak = res))
    },
    tgl(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
    },
  },
  computed: {},
  mounted() {
    this.getData()
  },
}
</script>
