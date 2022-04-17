import request from "../helpers/request";
import {until} from "../helpers/until";

const URL = {
  GET:'/notes/trash',
  REVERT:'/notes/:noteId/revert',
  DELETE:'/notes/:noteId/confirm'
}

export default {
  getAll(){
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res =>{
          res.data = res.data.sort((note1,note2)=> note1.createdAt < note2.createdAt ? 1 : -1)
          res.data = res.data.map(note =>{
            note.untilCreated = until(note.createdAt)
            note.untilUpdated = until(note.updatedAt)
            return note
          })
          resolve(res)
        }).catch(err => reject(err))
    })
  },

  deleteNote({noteId}){
    console.log({noteId})
    return request(URL.DELETE.replace(':noteId',noteId),'DELETE')
  },

  revertNote({noteId}){
    return request(URL.REVERT.replace(':noteId',noteId),'PATCH')
  }
}











