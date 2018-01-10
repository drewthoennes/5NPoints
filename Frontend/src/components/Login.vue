<template>
  <div class="login h-100">
    <div class="col h-100">
      <div class="login container-fluid">
        <div id="LoginForm" class="col">
          <div id="LoginFormHeader" class="col">
            <router-link to="/points">Not an admin? View points here.</router-link>
          </div>
          <div id="LoginFormBody">
            <h1>Log in</h1>
            <form v-on:submit="loginUser" autocomplete="on">
              <input id="Username" ref="username" name="username" placeholder="Username" class="form-control" type="text" autocomplete="username">
              <input id="Password" ref="password" name="password" placeholder="Password" class="form-control" type="password" autocomplete="current-password">
              <input id="Submit" placeholder="Create account" class="form-control" type="submit">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import config from '@/assets/config';
import Toolbar from '@/components/Toolbar'
import store from '@/store'

export default {
  name: 'Login',
  components: {
    Toolbar
  },
  methods: {
    loginUser: function(event) {
      event.preventDefault();
      if(!this.$refs.username.value || !this.$refs.password.value) {
        alert("Please complete all fields");
      }
      this.$http.options.emulateJSON = true
      this.$http.post(config.backend + '/login', {
        username: this.$refs.username.value,
        password: this.$refs.password.value
      }, {credentials: true}).then(res => {
        if(res.body.success === true) {
          this.$cookie.set('token', res.body.token);
          this.$cookie.set('id', res.body.id);
          this.$cookie.set('expires', new Date().getTime() + (2 * 60 * 60));
          this.$store.state.admin = true;
          router.push({name: 'Points'}); // Push to last page
        }
        else {
          alert('Error: ' + res.body.message);
        }
      });
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
  margin: 0px;
}
.login {
  padding-top: 50px;
  padding-bottom: 50px;
}
input {
  height: 50px;
}
#LoginForm {
  height: 100%;
  width: 35%;
  margin: auto;
  border-radius: 0px 0px 5px 5px;
}
#LoginFormHeader {
  height: 20%;
  padding: 10px;
  background-color: #fcfcfc;
  border-radius: 5px 5px 0px 0px;
  border-width: 1px;
  border-style: solid;
  border-color: #d3d3d3;
}
#LoginFormHeader h1 {
  color: black;
  font-size: 16px;
  padding: 20px;
}
#LoginFormBody {
  height: 80%;
  padding: 10px 20px 10px 20px;
  background-color: white;
  border-radius: 0px 0px 5px 5px;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #d3d3d3;
}
#LoginFormBody h1 {
  padding: 0px 20px 0px 20px;
}
#LoginFormBody input {
  padding: auto;
  margin: 20px 0px 20px 0px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
}
#Submit {
  background-color: #50e09a;
  color: white;
}
#Submit:active {
  background-color: #49cc8b;
}
</style>
