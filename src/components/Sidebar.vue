<template>
  <div id="sidebar">
    <avatar/>
    <div class="icon">
      <router-link to="/note" title="笔记">
        <i class="iconfont icon-note"></i>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <i class="iconfont icon-notebook"></i>
      </router-link>
      <router-link to="/trash" title="回收站">
        <i class="iconfont icon-trash"></i>
      </router-link>
      <div class="logout" @click="onLogout">
        <i class="iconfont icon-logout"></i>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/Avatar'
import {mapActions} from "vuex";

export default {
  components:{
    avatar
  },
  methods:{
    ...mapActions(['logout']),
    onLogout(){
      this.logout()
    }
  }
}
</script>

<style lang="less" scoped>
#sidebar{
  position: relative;
  text-align: center;
  padding: 0 15px;
  background: lightseagreen;
}
.logout{
  position: absolute;
  bottom: 20px;
  cursor: pointer;
}
a{
  padding-bottom: 20px;
}
.iconfont{
  color:#fff;
  font-size: 25px;
}
.icon{
  margin-top: 15px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
}
</style>
