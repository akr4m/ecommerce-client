<template>
    <article class="message">
        <div class="message-body">
            <h1 class="title is-5">Payment Method</h1>

            <template v-if="selecting">
                <PaymentMethodSelector :paymentMethods="paymentMethods" :selectedPaymentMethod="selectedPaymentMethod" @click="paymentMethodSelected" />
            </template>

            <template v-else-if="creating">
                ...
            </template>
            
            <template v-else>
                <p v-if="selectedPaymentMethod">
                    {{ selectedPaymentMethod.card_type }} ending {{ selectedPaymentMethod.last_four }}
                </p>
                <div class="field is-grouped">
                    <p class="control">
                        <a href="#" class="button is-info" @click.prevent="selecting = true">Change payment method</a>
                    </p>
                    <p class="control">
                        <a href="#" class="button is-info" @click.prevent="creating = true">Add payment method</a>
                    </p>
                </div>
            </template>
        </div>
    </article>
</template>

<script>
import PaymentMethodSelector from './PaymentMethodSelector'

export default {
    components: {
        PaymentMethodSelector
    },

    data() {
        return {
            selecting: false,
            creating: false,
            localPaymentMethod: this.paymentMethods,
            selectedPaymentMethod: null
        }
    },

    props: {
        paymentMethods: {
            required: true,
            type: Array
        }
    },

    watch: {
      selectedPaymentMethod (paymentMethod) {
        this.$emit('input', paymentMethod.id)
      }
    },

    methods: {
        paymentMethodSelected (paymentMethod) {
            this.switchPaymentMethod(paymentMethod)
            this.selecting = false
        },

        switchPaymentMethod (paymentMethod) {
            this.selectedPaymentMethod = paymentMethod
        },

        created(paymentMethod) {
            this.localPaymentMethod.push(paymentMethod)
            this.creating = false

            this.switchPaymentMethod(paymentMethod)
        }
    },

    created() {
        if (this.paymentMethods.length) {
            let defaultPaymentMethod = this.defaultPaymentMethod ? this.defaultPaymentMethod : this.paymentMethods[0]    
            this.switchPaymentMethod(defaultPaymentMethod)
        }
    },

    computed: {
        defaultPaymentMethod() {
            return this.localPaymentMethod.find(pm => pm.default === true)
        }
    }
}
</script>