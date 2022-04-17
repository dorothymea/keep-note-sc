import Notebook from "../../apis/notebooks";
import {Message} from "element-ui";


const state = {
  notebooks:null,
  curBookId:null      //这两个变量的类型是什么，再考虑要不要赋空值
}

const getters ={
  notebooks: state => state.notebooks || [],
  curBook: state => {
    if(!Array.isArray(state.notebooks)) return {}
    if(!state.curBookId) return state.notebooks[0] || {}
    return state.notebooks.find(notebook => notebook.id == state.curBookId) || {}
    //这里使用 == 而非 === 是因为避免类型不同而实际数字内容不同造成的无法比较
  }
}

const mutations ={
  setNotebooks(state,payload){
    state.notebooks = payload.notebooks
  },
  addNotebook(state,payload){
    state.notebooks.unshift(payload.notebook)
  },
  updateNotebook(state,payload){
    let notebook = state.notebooks.find(notebook => notebook.id == payload.notebookId) || {}
    notebook.title = payload.title
  },
  deleteNotebook(state,payload){
    // state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId)
    state.notebooks.splice(state.notebooks.indexOf(payload.notebook), 1)

  },
  setCurBook(state,payload){
    state.curBookId = payload.curBookId
  }
}

const actions ={
  getNotebooks({commit}){
    return Notebook.getAll()
      .then(res =>{
        commit('setNotebooks',{notebooks:res.data})
      })
  },
  addNotebook({commit},payload){
    return Notebook.addNotebook({title:payload.title})
        .then(res =>{
          console.log('add success...', res)
          commit('addNotebook',{notebook:res.data})
          Message.success(res.msg)
        })
  },
  updateNotebook({commit},payload){
    return Notebook.updateNotebook(payload.notebookId,{title:payload.title})
      .then(res =>{
        commit('updateNotebook',{notebookId:payload.notebookId,title:payload.title})
        Message.success(res.msg)
      })
  },
  deleteNotebook({commit},payload){
    return Notebook.deleteNotebook(payload.notebookId)
      .then(res =>{
        console.log('delete')
        commit('deleteNotebook',{notebook:payload.notebook})
        Message.success(res.msg)
      }).catch(res=> Message.error(res.msg))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

