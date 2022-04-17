<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
import Auth from "../apis/auth";
import Bus from "../helpers/bus";
import {mapGetters,mapActions} from "vuex";

export default {
  data() {
    return {}
  },
  created() {},
  methods:{
    ...mapActions(['checkLogin'])
  },
  computed: {
    ...mapGetters(['username','slug'])
  }
}
</script>

<style scoped>
span{
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: deepskyblue;
  color: black;
  font-weight: bold;
  text-transform: uppercase;
  font-size:18px;
  margin-top: 15px;
  text-shadow: 1px 0 1px #42b983;
}
</style>
