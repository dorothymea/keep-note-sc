import request from "../helpers/request";
import {until} from "../helpers/until";

const URL = {
  GET:'/notebooks',
  ADD:'/notebooks',
  UPDATE:'/notebooks/:id',
  DELETE:'/notebooks/:id'
}

export default {
  getAll(){
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data.sort((notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt ? 1 : -1)
          res.data.forEach(notebook=>{
            notebook.untilCreated = until(notebook.createdAt)
            notebook.untilUpdated = until(notebook.updatedAt)
          })
          resolve(res)
        }).catch(err => {
        reject(err)
      })
    })
  },

  updateNotebook(notebookId,{title=''}={title:''}){
    return request(URL.UPDATE.replace(':id',notebookId),'PATCH',{title})
  },

  deleteNotebook(notebookId){
    return request(URL.DELETE.replace(':id',notebookId),'DELETE')
  },

  addNoteBook({title=''} = {title:''}){
    return request(URL.ADD,'POST',{title})
  }
}
