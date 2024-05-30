<template>
  <div>
    <NavBar />
    <EntityListing
      entityName="Cart"
      :entities="carts"
      :page="page"
      :totalPages="totalPages"
      :nextPage="nextPage"
      :prevPage="prevPage"
      :searchEntities="searchCarts"
      link="cart"
    />
  </div>
</template>

<script>
import NavBar from "~/components/NavBar.vue";
import EntityListing from "~/components/entity/EntityListing.vue";

export default {
  name: 'CartPage',
  components: { NavBar, EntityListing },
  data() {
    return {
      carts: [],
      page: 1,
      limit: 10,
      totalPages: 0
    };
  },
  async created() {
    await this.fetchCarts();
  },
  methods: {
    async fetchCarts() {
      const skip = (this.page - 1) * this.limit;
      const response = await fetch(`https://dummyjson.com/carts?limit=${this.limit}&skip=${skip}`);
      const data = await response.json();
      this.carts = data.carts;
      this.totalPages = Math.ceil(data.total / this.limit);
    },
    async searchCarts(query) {
      const response = await fetch(`https://dummyjson.com/carts/search?q=${query}`);
      const data = await response.json();
      this.carts = data.carts;
      this.totalPages = Math.ceil(data.total / this.limit);
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchCarts();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchCarts();
      }
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #000;
  color: #fff;
  overflow: hidden; /* To prevent scrollbar due to animation */
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #ff0000, #0000ff, #00ff00, #ff0000);
  background-size: 600% 600%;
  animation: gradientAnimation 16s ease infinite;
  z-index: 0;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
