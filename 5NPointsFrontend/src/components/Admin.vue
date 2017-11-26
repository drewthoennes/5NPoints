<template>
  <div class="admin h-100">
    <div class="col h-100">
      <AdminToolbar class="row w-100"/>
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
              <td><p v-on:click="decrememtPoints(user._id)">-</p><p> {{user.points}} </p><p v-on:click="incrementPoints(user._id)">+</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import AdminToolbar from '@/components/AdminToolbar'
import config from '@/assets/config'

export default {
  name: 'Admin',
  components: {
    AdminToolbar
  },
  data () {
    return {
      users: []
    }
  },
  methods: {
    checkPrivileges: function() {
      this.$http.post(config.backend + '/admin', {}).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          router.push({name: 'Login'});
        }
      });
    },
    getUsers: function() {
      this.$http.get(config.backend + '/api/points').then(res => { // Change localhost
        this.users = res.body;
      });
    },
    incrementPoints: function(id) {
      this.$http.post(config.backend + '/increment', {
        _id: id
      }).then(res => { // Change localhost
        if(!res.body.success) {
          alert(res.body.message);
        }
        else {
          this.getUsers();
        }
      });
    },
    decrememtPoints: function(id) {
      this.$http.post(config.backend + '/decrement', {
        _id: id
      }).then(res => { // Change localhost
        if(!res.body.success) {
          alert(res.body.message);
        }
        else {
          this.getUsers();
        }
      });
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
