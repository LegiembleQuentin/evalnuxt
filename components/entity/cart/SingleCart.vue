<template>
  <div>
    <NavBar />
    <div class="content">
      <h1>Panier #{{ cart.id }}</h1>
      <div v-if="cart.products" class="cart-details">
        <div class="cart-summary">
          <p>Total: {{ formatPrice(cart.total) }} €</p>
          <p>Remise Total: {{ formatPrice(cart.discountedTotal) }} €</p>
          <p>Nombre de Produits: {{ cart.totalProducts }}</p>
          <p>Quantité Totale: {{ cart.totalQuantity }}</p>
        </div>
        <form @submit.prevent="updateCart">
          <div class="product-list">
            <div v-for="product in cart.products" :key="product.id" class="product-item">
              <img :src="product.thumbnail" alt="Product Image" class="product-image" />
              <h2 class="product-title">{{ product.title }}</h2>
              <p class="product-price">{{ formatPrice(product.price) }} €</p>
              <p class="product-quantity">
                Quantité:
                <input
                  type="number"
                  v-model.number="product.quantity"
                  min="1"
                  class="quantity-input"
                />
              </p>
              <p class="product-total">Total: {{ formatPrice(product.total) }} €</p>
              <p class="product-discount">Remise: {{ product.discountPercentage }}%</p>
              <p class="product-discounted-total">Total avec remise: {{ formatPrice(product.discountedTotal) }} €</p>
            </div>
          </div>
          <button type="submit" class="update-button">Mettre à jour le panier</button>
          <button type="button" @click="deleteCart" class="delete-button">Supprimer le panier</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '~/components/NavBar.vue';

export default {
  name: 'SingleCart',
  components: { NavBar },
  data() {
    return {
      cart: {}
    };
  },
  methods: {
    formatPrice(value) {
      return value.toFixed(2);
    },
    async updateCart() {
      const updatedProducts = this.cart.products.map(product => ({
        id: product.id,
        quantity: product.quantity
      }));
      const response = await fetch(`https://dummyjson.com/carts/${this.cart.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merge: true,
          products: updatedProducts
        })
      });
      if (response.ok) {
        this.$router.go();
      }
    },
    async deleteCart() {
      const response = await fetch(`https://dummyjson.com/carts/${this.cart.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        this.$router.push('/cart');
      }
    }
  },
  async created() {
    const cartId = this.$route.params.id;
    const response = await fetch(`https://dummyjson.com/carts/${cartId}`);
    const data = await response.json();
    this.cart = data;
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

.cart-summary {
  margin-bottom: 2rem;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.product-item {
  background-color: #1a1a1a;
  border: 1px solid #ff0000;
  border-radius: 10px;
  padding: 1rem;
  width: 200px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: #fff;
}

.product-image {
  width: 100%;
  border-radius: 10px;
}

.product-title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.product-price,
.product-quantity,
.product-total,
.product-discount,
.product-discounted-total {
  color: #ff0000;
  font-weight: bold;
}

.quantity-input {
  width: 60px;
  padding: 0.3rem;
  margin-left: 0.5rem;
  border: 1px solid #ff0000;
  border-radius: 5px;
  background-color: #1a1a1a;
  color: #fff;
}

.update-button,
.delete-button {
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-right: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-button:hover,
.delete-button:hover {
  background-color: #cc0000;
}
</style>
