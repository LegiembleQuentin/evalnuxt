<template>
  <div>
    <NavBar />
    <Login />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'
import Login from '~/components/auth/Login.vue'

export default {
  components: {
    NavBar,
    Login,
  },
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
}
</style>
