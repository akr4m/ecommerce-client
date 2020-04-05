<template>
    <select @change="changed">
        <option value="">Please select</option>
        <option :value="area.id" v-for="area in areas" :key="area.id">
            {{ area.name }}
        </option>
    </select>
</template>

<script>
export default {
    data() {
        return {
            areas: []
        }
    },

    created() {
        this.getAreas()
    },

    methods: {
        async getAreas() {
            let response = await this.$axios.$get('api/areas')

            this.areas = response.data
        },

        async changed($event) {
            this.$emit('input', $event.target.value)
        }
    }
}
</script>