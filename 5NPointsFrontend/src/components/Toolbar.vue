<template>
  <div class="toolbar">
    <router-link v-if="path == 'points'" to="/points"><b>Points</b></router-link>
    <router-link v-else to="/points">Points</router-link>
    <router-link v-if="path == 'earn'" to="/rewards"><b>Earn</b></router-link>
    <router-link v-else to="/earn">Earn</router-link>
    <router-link v-if="path == 'rewards'" to="/rewards"><b>Rewards</b></router-link>
    <router-link v-else to="/rewards">Rewards</router-link>

    <router-link id="login" to="/login"><i class="fa fa-lock" aria-hidden="true"></i></router-link>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'Toolbar',
  data () {
    return {
      path: null
    }
  },
  methods: {
    boldLink() {
      //console.log(this.$router.history.current.fullPath);
      if(this.$router.history.current.fullPath == "/rewards" || this.$router.history.current.fullPath == "/rewards/") {
        this.path = 'rewards';
      }
      else if(this.$router.history.current.fullPath == "/points" || this.$router.history.current.fullPath == "/points/") {
        this.path = 'points';
      }
      else if(this.$router.history.current.fullPath == "/earn" || this.$router.history.current.fullPath == "/earn/") {
        this.path = "earn";
      }
    }
  },
  mounted() {
    this.boldLink();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.toolbar {
  margin: 0px;
  padding: 15px;
  background-color: #50e09a;
}
.toolbar a {
  font-size: 20px;
  padding: 10px;
  float: left;
  color: white;
}
#login {
  float: right;
}
/*.toolbar a:hover {
  font-weight: bold;
}*/
</style>
