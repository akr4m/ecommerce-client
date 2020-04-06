<template>
<div class="section">
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-three-quarters">
        <ShippingAddress :addresses="addresses" v-model="form.address_id" />

        <article class="message">
          <div class="message-body">
            <h1 class="title is-5">Payment</h1>
          </div>
        </article>

        <article class="message" v-if="shippingMethodId">
          <div class="message-body">
            <h1 class="title is-5">
              Shipping
            </h1>
            <div class="select is-fullwidth">
              <select v-model="shippingMethodId">
                <option v-for="shipping in shippingMethods" :key="shipping.id" :value="shipping.id">
                  {{ shipping.name }} ({{ shipping.price }})
                </option>
              </select>
            </div>
          </div>
        </article>

        <article class="message" v-if="count">
          <div class="message-body">
            <h1 class="title is-5">
              Cart summary
            </h1>
            <p v-if="changed">Product stock has been updated</p>
            <CartOverview>
                <template slot="rows">
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="has-text-weight-bold">
                            Shipping
                        </td>
                        <td>
                            {{ shipping.price }}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="has-text-weight-bold">
                            Total
                        </td>
                        <td>
                            {{ total }}
                        </td>
                    </tr>
                </template>
            </CartOverview>
          </div>
        </article>

        <article class="message">
          <div class="message-body">
            <button class="button is-info is-fullwidth is-medium" :disabled="empty || submitting" @click.prevent="order">
              Place order
            </button>
          </div>
        </article>
      </div>
      <div class="column is-one-quarter">
        <article class="message">
          <div class="message-body">
            <button class="button is-info is-fullwidth is-medium" :disabled="empty || submitting" @click.prevent="order">
              Place order
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import CartOverview from '@/components/cart/CartOverview'
import ShippingAddress from '@/components/checkout/addresses/ShippingAddress'

export default {
  components: {
      CartOverview,
      ShippingAddress
  },

  data() {
    return {
      submitting: false,
      addresses: [],
      shippingMethods: [],
      form: {
        address_id: null,
      }
    }
  },

  watch: {
    'form.address_id' (addressId) {
      this.getShippingMethodsForAddress(addressId).then(() => {
        this.setShipping(this.shippingMethods[0])
      })
    },

    shippingMethodId () {
      this.getCart()
    }
  },

  computed: {
      ...mapGetters({
          total: 'cart/total',
          count: 'cart/count',
          empty: 'cart/empty',
          changed: 'cart/changed',
          shipping: 'cart/shipping'
      }),

      shippingMethodId: {
        get () {
          return this.shipping ? this.shipping.id : ''
        },
        set (shippingMethodId) {
          this.setShipping(
            this.shippingMethods.find(s => s.id === shippingMethodId) // {}
          )
        }
      }
  },

  async asyncData ({ app }) {
    let addresses = await app.$axios.$get('api/address')

    return {
      addresses: addresses.data
    }
  },

  methods: {
    ...mapActions({
      setShipping: 'cart/setShipping',
      getCart: 'cart/getCart',
      flash: 'alert/flash'
    }),

    async order() {
      this.submitting = true

      try {
        await this.$axios.$post('api/orders', {
          ...this.form,
          shipping_method_id: this.shippingMethodId
        })

        await this.getCart()

        this.flash('Order placed')

        this.$router.replace({
          name: 'orders'
        })
      } catch (e) {
        this.flash(e.response.data.message)          
        await this.getCart()
      }
      this.submitting = false
    },

    async getShippingMethodsForAddress(addressId) {
      let response = await this.$axios.$get(`api/addresses/${addressId}/shipping`)

      this.shippingMethods = response.data

      return response
    }
  }
}
</script>