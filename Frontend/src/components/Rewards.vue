<template>
  <div class="rewards h-100">
    <div class="col h-100">
      <Toolbar class="row w-100"/>
      <div class="body">
        <h1>Rewards</h1>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Points</th>
              <th>Rewards</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reward in rewards" v-bind:class="{editing: reward == rewardEditing}" v-cloak>
              <td><p v-if="$store.state.admin" @click="decrement(reward._id)">-</p> {{reward.points}} <p v-if="$store.state.admin" @click="increment(reward._id)">+</p></td>
              <td>
                <div @click="editing(reward)" class="view">
                  {{reward.reward}}
                </div>
                <div v-if="$store.state.admin" class="edit">
                  <input @keyup.esc="escape()" @keyup.enter="save(reward._id, reward.reward)" type="text" v-model="reward.reward"/>
                </div>
              </td>
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

export default {
  name: 'Rewards',
  components: {
    Toolbar
  },
  data () {
    return {
      rewards: [],
      rewardEditing: null
    }
  },
  methods: {
    editing: function(reward) {
      if(this.$store.state.admin) {
        this.rewardEditing = reward;
      }
    },
    escape: function() {
      this.rewardEditing = null;
      this.getRewards();
    },
    save: function(rewardId, reward) {
      this.$http.post(config.backend + '/api/rewards', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        rewardId: rewardId,
        reward: reward
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
        }
        this.escape();
      })
    },
    getRewards: function() {
      this.$http.get(config.backend + '/api/rewards').then(res => {
        this.rewards = res.body;
      });
    },
    increment: function(rewardId) {
      this.$http.post(config.backend + '/api/rewards', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        rewardId: rewardId,
        value: 1
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          this.$router.push({name: 'Login'});
        }
        else {
          this.getRewards();
        }
      });
    },
    decrement: function(rewardId) {
      this.$http.post(config.backend + '/api/rewards', {
        token: this.$cookie.get('token'),
        userId: this.$cookie.get('id'),
        rewardId: rewardId,
        value: -1
      }).then(res => {
        if(!res.body.success) {
          alert(res.body.message);
          this.$router.push({name: 'Login'});
        }
        else {
          this.getRewards();
        }
      });
    }
  },
  created() {
    this.getRewards();
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
