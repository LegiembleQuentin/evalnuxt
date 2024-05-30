<template>
  <div class="page">
    <NavBar />
    <div class="content">
      <div class="link-list">
        <nuxt-link to="/product" class="link-item">
          <span class="link-text">Produits</span>
        </nuxt-link>
        <nuxt-link to="/cart" class="link-item">
          <span class="link-text">Pannier</span>
        </nuxt-link>
        <nuxt-link to="/recipe" class="link-item">
          <span class="link-text">Recettes</span>
        </nuxt-link>
        <nuxt-link to="/user" class="link-item">
          <span class="link-text">Utilisateur</span>
        </nuxt-link>
        <nuxt-link to="/post" class="link-item">
          <span class="link-text">Posts</span>
        </nuxt-link>
        <nuxt-link to="/comment" class="link-item">
          <span class="link-text">Commentaires</span>
        </nuxt-link>
        <nuxt-link to="/todo" class="link-item">
          <span class="link-text">A faire</span>
        </nuxt-link>
        <nuxt-link to="/quote" class="link-item">
          <span class="link-text">Citations</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #000;
  color: #fff;
}

.page {
  background-color: #000000;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh; /* Adjusted to fit the screen excluding the navbar */
  padding: 1rem;
}

.link-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.link-item {
  position: relative;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: 2px solid #ff0000;
  border-radius: 5px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.link-item:hover {
  background-color: #ff0000;
  color: #000;
  transform: scale(1.05);
}

.link-text {
  position: relative;
  z-index: 1;
}

.link-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  z-index: 0;
  border-radius: 5px;
}

.link-item:hover::before {
  background-color: rgba(255, 0, 0, 0.3);
}

.link-item::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%);
  transition: opacity 0.3s ease;
  opacity: 0;
  transform: translate(-50%, -50%);
}

.link-item:hover::after {
  opacity: 1;
}
</style>
