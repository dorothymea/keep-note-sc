<template>
  <div id="note-detail">
    <note-sidebar/>
    <h1>notebookId:{{$route.query.notebookId}}</h1>
    <h1>noteId:{{$route.query.noteId}}</h1>
  </div>
</template>

<script>
import Auth from "../apis/auth";
import noteSidebar from './noteSidebar'
export default {
  data() {
    return {
      msg: '笔记详情页'
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
    })
  },
  components:{
    noteSidebar
  }
}
</script>

<style scoped>
h1{
  color:blue;
}
</style>
