<template>
  <div>
    <NavBar />
    <div class="content">
      <h1 class="user-title">{{ user.firstName }} {{ user.lastName }}</h1>
      <div v-if="user" class="user-details">
        <div class="user-summary">
          <img :src="user.image" alt="User Image" class="user-image" />
          <p class="user-info">Age: {{ user.age }}</p>
          <p class="user-info">Gender: {{ user.gender }}</p>
          <p class="user-info">Email: {{ user.email }}</p>
          <p class="user-info">Phone: {{ user.phone }}</p>
          <p class="user-info">Username: {{ user.username }}</p>
          <p class="user-info">Birth Date: {{ user.birthDate }}</p>
          <p class="user-info">Blood Group: {{ user.bloodGroup }}</p>
          <p class="user-info">Height: {{ user.height }} cm</p>
          <p class="user-info">Weight: {{ user.weight }} kg</p>
        </div>
        <form @submit.prevent="updateUser" class="edit-form">
          <div class="edit-fields">
            <label>
              First Name:
              <input type="text" v-model="user.firstName" />
            </label>
            <label>
              Last Name:
              <input type="text" v-model="user.lastName" />
            </label>
            <label>
              Email:
              <input type="email" v-model="user.email" />
            </label>
            <label>
              Phone:
              <input type="text" v-model="user.phone" />
            </label>
            <label>
              Username:
              <input type="text" v-model="user.username" />
            </label>
          </div>
          <div class="button-group">
            <button type="submit" class="update-button">Mettre à jour l'utilisateur</button>
            <button type="button" @click="deleteUser" class="delete-button">Supprimer l'utilisateur</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
  name: 'SingleUser',
  components: { NavBar },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async fetchUser() {
      const userId = this.$route.params.id;
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      const data = await response.json();
      this.user = data;
    },
    async updateUser() {
      const body = {
        lastName: this.user.lastName,
      }
      const response = await fetch(`https://dummyjson.com/users/${this.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        this.$router.go();
      }
    },
    async deleteUser() {
      const response = await fetch(`https://dummyjson.com/users/${this.user.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        this.$router.push('/user');
      }
    }
  },
  async created() {
    await this.fetchUser();
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content {
  padding: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
  animation: fadeIn 1s ease-in-out;
}

.user-title {
  font-size: 2.5rem;
  color: #ff0000;
  margin-bottom: 2rem;
  animation: fadeIn 1.5s ease-in-out;
}

.user-summary {
  margin-bottom: 2rem;
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
  animation: fadeIn 2s ease-in-out;
}

.user-image {
  width: 200px;
  height: auto;
  border-radius: 10px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.user-image:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
}

.user-info {
  font-size: 1.1rem;
  color: #fff;
  margin: 0.5rem 0;
}

.edit-form {
  margin-top: 2rem;
  animation: fadeIn 2.5s ease-in-out;
}

.edit-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #000;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ff0000;
  border-radius: 5px;
  background-color: #1a1a1a;
  color: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  background-color: #2a2a2a;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.update-button,
.delete-button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.update-button:hover,
.delete-button:hover {
  background-color: #cc0000;
  transform: scale(1.05);
}
</style>
