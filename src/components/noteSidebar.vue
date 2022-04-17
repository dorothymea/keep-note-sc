<template>
  <div class="noteSidebar">
    <span class="addNote button" @click="onAdd">添加笔记</span>
    <el-dropdown class="notebookTitle" placement="bottom" @command="handleCommand">
      <span class="link">
        {{curBook.title}}
        <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :command="notebook.id">
          {{notebook.title}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>标题</div>
      <div>更新时间</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="title">{{note.title}}</span>
          <span class="date">{{note.untilUpdated}}前</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

  import {until} from "../helpers/until";
  import {mapMutations,mapActions,mapGetters,mapState} from "vuex";

  export default {
    created() {
      console.log('created');
      this.getNotebooks()
        .then(() => {
          console.log('got');
          this.setCurBook({ curBookId: this.$route.query.notebookId })
          return this.getNotes({ notebookId: this.curBook.id})
        }).then(() => {
        this.setCurNote({ curNoteId: this.$route.query.noteId })
      })
    },

    data() {
      return {}
    },

    computed: {
      ...mapGetters([
        'notebooks',
        'notes',
        'curBook'
      ])
    },

    methods: {
      ...mapMutations([
        'setCurBook',
        'setCurNote'
      ]),
      ...mapActions([
        'getNotebooks',
        'getNotes',
        'addNote'
      ]),

      handleCommand(notebookId) {
        this.$store.commit('setCurBook', { curBookId: notebookId})
        this.getNotes({ notebookId })
      },

      onAdd() {
        this.addNote({ notebookId: this.curBook.id })
      },
      onTimeFormat(time) {
        return until(time);
      }

    }
  }
</script>

<style lang="less">
.noteSidebar {
  position: relative;
  width: 320px;
  border-right: 1px solid #ccc;
  background-color: #eee;
  .button{
    cursor: pointer;
  }
  .addNote {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    box-shadow: 0 0 2px 0 #ccc;
    border: none;
    z-index: 1;
  }

  .notebookTitle{
    font-size: 18px;
    font-weight: normal;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #f7f7f7;
    display: block;
  }
  .el-dropdown-link{
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    width: 200px;
  }

  .menu {
    display: flex;
    div {
      font-size: 14px;
      padding: 6px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-align: center;
      &:last-child {
        border-right: none;
      }
    }

    .iconfont{
      font-size: 10px;
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

</style>




















