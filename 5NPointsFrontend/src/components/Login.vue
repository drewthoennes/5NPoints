<template>
  <div class="login container-fluid">
    <div id="LoginForm" class="col">
      <div id="LoginFormHeader" class="col">
        <router-link to="/points">Not an admin? View points here</router-link>
      </div>
      <div id="LoginFormBody">
        <h1>Log in</h1>
        <form v-on:submit="loginUser">
          <input id="Username" ref="username" placeholder="Username" class="form-control" type="text">
          <input id="Password" ref="password" placeholder="Password" class="form-control" type="password">
          <input id="Submit" placeholder="Create account" class="form-control" type="submit">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import config from '@/assets/config';

export default {
  name: 'Login',
  methods: {
    loginUser: function(event) {
      event.preventDefault();
      if(!this.$refs.username.value || !this.$refs.password.value) {
        alert("Please complete all fields");
      }
      this.$http.post(config.backend + '/login', {
        username: this.$refs.username.value,
        password: this.$refs.password.value
      }).then(res => {
        if(res.body.success === true) {
          alert(res.body.message);
          router.push({name: 'Admin'});
        }
        else {
          alert('Error: ' + res.body.message);
        }
      });
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
  margin: 0px;
  /*padding: 20px;*/
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
  width: 35%; /* Controls the width of the Login */
  margin: auto;
  border-radius: 0px 0px 5px 5px;
}
#LoginFormHeader {
  height: 20%;
  padding: 10px;
  /*background-color: white;*/
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
  padding: 10px;
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
  /* Input needs to be centered, width is incorrect */
  width: 90%;
  padding: 15px 5px 15px 5px;
  margin: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  outline-width: 0px;
}
#Submit {
  background-color: #50e09a; /* Color at the top of the bottom bar */
  color: white;
}
#Submit:active {
  background-color: #49cc8b;
}
</style>
