<template>
    <article class="message">
        <div class="message-body">
            <h1 class="title is-5">Ship to</h1>

            <template v-if="selecting">
                <ShippingAddressSelector :addresses="addresses" :selectedAddress="selectedAddress" @ship="addressSelected" />
            </template>

            <template v-else-if="creating">
                <ShippingAddressCreator @cancel="creating = false" @created="created" />
            </template>
            
            <template v-else>
                <p v-if="selectedAddress">
                    <strong v-if="selectedAddress.label">{{ selectedAddress.label }}:</strong><br>
                    {{ selectedAddress.name }}<br>
                    {{ selectedAddress.address_l }}<br>
                    {{ selectedAddress.city }} {{ selectedAddress.postal_code }}<br>
                    {{ selectedAddress.area.name }}
                </p>
                <div class="field is-grouped">
                    <p class="control">
                        <a href="#" class="button is-info" @click.prevent="selecting = true">Change shipping address</a>
                    </p>
                    <p class="control">
                        <a href="#" class="button is-info" @click.prevent="creating = true">Add shipping address</a>
                    </p>
                </div>
            </template>
        </div>
    </article>
</template>

<script>
import ShippingAddressSelector from './ShippingAddressSelector'
import ShippingAddressCreator from './ShippingAddressCreator'

export default {
    components: {
        ShippingAddressSelector,
        ShippingAddressCreator
    },

    data() {
        return {
            selecting: false,
            creating: false,
            localAddress: this.addresses,
            selectedAddress: null
        }
    },

    props: {
        addresses: {
            required: true,
            type: Array
        }
    },

    watch: {
      selectedAddress (address) {
        this.$emit('input', address.id)
      }
    },

    methods: {
        addressSelected (address) {
            this.switchAddress(address)
            this.selecting = false
        },

        switchAddress (address) {
            this.selectedAddress = address
        },

        created(address) {
            this.localAddress.push(address)
            this.creating = false

            this.switchAddress(address)
        }
    },

    created() {
        if (this.addresses.length) {
            let defaultAddress = this.defaultAddress ? this.defaultAddress : this.addresses[0]    
            this.switchAddress(defaultAddress)
        }
    },

    computed: {
        defaultAddress () {
            // return this.localAddress.find((address) => {
            //     return address.default = true
            // })

            return this.localAddress.find(a => a.default === true)
        }
    }
}
</script>