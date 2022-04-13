<template>
  <div id="login">
    <div class="mask">
      <!--    底层蒙版-->
      <div class="model-wrapper">
        <!--      包裹器-->
        <div class="container">
          <!--        容器-->
          <div class="pic">
          </div>
            <!--          登录页大图-->
            <div class="form">
              <h3 @click="showRegister">创建账户</h3>
              <transition name="slide">
                <div class="register" v-bind:class="{show:isShowRegister}">
                  <input type="text" placeholder="用户名" v-model="register.username">
                  <input type="password" placeholder="密码" v-model="register.password">
                  <p v-bind:class="{error:register.isError}">{{register.notice}}</p>
                  <div class="button" @click="onRegister">创建账号</div>
                </div>
              </transition>
              <h3 @click="showLogin">登录</h3>
              <transition name="slide">
                <div class="login" v-bind:class="{show:isShowLogin}">
                  <input type="text" placeholder="输入用户名" v-model="login.username">
                  <input type="password" placeholder="输入密码" v-model="login.password">
                  <p v-bind:class="{error:login.isError}">{{login.notice}}</p>
                  <div class="button" @click="onLogin">登录</div>
                </div>
              </transition>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Bus from "../helpers/bus";
import Auth from "../apis/auth";
Auth.getInfo().then(data =>{
  console.log(data)
})
export default {
  data(){
    return {
      isShowLogin:true,
      isShowRegister:false,
      login:{
        username:'',
        password:'',
        notice:'please enter username and password',
        isError:false
      },
      register:{
        username:'',
        password:'',
        notice:'please remember username and password after creating account',
        isError:false
      }
    }
  },
  methods:{
    showRegister(){
      this.isShowRegister = true
      this.isShowLogin = false
    },
    showLogin(){
      this.isShowLogin = true
      this.isShowRegister = false
    },
    onRegister(){
      if(! /^[a-zA-Z0-9_-]{4,16}$/.test(this.register.username)){
        this.register.isError = true
        this.register.notice = '用户名为4-16个字符，仅限于字母数字下划线减号'
        return
      }
      if(!/^.{6,16}/.test(this.register.password)){
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      }
      this.register.isError = false
      this.register.notice = ''

      console.log(`start register,username:${this.register.username},password:${this.register.password}`)
      Auth.register({username:this.register.username,password:this.register.password})
        .then(data =>{   //这个data 是什么？then函数的运行原理？
          console.log(data)
          this.register.isError = false
          this.register.notice = ''
          Bus.$emit('userInfo',{username:this.register.username})
          this.$router.push({ path: 'notebooks' })
        }).catch(data => {
        this.register.isError = true
        this.register.notice = data.msg
        })
    },
    onLogin(){
      if(! /^[a-zA-Z0-9_-]{4,16}$/.test(this.login.username)){
        this.login.isError = true
        this.login.notice = '用户名为4-16个字符，仅限于字母数字下划线减号'
        return
      }
      if(!/^.{6,16}/.test(this.login.password)){
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }
      this.login.isError = false
      this.login.notice = ''

      console.log(`start login,username:${this.login.username},password:${this.login.password}`)
      Auth.login({username:this.login.username,password:this.login.password})
        .then(data =>{   //这个data 是什么？then函数的运行原理？
          console.log(data)
          this.login.isError = false
          this.login.notice = ''
          Bus.$emit('userInfo',{username:this.login.username})
          this.$router.push({ path: 'notebooks' })
        }).catch(data => {
        this.login.isError = true
        this.login.notice = data.msg
        })
    }
  }
}
</script>

<style lang="less">
.mask{
  position: fixed;
  z-index: 1;
  top: 0;
  left:0;
  width:100%;
  height: 100%;
  background-color:rgba(0,0,0,0.7);
  display: table;
  transition: opacity 0.3s ease;
}
.model-wrapper{
  display:table-cell;
  vertical-align: middle;
}
.container{
  width:800px;
  height:500px;
  margin: 0 auto;
  background: papayawhip;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.33);
  transition: all 0.3s ease;
  font-family: Helvetica,Arial,sans-serif;
  display: flex;

  .pic{
    flex: 1;
    background-color: lightseagreen;
    background-image: url(../assets/note.jpg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .form{
    width:270px;
    border-left: 1px solid black;
    h3{
      font-size: 16px;
      font-weight: normal;
      border-top: 1px solid #eeeeee;
      cursor: pointer;
      padding:10px 20px;

      &:nth-of-type(2){
        border-bottom: 1px solid #eeeeee;
      }
    }

    .button{
      background: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #ffffff;
      border-radius: 4px;
      margin-top: 20px;
      cursor: pointer;
    }
    .login,.register{
      padding: 5px 20px;
      border-top: 1px solid #eeeeee;
      height: 0;
      overflow: hidden;
      transition: height 0.4s;

      &.show{
        height:200px;
      }
      input{
        display: block;
        width: 100%;
        height: 36px;
        line-height: 35px;
        padding: 0 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        outline:none;
        font-size: 14px;
        margin-top:10px;
      }
      input:focus{
        border:2px solid #9dcaf8;
      }
      .login{
        border-top:0;
      }
      p{
        font-size: 12px;
        margin-top: 8px;
        color: #444;
      }
      .error{
        color:red;
      }
    }
  }
}

</style>
