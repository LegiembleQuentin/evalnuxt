<template>
  <div>
    <NavBar />
    <EntityListing
      entityName="Recette"
      link="recipe"
      :entities="recipes"
      :page="page"
      :totalPages="totalPages"
      :nextPage="nextPage"
      :prevPage="prevPage"
    >
      <template v-slot:search-bar>
        <SearchBar @search="searchRecipe" />
      </template>
    </EntityListing>
  </div>
</template>

<script>
import NavBar from "~/components/NavBar.vue";
import EntityListing from "~/components/entity/EntityListing.vue";
import SearchBar from "~/components/SearchBar.vue";

export default {
  name: 'RecipesPage',
  components: {SearchBar, NavBar, EntityListing },
  data() {
    return {
      recipes: [],
      page: 1,
      limit: 10,
      totalPages: 0
    };
  },
  async created() {
    await this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      const skip = (this.page - 1) * this.limit;
      const response = await fetch(`https://dummyjson.com/recipes?limit=${this.limit}&skip=${skip}`);
      const data = await response.json();
      this.recipes = data.recipes;
      this.totalPages = Math.ceil(data.total / this.limit);
    },
    async searchRecipe(query) {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const data = await response.json();
      this.recipes = data.recipes;
      this.totalPages = Math.ceil(data.total / this.limit);
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchRecipes();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchRecipes();
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
