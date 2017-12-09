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
            <tr v-for="reward in rewards">
              <td>{{reward.points}}</td>
              <td>{{reward.reward}}</td>
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
      rewards: []
    }
  },
  methods: {
    getRewards: function() {
      this.$http.get(config.backend + '/api/rewards').then(res => { // Change localhost
        this.rewards = res.body;
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
</style>
