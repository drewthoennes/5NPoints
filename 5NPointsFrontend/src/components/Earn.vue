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
              <td>{{way.activity}}</td>
              <td>{{way.points}}</td>
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
  name: 'Earn',
  components: {
    Toolbar
  },
  data () {
    return {
      earn: []
    }
  },
  methods: {
    getEarn: function() {
      this.$http.get(config.backend + '/api/earn').then(res => {
        this.earn = res.body;
      });
    }
  },
  mounted() {
    this.getEarn();
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
