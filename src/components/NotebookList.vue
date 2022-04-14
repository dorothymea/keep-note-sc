<template>
  <div id="notebooks">
    <header>
      <a href="#" class="button" @click.prevent="onCreate">
        <i class="iconfont icon-plus"></i>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="list">
          <router-link v-for="notebook in notebooks" :to="`/note?notebookId=${notebook.id}`" class="notebook" :key="notebook.title">
            <div>
              <span class="iconfont icon-notebook"></span>
              {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="delete" @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="edit" @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="date">{{onTimeFormat(notebook.createdAt)}}前</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "../apis/auth";
import Notebooks from "../apis/notebooks";
import {until} from "../helpers/until";
export default  {
  data(){
    return{
      notebooks:[]
    }
  },
  created() {
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({path: '/login'})
        }
      })
    Notebooks.getAll()
      .then(res =>{
        this.notebooks = res.data
      })
  },
  methods: {
    onCreate() {
      this.$prompt('输入新笔记本标题','创建笔记本',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        inputPattern:/^.{1,30}$/,
        inputErrorMessage:'标题不能为空，且不超过30个字符',
      }).then(({value})=>{
        return Notebooks.addNoteBook({title:value})
      }).then( res =>{
        this.notebooks.unshift(res.data)
        this.$message.success(res.msg)
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('输入新标题','编辑',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        inputPattern:/^.{1,30}$/,
        inputErrorMessage:'标题不能为空，且不超过30个字符',
      }).then(({value})=>{
        title = value
        return Notebooks.updateNotebook(notebook.id, {title})
      }).then(res =>{
        notebook.title = title
        this.$message.success(res.msg)
      })
    },
    onDelete(notebook) {
      this.$confirm('确定要删除笔记本吗？','删除',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        return Notebooks.deleteNotebook(notebook.id)
      }).then(res =>{
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message.success(res.msg)
      })
    },
    onTimeFormat(createdAt){
      return until(createdAt)
    }
  }
}
</script>

<style lang="less" scoped>
#notebooks{
  flex: 1;

  .button {
    font-size: 16px;
    color: #666;
    cursor: pointer;
    margin-left: 10px;
  }
  .button .iconfont {
    font-size: 16px;
  }

  header {
    padding: 14px;
    border-bottom: 1px solid #ccc;
  }

  main {
    padding: 30px 20px;
  }
  .layout {
    max-width: 90%;
    margin: 0 auto;
  }


  main h3{
    font-size: 16px;
    color: #000;
  }

  main .list {
    margin-top: 10px;
    font-size: 18px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
  }
  main .list span {
    font-size: 16px;
    color: #b3c0c8;
  }
  main .date,
  main .delete,
  main .edit{
    float: right;
    margin-left: 10px;
  }
  main .iconfont {
    color: #1687ea;
    margin-right: 4px;
  }
  main .notebook {
    display: block;
    cursor: pointer;
  }
  main a.notebook:hover {
    background-color: #f7fafd;
  }

  main a.notebook div {
    border-bottom: 1px solid #ebebeb;
    padding: 20px 20px;
  }
}
</style>
