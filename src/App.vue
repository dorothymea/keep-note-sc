<template>
  <div id="app">
    <sidebar/>
    <router-view/>
  </div>
</template>

<script>
import sidebar from "./components/Sidebar";
export default {
  name: 'App',
  components: {
    sidebar
  }
}
</script>

<style>
@import "//at.alicdn.com/t/font_3318196_4vldjzk5tbj.css";
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,body,#app{
  height: 100%;
}
a{
  text-decoration: none;
  color:salmon;
}
ul,li{
  list-style: none;
}
#app{
  display: flex;
  align-items: stretch;
}
body{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  background: #eee;
  -moz-osx-font-smoothing: grayscale;
}

</style>
