<template>
  <div>
    <vContainer class="d-flex d-flex-wrap" v-if="pak">
      <!-- list Pertemuan -->
      <vContainer v-if="pak" class="d-flex flex-wrap">
        <v-card
          class="ma-auto"
          max-width="400"
          v-for="(pak, index) in pak"
          :key="index"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="
              'https://avatars.dicebear.com/api/identicon/' + pak.id + '.svg'
            "
          >
          </v-img>
          <v-card-title> {{ pak.judul }} </v-card-title>
          <v-card-subtitle class="pb-0">
            Diajukan tgl : {{ tgl(pak.id) }}
          </v-card-subtitle>

          <VCardActions>
            <VBtn color="orange" text @click="$router.push(`/user/${pak.id}`)">
              Details
            </VBtn>
            <VBtn color="orange" @click="catatanData(pak.id)" text>
              Catatan
            </VBtn>
            <VSpacer />
            <VIcon color="red" @click="del(pak.uid)">mdi-delete</VIcon>
          </VCardActions>
        </v-card>
      </vContainer>

      <VBtn class="mx-2 plus" fab dark color="indigo" @click="modalParent">
        <VIcon>mdi-plus</VIcon>
      </VBtn>
    </vContainer>
  </div>
</template>

<script>
import { getData, setData, del } from '../firebase/firestore'
import dayjs from 'dayjs'

export default {
  components: {},
  data() {
    return {
      pak: {},
    }
  },
  methods: {
    modalParent() {
      this.dialog = !this.dialog
      this.parent.judul = ''
      this.parent.id = +new Date()
    },
    save() {
      setData('parent', this.parent).then(() => {
        this.getData()
        this.modalParent()
      })
    },
    getData() {
      getData('parent', 'groupId', '==', this.parent.groupId).then(
        (res) => (this.pak = res)
      )
    },
    tgl(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
    },
    del(index) {
      del('parent', index).then(this.getData())
    },
    catatanData(id) {
      getData('catatan', 'groupId', '==', id).then((res) => {
        this.catatan = true
        this.catatanCur = res
      })
    },
  },
  computed: {
    parData() {
      return this.$store.state.parent
    },
  },
  mounted() {
    this.getData()
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
