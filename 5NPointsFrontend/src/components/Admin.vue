<template>
  <div class="admin h-100">
    <div class="col h-100">
      <Toolbar class="row w-100"/>
      <div class="body">
        <h1>Points</h1>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users">
              <td>{{user.name}}</td>
              <td><p v-on:click="decrememtPoints">-</p><p> {{user.points}} </p><p v-on:click="incrementPoints">+</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'Admin',
  data () {
    return {
      users: []
    }
  },
  methods: {
    checkPrivileges: function() {
      this.$http.post('http://localhost:3000/admin', {}).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          router.push({name: 'Login'});
        }
      });
    },
    getUsers: function() {
      this.$http.get('http://localhost:3000/api/points').then(res => { // Change localhost
        this.users = res.body;
      });
    },
    incrementPoints: function() {
      alert('Increment');
    },
    decrememtPoints: function() {
      alert('Decrement');
    }
  },
  mounted() {
    this.checkPrivileges();
    this.getUsers();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.body {
  width: 60%;
  margin: auto;
}
th {
  text-align: center;
}
td p {
  display: inline;
}
</style>
