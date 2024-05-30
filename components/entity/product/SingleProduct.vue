<template>
  <div>
    <NavBar />
    <div class="content">
      <h1 class="product-title">{{ product.title }}</h1>
      <div v-if="product" class="product-details">
        <div class="product-summary">
          <img :src="product.thumbnail" alt="Product Image" class="product-image" />
          <p class="product-info">Description: {{ product.description }}</p>
          <p class="product-info">Catégorie: {{ product.category }}</p>
          <p class="product-info">Prix: {{ product.price }} €</p>
          <p class="product-info">Remise: {{ product.discountPercentage }}%</p>
          <p class="product-info">Évaluation: {{ product.rating }}</p>
          <p class="product-info">Stock: {{ product.stock }}</p>
          <p class="product-info">Marque: {{ product.brand }}</p>
          <p class="product-info">SKU: {{ product.sku }}</p>
          <p class="product-info">Poids: {{ product.weight }} kg</p>
          <p class="product-info">Informations de garantie: {{ product.warrantyInformation }}</p>
          <p class="product-info">Informations de livraison: {{ product.shippingInformation }}</p>
          <p class="product-info">État de disponibilité: {{ product.availabilityStatus }}</p>
          <p class="product-info">Politique de retour: {{ product.returnPolicy }}</p>
          <p class="product-info">Quantité minimum de commande: {{ product.minimumOrderQuantity }}</p>
        </div>
        <form @submit.prevent="updateProduct" class="edit-form">
          <div class="edit-fields">
            <label>
              Titre:
              <input type="text" v-model="product.title" />
            </label>
            <label>
              Description:
              <textarea v-model="product.description"></textarea>
            </label>
            <label>
              Prix:
              <input type="number" v-model.number="product.price" step="0.01" />
            </label>
            <label>
              Remise:
              <input type="number" v-model.number="product.discountPercentage" step="0.01" />
            </label>
            <label>
              Stock:
              <input type="number" v-model.number="product.stock" step="0.01" />
            </label>
          </div>
          <div class="button-group">
            <button type="submit" class="update-button">Mettre à jour le produit</button>
            <button type="button" @click="deleteProduct" class="delete-button">Supprimer le produit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
  name: 'SingleProduct',
  components: { NavBar },
  data() {
    return {
      product: {}
    };
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id;
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await response.json();
      this.product = data;
    },
    async updateProduct() {
      const body = {
        title: this.product.title
      }
      const response = await fetch(`https://dummyjson.com/products/${this.product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        this.$router.go();
      }
    },
    async deleteProduct() {
      const response = await fetch(`https://dummyjson.com/products/${this.product.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        this.$router.push('/product');
      }
    }
  },
  async created() {
    await this.fetchProduct();
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

.product-title {
  font-size: 2.5rem;
  color: #ff0000;
  margin-bottom: 2rem;
  animation: fadeIn 1.5s ease-in-out;
}

.product-summary {
  margin-bottom: 2rem;
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5);
  animation: fadeIn 2s ease-in-out;
}

.product-image {
  width: 200px;
  height: auto;
  border-radius: 10px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.product-image:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
}

.product-info {
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

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ff0000;
  border-radius: 5px;
  background-color: #1a1a1a;
  color: #fff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
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
