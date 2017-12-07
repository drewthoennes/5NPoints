<template>
  <div class="toolbar">
    <div class="toolbar-right">
      <a v-on:click="logOut"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
    </div>
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
      if(!this.$cookie.get('token') || !this.$cookie.get('id')) {
        router.push({name: 'Points'});
      }
      else {
        this.$http.post(config.backend + '/logout', {
          token: this.$cookie.get('token'),
          id: this.$cookie.get('id')
        }).then(res => {
          this.$cookie.delete('token');
          this.$cookie.delete('id');
          this.$cookie.delete('expires');
          router.push({name: 'Points'});
        });
      }
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.toolbar {
  margin: 0px;
  padding: 15px;
  background-color: #50e09a;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
</style>
