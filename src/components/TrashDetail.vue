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
          <span>创建日期:{{}}</span>
          <span>上次更新:{{}}</span>
          <span>所属笔记本：{{}}</span>
        </div>
        <div class="action">
          <button @click="">恢复</button>
          <button @click="">彻底删除</button>
        </div>
      </div>
      <div class="noteTitle">
        <span>curTrashNote.title</span>
      </div>
      <div class="page">
        <div class="preview"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../apis/auth";

export default  {
  data(){
    return{
      msg:'回收站详情页'
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
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
