import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://note-server.hunger-valley.com/'
axios.defaults.withCredentials = true


export default function request(url,type='GET',data={}){
  return new Promise((resolve,reject)=>{
    let option = {
      url,
      method:type,
      validateStatus(status){     //没有后续引用，这个的作用是什么？
        return (status>=200 && status<300) || status===400
      }
    }
    if(type.toLowerCase()==='get'){
      option.params = data
    }else{
      option.data = data
    }
    axios(option).then(res=>{    //这个res是什么，从哪里来
      if(res.status === 200){
        resolve(res.data)   //问题，reject和resolve的作用，是怎么实现的？
      }else{
        console.error(res.data)
        reject(res.data)
      }
    }).catch(err=>{
      console.error({msg: '网络异常'})
      reject({msg:'网络异常'})
    })

  })
}
