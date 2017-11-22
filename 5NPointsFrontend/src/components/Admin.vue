<template>
  <div class="admin">
    <h1>Admin</h1>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'Admin',
  data () {
    return {
    }
  },
  methods: {
    checkPrivileges: function() {
      this.$http.post('http://localhost:3000/admin', {}).then(res => {
        if(res.body.success) {
          alert('You have permission to view this page');
        }
        else {
          alert(res.body.message);
          router.push({name: 'Login'});
        }
      })
    }
  },
  mounted() {
    this.checkPrivileges();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
