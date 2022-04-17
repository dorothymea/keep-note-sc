<template>
  <div id="note">
    <note-sidebar @update:notes="val => notes=val"></note-sidebar>
    <div class="noteDetail">
      <div class="emptyPage" v-show="!curNote.id">请选择笔记</div>
      <div class="detail" v-show="curNote.id">
        <div class="topBar">
          <div class="notice">
            <span>创建日期{{curNote.untilCreated}}</span>
            <span>更新日期{{curNote.untilUpdated}}</span>
            <span>{{statusText}}</span>
          </div>
          <div class="button">
            <span class="icon el-icon-delete" @click="onDelete"></span>
            <span class="icon el-icon-full-screen" @click="isShowPreview=!isShowPreview"></span>
          </div>
        </div>
          <div class="noteTitle">
            <input type="text" placeholder="输入标题" @input="onUpdate" @keydown="statusText='编辑中'" v-model:value="curNote.title">
          </div>
          <div class="editPage">
            <textarea v-show="!isShowPreview" @input="onUpdate" @keydown="statusText='编辑中'" placeholder="输入笔记内容，支持markdown" v-model:value="curNote.content"></textarea>
            <div class="preview markdownPage" v-show="isShowPreview" v-html="previewContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../apis/auth";
import noteSidebar from './noteSidebar'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapMutations,mapActions,mapGetters,mapState} from "vuex";

let md = new MarkdownIt()

// export default {
//   components: {
//     noteSidebar
//   },
//
//   data () {
//     return {
//       curNote: {},
//       notes: [],
//       statusText: '笔记未改动',
//       isShowPreview: false
//     }
//   },
//
//   created() {
//     Auth.getInfo()
//       .then(res => {
//         if(!res.isLogin) {
//           this.$router.push({ path: '/login' })
//         }
//       })
//     Bus.$once('update:notes', val => {
//       this.curNote = val.find(note => note.id === this.$route.query.noteId) || {}
//     })
//   },
//
//   computed: {
//     previewContent() {
//       return md.render(this.curNote.content||'')
//     }
//   },
//
//   methods: {
//     updateNote: _.debounce(function() {
//       Notes.updateNote({ noteId: this.curNote.id },
//         { title: this.curNote.title, content: this.curNote.content })
//         .then(data => {
//           this.statusText = '已保存'
//         }).catch(data => {
//         this.statusText = '保存出错'
//       })
//
//     }, 300),
//
//     deleteNote() {
//       Notes.deleteNote({ noteId: this.curNote.id })
//         .then(data => {
//           this.$message.success(data.msg)
//           this.notes.splice(this.notes.indexOf(this.curNote), 1)
//           this.$router.replace({ path: '/note' })
//         })
//     }
//
//   },
//
//   beforeRouteUpdate (to, from, next) {
//     this.curNote = this.notes.find(note => note.id == to.query.noteId) || {}
//     next()
//   }
// }
export default {
  components: {
    noteSidebar
  },

  data () {
    return {
      statusText: '笔记未改动',
      isShowPreview: false
    }
  },
  computed: {
    ...mapGetters([
      'notes',
      'curNote'
    ]),
    previewContent() {
      return md.render(this.curNote.content||'')
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if(!res.isLogin) {
          this.$router.push({ path: '/login' })
        }
      })
  },



  methods: {
    ...mapMutations(['setCurNote']),
    ...mapActions([
      'updateNote','deleteNote'
    ]),
    onUpdate: _.debounce(function() {
      this.updateNote({noteId:this.curNote.id,title:this.curNote.title,content:this.curNote.content})
        .then(data => {
          this.statusText = '已保存'
        }).catch(data => {
        this.statusText = '保存出错'
      })

    }, 300),

    onDelete() {
      this.deleteNote({noteId:this.curNote.id})
        .then(data =>{
          this.$router.replace({ path: '/note' })
        })
    }

  },

  beforeRouteUpdate (to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId})
    next()
  }
}


</script>

<style lang="less">
  @import url(../assets/noteDetail.less);
  #note{
    display:flex;
    flex-direction:row;
    width:100%;
  }
</style>
