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
              <td>{{user.firstname}} {{user.lastname}}</i></td><!--<i class="fa fa-pencil" aria-hidden="true"></i>-->
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
import config from '@/assets/config'
import AdminToolbar from '@/components/AdminToolbar'

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
    checkToken: function() {
      if(this.$cookie.get('token') === null || this.$cokie.get('token') === '') {
        this.$router.push({name: 'Login'});
      }
    },
    checkPrivileges: function() {
      this.$http.options.emulateJSON = true;
      this.$http.post(config.backend + '/admin', {
        token: this.$cookie.get('token'),
        id: this.$cookie.get('id')
      }, {credentials: true}).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          router.push({name: 'Login'});
        }
      });
    },
    getUsers: function() {
      this.$http.get(config.backend + '/api/points').then(res => {
        this.users = res.body;
      });
    },
    incrementPoints: function(pointId) {
      this.$http.post(config.backend + '/increment', {
        token: this.$cookie.get('token'),
        id: this.$cookie.get('id'),
        pointId: pointId
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          this.$router.push({name: 'Login'});
        }
        else {
          this.getUsers();
        }
      });
    },
    decrememtPoints: function(pointId) {
      this.$http.post(config.backend + '/decrement', {
        token: this.$cookie.get('token'),
        id: this.$cookie.get('id'),
        pointId: pointId
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          this.$router.push({name: 'Login'});
        }
        else {
          this.getUsers();
        }
      });
    }
  },
  created() {
    alert('Created');
    console.log(this.$cookie);
    console.log(this.$router);
    this.checkToken();
  },
  mounted() {
    alert('Mounted');
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
