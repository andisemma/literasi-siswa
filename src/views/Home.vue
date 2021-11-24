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
import { getData, setData, del, fireSetDataWithId } from '../firebase/firestore'
import dayjs from 'dayjs'

export default {
  components: {},
  data() {
    return {
      dialog: false,
      pak: {},
      article: {
        contributor: null,
        judul: '',
        id: null,
        groupId: this.$store.state.profile.email,
        isi: [''],
        snap: '',
        photoURL: this.$store.state.profile.photoURL,
        displayName: this.$store.state.profile.displayName,
        kategori: '',
      },
      items: ['Cerpen', 'Puisi', 'Berita', 'Pelajaran', 'Sejarah', 'Lainnya'],
      email: [
        'sitimusrifah50@guru.sd.belajar.id',
        'nurardiani66@guru.sd.belajar.id',
        'nuurruwaida57@guru.sd.belajar.id',
        'caturdarmanto43@admin.sd.belajar.id',
        'ranindyakartika26@guru.sd.belajar.id',
        'rizafatmawati11@guru.sd.belajar.id',
        'hanieklathifah46@guru.sd.belajar.id',
        'nurnihayati35@guru.sd.belajar.id',
        'parmusi86@guru.sd.belajar.id',
        'yantisupriyatun71@guru.sd.belajar.id',
        'irnawati344@guru.sd.belajar.id',
        'nilakrisnawati91@guru.sd.belajar.id',
        'fitrikurniawati45@guru.sd.belajar.id',
        'endahfatmawati60@guru.sd.belajar.id',
        'trifenahistoryani82@guru.sd.belajar.id',
        'septinemaryani39@guru.sd.belajar.id',
        'waluyo18@admin.sd.belajar.id',
        'srisulastri09@guru.sd.belajar.id',
        'sumpono55@guru.sd.belajar.id',
        'marditawirayanti03@guru.sd.belajar.id',
        'aprinasavitri14@guru.sd.belajar.id',
        'ekoprastyo30@guru.sd.belajar.id',
      ],
    }
  },
  methods: {
    detail(id) {
      this.$router.push(`/${id}`)
    },
    add() {
      this.dialog = !this.dialog
      this.article.id = +new Date()
    },
    close() {
      this.article.judul = ''
      this.article.id = null
      this.article.isi = ['']
      this.dialog = !this.dialog
    },
    modalParent() {
      this.dialog = !this.dialog
      this.parent.judul = ''
      this.parent.id = +new Date()
    },
    newParagraph() {
      this.article.isi.push('')
    },
    delParagraph() {
      this.article.isi.splice(-1, 1)
    },
    save() {
      let header = {
        judul: this.article.judul,
        id: this.article.id,
        groupId: this.article.groupId,
        snap: this.article.isi[0].slice(0, 200),
      }
      setData('article', header).then(() => {
        setData('details', this.article).then(() => {
          this.getData()
          this.close()
        })
      })
    },
    getData() {
      getData('article', 'groupId', '!=', null).then((res) => (this.pak = res))
    },
    tgl(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
    },
    del(index) {
      del('article', index).then(this.getData())
    },
    addEmail() {
      this.email.forEach((item) => {
        fireSetDataWithId('admin', item, { isAdmin: true }).then(
          console.log(item)
        )
      })
    },
  },
  computed: {},
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

.bounce {
  -animation: bounce 0.4s linear;
}

@keyframes bounce {
  0% {
    -moz-transform: scale(0);
    opacity: 0;
  }
  50% {
    -moz-transform: scale(1.3);
    opacity: 0.4;
  }
  75% {
    -moz-transform: scale(0.9);
    opacity: 0.7;
  }
  100% {
    -moz-transform: scale(1);
    opacity: 1;
  }
}

@-webkit-keyframes bounce {
  0% {
    -webkit-transform: scale(0);
    opacity: 0;
  }
  50% {
    -webkit-transform: scale(1.3);
    opacity: 0.4;
  }
  75% {
    -webkit-transform: scale(0.9);
    opacity: 0.7;
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 1;
  }
}
.pulse {
  margin: 100px;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: orange;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: pulse 2s infinite;
}
.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
</style>
