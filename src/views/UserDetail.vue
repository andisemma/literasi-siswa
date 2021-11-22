<template>
  <div>
    <VDataTable
      :headers="headers"
      :items="items"
      item-key="judul"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <VIcon @click="del(item.uid)" color="red">mdi-delete</VIcon>
      </template>
    </VDataTable>

    <VBtn
      @click="add"
      color="info"
      style="position: fixed; bottom: 3%; right: 3%"
      fab
      ><VIcon>mdi-plus</VIcon></VBtn
    >

    <!-- <VBtn
      @click="isProgress = !isProgress"
      color="red"
      style="position: fixed; bottom: 15%; right: 3%"
      fab
      ><VIcon>mdi-plus</VIcon></VBtn
    > -->

    <!-- Modal Parent -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <VCard>
        <div>
          <VToolbar dark color="primary">
            <VBtn icon dark @click="close">
              <VIcon>mdi-close</VIcon>
            </VBtn>
            <v-toolbar-title>Entri detail pengajuan</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <VBtn dark text @click="save"> Save </VBtn>
            </v-toolbar-items>
          </VToolbar>

          <VCardText>
            <v-select
              :items="pengajuan.unsur"
              :item-text="pengajuan.unsur.text"
              :item-value="pengajuan.unsur.value"
              label="Unsur"
              @change="change(1)"
              outlined
              v-model="pengajuanData.unsur"
            ></v-select>

            <v-select
              :items="pengajuan.subUnsur[pengajuanData.unsur]"
              label="Sub-Unsur"
              outlined
              @change="change(2)"
              v-model="pengajuanData.subUnsur"
            ></v-select>

            <v-select
              :items="pengajuan.kegiatan[this.split(pengajuanData.subUnsur)]"
              label="Kegiatan"
              outlined
              @change="change(3)"
              v-model="pengajuanData.kegiatan"
            ></v-select>

            <v-select
              v-if="
                this.pengajuanData.unsur == 'A' ||
                this.split(pengajuanData.subUnsur) == 'CA'
              "
              :items="semester"
              label="Semester"
              outlined
              v-model="pengajuanData.semester"
            ></v-select>

            <VTextField
              v-if="this.split(pengajuanData.subUnsur) == 'AA'"
              label="SKS"
              outlined
              v-model="pengajuanData.sks"
              type="number"
            />
            <v-textarea
              outlined
              name="input-7-4"
              label="Keterangan"
              v-model="pengajuanData.ket"
            ></v-textarea>
            <VTextField
              v-if="pengajuanData.unsur == 'B'"
              v-model="pengajuanData.link"
              label="Link"
            />
          </VCardText>
        </div>
      </VCard>
    </v-dialog>

    <ProgressBar :loading="isProgress" />
  </div>
</template>

<script>
import { getOnce, getData, debug, setData, del } from '../firebase/firestore'
import { pengajuan } from '../assets/pengajuan'
import ProgressBar from '../components/ProgressBar.vue'

export default {
  components: {
    ProgressBar,
  },
  data() {
    return {
      pengajuan: pengajuan,
      pengajuanData: {},
      dialog: false,
      isProgress: false,
      search: '',
      id: this.$route.params.id,
      items: [],
      headers: [
        { text: 'Unsur', value: 'unsur' },
        { text: 'SubUnsur', value: 'subUnsur' },
        { text: 'Kegiatan', value: 'kegiatan' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  methods: {
    del(index) {
      del('child', index).then(
        getData('child', 'groupId', '==', this.id).then(
          (res) => (this.items = res)
        )
      )
    },
    add() {
      this.pengajuanData.id = +new Date()
      this.pengajuanData.groupId = this.id
      this.dialog = !this.dialog
    },
    close() {
      this.reset()
      debug('assign to initial value', this.pengajuanData, false)
      this.dialog = !this.dialog
    },
    reset() {
      this.pengajuanData = {
        unsur: '',
        subUnsur: '',
        kegiatan: '',
        status: 'submited',
        link: '',
        id: '',
        groupId: '',
        nilai: 0,
        ket: '',
        sks: 0,
      }
    },
    split(data) {
      return data.substr(0, data.indexOf('.'))
    },
    /**
     * menghilangkan data jika merubah pilihan
     */
    change(state) {
      switch (state) {
        case 1:
          console.log(state)
          this.pengajuanData.subUnsur = ''
          this.pengajuanData.kegiatan = ''
          this.pengajuanData.semester = ''
          break
        case 2:
          console.log(state)
          this.pengajuanData.kegiatan = ''
          this.pengajuanData.semester = ''
          break
        case 3:
          console.log(state)
          this.pengajuanData.semester = ''
          break
        default:
          break
      }
    },
    save() {
      this.isProgress = true
      setData('child', this.pengajuanData).then((res) => {
        debug('setData', res, false)
        getData('child', 'groupId', '==', this.id).then((res) => {
          this.items = res
          this.dialog = false
          this.reset()
          this.isProgress = false
        })
      })
    },
    childData() {
      let x = []
      this.$store.state.children.forEach((item) => {
        if (item.groupId === this.id) {
          x.push(item)
        }
      })
      this.items = x
    },
  },
  computed: {},
  mounted() {
    this.reset()
    getOnce('helper', 'semester').then((res) => (this.semester = res.semester))
    getData('child', 'groupId', '==', this.id).then((res) => (this.items = res))
  },
  watch: {},
}
</script>
