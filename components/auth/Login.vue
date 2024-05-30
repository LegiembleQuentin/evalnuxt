<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2 class="login-title">Connexion</h2>
      <div class="form-group">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-input"
          required
        />
      </div>
      <button type="submit" class="submit-button">Se connecter</button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
    <div class="animated-bg"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: null
    }
  },
  methods: {
    async login() {
      this.errorMessage = null
      try {
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password,
        })
        // Rediriger vers une page après la connexion réussie
        this.$router.push('/')
      } catch (error) {
        this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.'
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #141414;
  overflow: hidden;
  position: relative;
}

.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #ff004c, #00d4ff, #00ff6a);
  background-size: 300% 300%;
  z-index: 0;
  animation: gradientBG 15s ease infinite;
}

.login-form {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  z-index: 1;
  width: 100%;
  max-width: 400px;
  animation: formEntrance 1s ease forwards;
  transform: translateY(100vh);
}

.login-title {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #cccccc;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.3s ease;
}

.form-input:focus {
  background: rgba(255, 255, 255, 0.4);
  outline: none;
  transform: scale(1.05);
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background: #00d4ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.submit-button:hover {
  background: #00aacc;
  transform: scale(1.05);
}

.error-message {
  margin-top: 1rem;
  color: #ff0000;
  text-align: center;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes formEntrance {
  to {
    transform: translateY(0);
  }
}
</style>
