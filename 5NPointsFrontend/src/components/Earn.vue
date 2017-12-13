<template>
  <div class="earn h-100">
    <div class="col h-100">
      <Toolbar class="row w-100"/>
      <div class="body">
        <h1>Earn</h1>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="way in earn">
              <td v-bind:class="{editing: way == earnEditing}" v-cloak>
                <div @click="editing(way)" class="view">
                  {{way.activity}}
                </div>
                <div v-if="$store.state.admin" class="edit">
                  <input @keyup.esc="escape()" @keyup.enter="save(way._id, way.activity)" type="text" v-model="way.activity"/>
                </div>
              </td>
              <td><p v-if="$store.state.admin" @click="decrememt(way._id)">-</p> {{way.points}} <p v-if="$store.state.admin" @click="increment(way._id)">+</p></td>
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
  name: 'Earn',
  components: {
    Toolbar
  },
  data () {
    return {
      earn: [],
      earnEditing: null
    }
  },
  methods: {
    editing: function(way) {
      if(this.$store.state.admin) {
        this.earnEditing = way;
      }
    },
    escape: function() {
      this.earnEditing = null;
      this.getEarn();
    },
    save: function(earnId, activity) {
      this.$http.post(config.backend + '/api/earn', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        earnId: earnId,
        activity: activity
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
        }
        this.escape();
      })
    },
    getEarn: function() {
      this.$http.get(config.backend + '/api/earn').then(res => {
        this.earn = res.body;
      });
    },
    increment: function(earnId) {
      this.$http.post(config.backend + '/api/earn', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        earnId: earnId,
        value: 1
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          this.$router.push({name: 'Login'});
        }
        else {
          this.getEarn();
        }
      });
    },
    decrememt: function(earnId) {
      this.$http.post(config.backend + '/api/earn', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        earnId: earnId,
        value: -1
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          this.$router.push({name: 'Login'});
        }
        else {
          this.getEarn();
        }
      });
    }
  },
  created() {
    this.getEarn();
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
td p {
  display: inline;
}
</style>
