<template>
  <div id="sidebar">
    <avatar/>
    <div class="icon">
      <router-link to="/note/1" title="笔记">
        <i class="iconfont icon-note"></i>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <i class="iconfont icon-notebook"></i>
      </router-link>
      <router-link to="/trash/2" title="回收站">
        <i class="iconfont icon-trash"></i>
      </router-link>
      <div class="logout" @click="logout">
        <i class="iconfont icon-logout"></i>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/Avatar'
import Auth from "../apis/auth"
export default {
  components:{
    avatar
  },
  methods:{
    logout(){
      Auth.logout()
        .then(data=> {
          console.log(data)
          this.$router.push({path:'login'})
        })
    }
  }
}
</script>

<style lang="less" scoped>
#sidebar{
  position: relative;
  width: 60px;
  text-align: center;
  background: lightseagreen;
}
.logout{
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.iconfont{
  color:#fff;
  font-size: 25px;
}
.icon{
  margin-top: 15px;
  display: flex;
  flex-direction: column;
}
.icon a{
  padding: 10px 0;
}
</style>
