<template>
  <div>
    <NavBar />
    <div class="content">
      <h1 class="recipe-title">{{ recipe.name }}</h1>
      <div v-if="recipe" class="recipe-details">
        <div class="recipe-summary">
          <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
          <p class="recipe-info">Préparation: {{ recipe.prepTimeMinutes }} min</p>
          <p class="recipe-info">Cuisson: {{ recipe.cookTimeMinutes }} min</p>
          <p class="recipe-info">Difficulté: {{ recipe.difficulty }}</p>
          <p class="recipe-info">Cuisine: {{ recipe.cuisine }}</p>
          <p class="recipe-info">Calories par portion: {{ recipe.caloriesPerServing }}</p>
          <p class="recipe-info">Portions: {{ recipe.servings }}</p>
          <p class="recipe-info">Évaluation: {{ recipe.rating }}</p>
          <p class="recipe-info">Nombre de critiques: {{ recipe.reviewCount }}</p>
          <h2 class="section-title">Ingrédients</h2>
          <ul class="ingredients-list">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient" class="ingredient-item">
              {{ ingredient }}
            </li>
          </ul>
          <h2 class="section-title">Instructions</h2>
          <ol class="instructions-list">
            <li v-for="instruction in recipe.instructions" :key="instruction" class="instruction-item">
              {{ instruction }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
  name: 'SingleRecipe',
  components: { NavBar },
  data() {
    return {
      recipe: {}
    };
  },
  methods: {
    async fetchRecipe() {
      const recipeId = this.$route.params.id;
      const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`);
      const data = await response.json();
      this.recipe = data;
    }
  },
  async created() {
    await this.fetchRecipe();
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

.recipe-title {
  font-size: 2.5rem;
  color: #ff0000;
  margin-bottom: 2rem;
  animation: fadeIn 1.5s ease-in-out;
}

.recipe-summary {
  margin-bottom: 2rem;
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
  animation: fadeIn 2s ease-in-out;
}

.recipe-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.recipe-image:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
}

.recipe-info {
  font-size: 1.1rem;
  color: #fff;
  margin: 0.5rem 0;
}

.section-title {
  font-size: 1.5rem;
  color: #ff0000;
  margin-top: 2rem;
}

.ingredients-list,
.instructions-list {
  list-style: none;
  padding: 0;
}

.ingredient-item,
.instruction-item {
  font-size: 1.1rem;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 5px;
  animation: fadeIn 2.5s ease-in-out;
}
</style>
