<template>
  <div class="content">
    <h1>{{ entityName }}s</h1>
    <slot name="search-bar"></slot>
    <div class="entity-list">
      <nuxt-link
        v-for="entity in entities"
        :key="entity.id"
        :to="`/${link}/${entity.id}`"
        class="entity-item"
      >
        <div v-if="entity.image || entity.thumbnail" class="entity-image-container">
          <img :src="entity.image || entity.thumbnail" alt="Entity Image" class="entity-image" />
        </div>
        <h2 class="entity-title">
          {{ getTitle(entity) }}
        </h2>
        <p class="entity-info" v-if="entity.price">Price: {{ entity.price }} €</p>
        <p class="entity-info" v-if="entity.total">Total: {{ entity.total }} €</p>
        <p class="entity-info" v-if="entity.discountedTotal">Discounted Total: {{ entity.discountedTotal }} €</p>
        <p class="entity-info" v-if="entity.cuisine">Cuisine: {{ entity.cuisine }}</p>
        <p class="entity-info" v-if="entity.prepTimeMinutes">Prep Time: {{ entity.prepTimeMinutes }} min</p>
        <p class="entity-info" v-if="entity.cookTimeMinutes">Cook Time: {{ entity.cookTimeMinutes }} min</p>
        <p class="entity-info" v-if="entity.age">Age: {{ entity.age }}</p>
        <p class="entity-info" v-if="entity.gender">Gender: {{ entity.gender }}</p>
      </nuxt-link>
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1" class="pagination-button">Previous</button>
      <button @click="nextPage" :disabled="page === totalPages" class="pagination-button">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntityListing',
  props: {
    entityName: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    entities: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    nextPage: {
      type: Function,
      required: true
    },
    prevPage: {
      type: Function,
      required: true
    }
  },
  methods: {
    getTitle(entity) {
      if (this.entityName.toLowerCase() === 'cart') {
        return `Panier ${entity.id}`;
      }
      return entity.title || entity.name || `${entity.firstName} ${entity.lastName}` || `Item ${entity.id}`;
    }
  }
}
</script>

<style scoped>
.content {
  padding: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.entity-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.entity-item {
  background-color: #1a1a1a;
  border: 1px solid #ff0000;
  border-radius: 10px;
  padding: 1rem;
  width: 200px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: #fff;
}

.entity-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 0, 0, 0.5);
}

.entity-image-container {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 10px;
}

.entity-image {
  width: 100%;
  height: auto;
}

.entity-title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.entity-info {
  color: #ff0000;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.pagination-button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.pagination-button:hover:not(:disabled) {
  background-color: #cc0000;
}
</style>
