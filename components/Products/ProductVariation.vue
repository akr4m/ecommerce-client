<template>
    <div class="field">
        <label :for="type" class="label">{{ type }}</label>
        <div class="controle">
            <div class="select is-fullwidth">
                <select :value="selectedVariationId" @change="changed($event, type)">
                    <option value="">Please choose</option>
                    <option
                        v-for="variation in variations"
                        :key="variation.id"
                        :value="variation.id"
                        :disabled="!variation.in_stock"
                    >
                        {{ variation.name }}
                        <template v-if="variation.price_varies">
                            ({{ variation.price }})
                        </template>

                        <template v-if="!variation.in_stock">
                            (Out of stock)
                        </template>
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            required: true,
            type: String
        },

        variations: {
            required: true,
            type: Object/Array
        },

        value: {
            required: false,
            default: ''
        }
    },

    methods: {
        async changed (event, type) {
            this.$emit('input', this.findvariation(event.target.value))
        },

        findvariation (id) {
            let variation = this.variations.find(v => v.id == id)

            if (typeof variation === 'undefined') {
                return null
            }

            return variation
        }
    },

    computed: {
        selectedVariationId() {
            if (!this.findvariation(this.value.id)) {
                return ''
            }

            return this.value.id;
        }
    }
}
</script>