<template>
  <div class="toolbar">
    <a v-on:click="logOut">Log Out</a>
    <!-- <ul>
      <li>Points</li>
      <li>Rewards</li>
    </ul> -->
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'Toolbar',
  data () {
    return {
    }
  },
  methods: {
    logOut: function() {
      alert('Logging out');
      // Destroy session
      router.push({name: 'Points'})
    }
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  font-size: 20px;
  float: left;
}
.toolbar a {
  font-size: 20px;
  padding: 10px;
  float: right;
  color: white;
}
/*.toolbar a:hover {
  font-weight: bold;
}*/
</style>
