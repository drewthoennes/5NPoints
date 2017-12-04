<template>
  <div class="toolbar">
    <a v-on:click="logOut"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
  </div>
</template>

<script>
import router from '@/router'
import config from '@/assets/config'

export default {
  name: 'Toolbar',
  data () {
    return {
    }
  },
  methods: {
    logOut: function() {
      // Destroy session
      this.$http.post(config.backend + '/logout', {
        id: this.$localStorage.get('id', ''),
        token: this.$localStorage.get('token', '')
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
        }
        else if(res.body.success) {
          router.push({name: 'Points'});
        }
        else {
          alert('Error logging out');
        }
      });
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
