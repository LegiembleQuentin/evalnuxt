<template>
  <nav class="navbar">
    <nuxt-link to="/" class="navbar-title">Exam nuxt</nuxt-link>
    <ul class="nav-list">
      <li class="nav-item" v-if="!isLoggedIn">
        <nuxt-link to="/login" class="nav-link">
          Connexion
        </nuxt-link>
      </li>
      <li v-if="isLoggedIn" class="nav-item">
        <span class="nav-link">
          {{ username }}
        </span>
      </li>
      <li v-if="isLoggedIn" class="nav-item">
        <div @click="logout" class="nav-link logout-link">
          Déconnexion
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isAuthenticated
    },
    username() {
      return this.$store.state.auth.username
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style scoped>
.navbar {
  background-color: #000;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ff0000;
}

.nav-link::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #ff0000;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out;
}

.nav-link:hover::before {
  visibility: visible;
  transform: scaleX(1);
}

.logout-link {
  color: #ff0000;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-link:hover {
  color: #cc0000;
}

.nav-username {
  color: #fff;
  font-size: 1.2rem;
}
</style>
