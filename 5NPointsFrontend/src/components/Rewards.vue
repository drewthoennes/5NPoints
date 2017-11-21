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
export default {
  name: 'Rewards',
  components: {
    Toolbar
  },
  data () {
    return {
      rewards: [
        {
          points: 1,
          reward: 'Get a bedtime store from Zach'
        }
      ]
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
