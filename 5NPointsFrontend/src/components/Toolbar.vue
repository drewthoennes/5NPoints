<template>
  <div v-if="!admin" class="toolbar">
    <div class="toolbar-left">
      <router-link v-if="path == 'points'" to="/points"><b>Points</b></router-link>
      <router-link v-else to="/points">Points</router-link>
      <router-link v-if="path == 'earn'" to="/rewards"><b>Earn</b></router-link>
      <router-link v-else to="/earn">Earn</router-link>
      <router-link v-if="path == 'rewards'" to="/rewards"><b>Rewards</b></router-link>
      <router-link v-else to="/rewards">Rewards</router-link>
    </div>
    <div class="toolbar-right">
      <router-link id="login" to="/login"><i class="fa fa-lock" aria-hidden="true"></i></router-link>
    </div>
  </div>
  <div v-else class="admin-toolbar">
    <div class="admin-toolbar-left">
      <router-link v-if="path == 'points'" to="/points"><b>Points</b></router-link>
      <router-link v-else to="/points">Points</router-link>
      <router-link v-if="path == 'earn'" to="/rewards"><b>Earn</b></router-link>
      <router-link v-else to="/earn">Earn</router-link>
      <router-link v-if="path == 'rewards'" to="/rewards"><b>Rewards</b></router-link>
      <router-link v-else to="/rewards">Rewards</router-link>
    </div>
    <div class="admin-toolbar-right">
      <a v-on:click="logOut"><i class="fa fa-sign-out" aria-hidden="true"></i></a>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import config from '@/assets/config'
import store from '@/store'

export default {
  name: 'Toolbar',
  data () {
    return {
      admin: false,
      path: null
    }
  },
  methods: {
    updateStore: function() {
      this.$http.options.emulateJSON = true;
      this.$http.post(config.backend + '/admin', {
        token: this.$cookie.get('token'),
        id: this.$cookie.get('id')
      }, {credentials: true}).then(res => {
        if(res.body.success) {
          this.$store.state.admin = true;
        }
        else {
          this.$store.state.admin = false;
        }
      });
    },
    checkPrivileges: function() {
      this.$http.options.emulateJSON = true;
      this.$http.post(config.backend + '/admin', {
        token: this.$cookie.get('token'),
        id: this.$cookie.get('id')
      }, {credentials: true}).then(res => {
        if(res.body.success) {
          this.admin = true;
          this.$store.state.admin = true;
        }
        else {
          this.admin = false;
          this.$store.state.admin = false;
        }
      });
    },
    // User
    boldLink: function() {
      if(!this.admin) {
        return;
      }
      if(this.$router.history.current.fullPath == "/rewards" || this.$router.history.current.fullPath == "/rewards/") {
        this.path = 'rewards';
      }
      else if(this.$router.history.current.fullPath == "/points" || this.$router.history.current.fullPath == "/points/") {
        this.path = 'points';
      }
      else if(this.$router.history.current.fullPath == "/earn" || this.$router.history.current.fullPath == "/earn/") {
        this.path = "earn";
      }
    },
    // Admin
    logOut: function() {
      if(!this.admin) {
        return;
      }
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
          location.reload(); // Avoid doing this?
        });
      }
    },
  },
  mounted() {
    if(!this.$store.state.admin) {
      this.$store.state.admin = false;
    }
    if(this.$cookie.get('token') && this.$cookie.get('id')) {
      this.checkPrivileges()
    }
    if(!this.admin) {
        this.boldLink();
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.toolbar, .admin-toolbar {
  width: 100%;
  margin: auto;
  padding: 15px;
  background-color: #50e09a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.toolbar-left, .admin-toolbar-left {
  justify-content: flex-start;
  width: 100%;
}
.toolbar-right, .admin-toolbar-right {
  justify-content: flex-end;
}
.toolbar a, .admin-toolbar a {
  font-size: 20px;
  padding: 10px;
  float: left;
  color: white;
}
</style>
