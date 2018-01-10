<template>
  <div class="points h-100">
    <div class="col h-100">
      <Toolbar class="row w-100"/>
      <div class="body">
        <h1>Points</h1>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-if="!sortPoints"><u>Name</u></th>
              <th v-else @click="sortPoints = false; users = unsorted;"><b>Name</b></th>
              <th v-if="sortPoints"><u>Points</u></th>
              <th v-else @click="sortPoints = true; users = sorted;"><b>Points</b></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id" v-bind:class="{editing: user == userEditing}" v-cloak>
              <td>
                <div @click="editing(user)" class="view">
                  {{user.firstname}} {{user.lastname}}
                </div>
                <div v-if="$store.state.admin" class="edit">
                  <input @keyup.esc="escape()" @keyup.enter="save(user._id, user.firstname, user.lastname)" type="text" v-model="user.firstname"/>
                  <input @keyup.esc="escape()" @keyup.enter="save(user._id, user.firstname, user.lastname)" type="text" v-model="user.lastname"/>
                </div>
              </td>
              <td><p v-if="$store.state.admin" @click="decrement(user._id)">-</p> {{user.points}} <p v-if="$store.state.admin" @click="increment(user._id)">+</p></td>
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
      users: [],
      unsorted: [],
      sorted: [],
      userEditing: null,
      sortPoints: false
    }
  },
  methods: {
    editing: function(user) {
      if(this.$store.state.admin) {
        this.userEditing = user;
      }
    },
    escape: function() {
      this.userEditing = null;
      this.getUsers();
    },
    save: function(pointId, firstname, lastname) {
      this.$http.post(config.backend + '/api/points', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        pointId: pointId,
        firstname: firstname,
        lastname: lastname
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
        }
        this.escape();
      })
    },
    getUsers: function() {
      this.$http.get(config.backend + '/api/points').then(res => {
        this.unsorted = res.body;
        for(var i = 0; i < this.users.length; i++) {
          this.unsorted[i].index = i;
        }
        this.sorted = this.unsorted.slice();
        this.sort(this.sorted);
        if(!this.sortPoints) {
          this.users = this.unsorted;
        }
        else {
          this.users = this.sorted;
        }
      });
    },
    sort: function(users) {
      users.sort(function(a, b) {
        return a.points - b.points;
      });
    },
    increment: function(pointId) {
      this.$http.post(config.backend + '/api/points', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        pointId: pointId,
        value: 1
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
    decrement: function(pointId) {
      this.$http.post(config.backend + '/api/points', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        pointId: pointId,
        value: -1
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
.edit {
  display: none
}
.editing .view {
  display: none;
}
.editing .edit {
  display: block;
}
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
th u, th b {
  cursor: pointer;
}
td p {
  display: inline;
}
</style>
