<template>
<div class="section">
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <h1 class="title is-4">Your cart</h1>

        <article class="message" v-if="count">
          <CartOverView />
        </article>
        <p v-else>
          Your cart is empty.
        </p>

        <a
          href="#"
          class="button is-fullwidth is-info is-medium"
          v-if="!empty"
        >
          Checkout
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartOverView from '@/components/cart/CartOverview'

export default {
    components: {
      CartOverView
    },

    computed: {
      ...mapGetters({
        count: 'cart/count',
        empty: 'cart/empty'
      })
    }
}
</script>