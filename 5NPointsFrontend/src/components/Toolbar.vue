<template>
  <div class="toolbar">
    <router-link to="/points">Points</router-link>
    <router-link to="/rewards">Rewards</router-link>
    <!-- <ul>
      <li>Points</li>
      <li>Rewards</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
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
  float: left;
  color: white;
}
/*.toolbar a:hover {
  font-weight: bold;
}*/
</style>
