<template>
  <div id="note">
    <note-sidebar/>
    <div class="noteDetail">
      <div class="emptyPage" v-show="!curNote.id">请选择笔记</div>
      <div class="detail" v-show="curNote.id">
        <div class="topBar">
          <div class="notice">
            <span>创建日期{{}}</span>
            <span>更新日期{{}}</span>
            <span>{{statusText}}</span>
          </div>
          <div class="button">
            <span class="icon el-icon-delete" @click="deleteNote"></span>
            <span class="icon el-icon-full-screen" @click="isShowPreview=!isShowPreview"></span>
          </div>
        </div>
        <div class="content">
          <div class="noteTitle">
            <input type="text" placeholder="输入标题" >
          </div>
          <div class="editPage">
            <textarea v-show="!isShowPreview"></textarea>
            <div class="preview markdownPage" v-show="isShowPreview"></div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import Auth from "../apis/auth";
import noteSidebar from './noteSidebar'
import Bus from "../helpers/bus";
import Notes from "../apis/notes";
import _ from 'lodash'

export default {
  data() {
    return {
      curNote:{id:5},
      notes:[],
      statusText:'笔记未修改',
      isShowPreview:false
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
  },
  methods: {
    deleteNote() {

    }
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
