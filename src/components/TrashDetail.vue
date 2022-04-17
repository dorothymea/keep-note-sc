<template>
  <div id="trash">
    <div class="trashSidebar">
      <div class="pageTitle">
        回收站
      </div>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{note.untilUpdated}}</span>
            <span class="title">{{note.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="trashDetail">
      <div class="topBar">
        <div class="notice">
          <span>创建日期:{{timeFormat(curTrashNote.createdAt)}}</span>
          <span>上次更新:{{curTrashNote.untilUpdated}}</span>
          <span>所属笔记本：{{belongTo}}</span>
        </div>
        <div class="action">
          <button @click="onRevert">恢复</button>
          <button @click="onDelete">彻底删除</button>
        </div>
      </div>
      <div class="noteTitle">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="page">
        <div class="preview" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>

import MarkdownIt from 'markdown-it'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import dayjs from "dayjs";
let md = new MarkdownIt()
export default  {
  data(){
    return{}
  },
  computed:{
    ...mapGetters(['trashNotes','curTrashNote','belongTo']),
    compiledMarkdown(){
      return md.render(this.curTrashNote.content || '')
    }
  },
  created() {
    this.checkLogin({path:'/login'})
    this.getNotebooks()
    this.getTrashNotes()
    .then(()=>{
      this.setCurTrashNote({curTrashNoteId:this.$route.query.noteId})
    })
  },
  methods:{
    ...mapMutations(['setCurTrashNote']),
    ...mapActions(['checkLogin','deleteTrashNote','revertTrashNote', 'getTrashNotes','getNotebooks']),

    onDelete(){
      console.log({ noteId: this.curTrashNote.id })
      this.deleteTrashNote({noteId:this.curTrashNote.id})
    },
    onRevert(){
      this.revertTrashNote({noteId:this.curTrashNote.id})
    },
    timeFormat(time){
      return dayjs(time).format('YYYY-MM-DD')
    }
  },
  beforeRouteUpdate(to,from,next){
    this.setCurTrashNote({curTrashNoteId:to.query.noteId})
    next()
  }
}
</script>

<style lang="less">
#trash{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.trashSidebar {
  position: relative;
  width: 320px;
  border-right: 1px solid #ccc;
  background-color: #eee;
  .pageTitle{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    padding: 8px 0;
    background: #f7f7f7;
  }
  .menu {
    display: flex;
    div {
      font-size: 14px;
      padding: 6px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-align: center;
      &:last-child {
        border-right: none;
      }
    }
  }
  .notes {
    li {

      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      a {
        display: flex;
        padding: 6px 0;
        font-size: 13px;
        border: 2px solid transparent;
      }

      .router-link-exact-active {
        border: 2px solid #81c0f3;
        border-radius: 3px;
      }

      span {
        padding: 0 10px;
        flex: 1;
        text-align: right;
      }
    }
  }
}
.trashDetail {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  .topBar {
    font-size: 14px;
    color: #999;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button{
      border: none;
      color:#999 ;
    }
  }
  .noteTitle{
    font-size: 20px;
    padding: 15px 20px;
  }
  .page{
    flex: 1;
  }

}
</style>
