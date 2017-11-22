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
              <td>{{user.name}}</td>
              <td>{{user.points}}</td>
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
      this.$http.get('http://localhost:3000/api/points').then(res => { // Change localhost
        this.users = res.body;
      });
    }
  },
  mounted() {
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
</style>
