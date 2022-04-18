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
            <div class="linkList">
              <div class="text">
                <span class="iconfont icon-notebook"></span>
                {{notebook.title}}
                <span class="count">{{notebook.noteCounts}}</span>
              </div>
              <div class="action">
                <span class="date">{{notebook.untilCreated}}前</span>
                <span class="edit" @click.stop.prevent="onEdit(notebook)">编辑</span>
                <span class="delete" @click.stop.prevent="onDelete(notebook)">删除</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters,mapState,mapActions,mapMutations} from "vuex";

export default  {
  data(){
    return{}
  },
  computed: {
    ...mapGetters(['notebooks'])
  },
  created() {
    this.checkLogin({path:'/login'})
    this.getNotebooks()
  },
  methods: {
    ...mapActions([
      'getNotebooks', 'addNotebook', 'updateNotebook',
      'deleteNotebook','checkLogin'
    ]),
    onCreate() {
      this.$prompt('输入新笔记本标题','创建笔记本',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        inputPattern:/^.{1,30}$/,
        inputErrorMessage:'标题不能为空，且不超过30个字符',
      }).then(({value})=>{
        this.addNotebook({title:value})
      })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('输入新标题','编辑',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        inputValue: notebook.title,
        inputPattern:/^.{1,30}$/,
        inputErrorMessage:'标题不能为空，且不超过30个字符',
      }).then(({value})=>{
        title = value
        this.updateNotebook({notebookId:notebook.id,title:value})
      })
    },
    onDelete(notebook) {
      this.$confirm('确定要删除笔记本吗？','删除',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      })
        .then(()=>{
          console.log('delete out')
          this.deleteNotebook({notebookId:notebook.id,notebook:notebook})
        })
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
    font-size: 17px;
    color: #000;
  }
  main .list {
    margin-top: 20px;
    font-size: 18px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
  }
  .linkList{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .action,.count{
      font-size: 16px;
      color: #b3c0c8;
    }
    .count{
      padding-left:5px ;
    }
    .delete,.edit,.date{
      padding: 0 5px;
    }
  }

.iconfont {
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
    padding: 12px 10px;
  }
}
</style>
