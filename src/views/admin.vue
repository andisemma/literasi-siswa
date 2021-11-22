<template>
  <div>
    <vContainer class="d-flex d-flex-wrap" v-if="pak">
      <!-- list Pertemuan -->
      <vContainer v-if="pak" class="d-flex flex-wrap">
        <v-card
          class="ma-auto my-3"
          width="400"
          v-for="(pak, index) in pak"
          :key="index"
          elevation="8"
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

          <v-card-actions>
            <v-btn text color="orange" @click="detail(pak.id)">Baca</v-btn>

            <v-spacer />
            <v-icon color="red" @click="del(pak.uid)">mdi-delete</v-icon>
          </v-card-actions>
        </v-card>
      </vContainer>

      <v-btn right absolute fab dark color="indigo" @click="add">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </vContainer>

    <!-- Input Dialog -->
    <v-dialog
      max-height="3000px"
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-btn @click="save" fab elevation="6" color="success" class="save"
          ><v-icon>mdi-content-save-all</v-icon></v-btn
        >

        <v-app-bar elevation="4" dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title> New Post </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>

        <div class="px-6 mt-10">
          <v-select
            prepend-icon="mdi-tag"
            class="mt-4"
            v-model="article.kategori"
            :items="items"
            filled
            label="Kategori"
          ></v-select>

          <v-text-field
            label="Judul"
            prepend-icon="mdi-format-text"
            v-model="article.judul"
            outlined
          ></v-text-field>

          <v-text-field
            class="mt-4"
            label="Contributor"
            prepend-icon="mdi-account"
            v-model="article.contributor"
            outlined
          ></v-text-field>

          <v-textarea
            auto-grow
            prepend-icon="mdi-format-paragraph"
            v-for="(item, index) in article.isi"
            :key="index"
            outlined
            :label="`Paragraph-${index + 1}`"
            v-model="article.isi[index]"
          ></v-textarea>

          <v-row>
            <v-spacer></v-spacer>
            <v-icon color="primary" x-large @click="newParagraph"
              >mdi-plus-thick</v-icon
            >

            <v-icon color="red" x-large @click="delParagraph" class="ml-6"
              >mdi-trash-can</v-icon
            >
          </v-row>
          <br /><br /><br />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getData, setData, del } from '../firebase/firestore'
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
    }
  },
  methods: {
    detail(id) {
      this.$router.push(`/admin/${id}`)
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
      getData('article', 'groupId', '==', this.$store.state.profile.email).then(
        (res) => (this.pak = res)
      )
    },
    tgl(date) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss')
    },
    del(index) {
      del('article', index).then(this.getData())
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
.save {
  position: fixed;
  top: 5%;
  right: 3%;
  z-index: 3;
}
</style>
