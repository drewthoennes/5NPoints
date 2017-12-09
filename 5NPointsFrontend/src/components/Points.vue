<template>
  <div class="points h-100">
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
              <td>{{user.firstname}} {{user.lastname}}</td>
              <td><p v-if="$store.state.admin" @click="decrememtPoints(user._id)">-</p> {{user.points}} <p v-if="$store.state.admin" @click="incrementPoints(user._id)">+</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import config from '@/assets/config'
import store from '@/store'

export default {
  name: 'Points',
  components: {
    Toolbar
  },
  data () {
    return {
      users: []
    }
  },
  methods: {
    getUsers: function() {
      this.$http.get(config.backend + '/api/points').then(res => {
        this.users = res.body;
        for(var i = 0; i < this.users.length; i++) {
          this.users[i].index = i;
          this.users[i].editing = false;
        }
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
    this.getUsers();
  },
  mounted() {
    if(this.$store.state.admin == null) {
          this.$children[0].updateStore();
    }
  }
}
</script>

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
