<template>
  <div class="filters">
    <input
      v-model="searchQuery"
      @keyup.enter="onSearch"
      type="text"
      placeholder="Rechercher..."
      class="search-bar"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
}
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.search-bar {
  padding: 0.5rem;
  border: 1px solid #ff0000;
  border-radius: 5px;
  background-color: #1a1a1a;
  color: #fff;
  width: 200px;
}
</style>
