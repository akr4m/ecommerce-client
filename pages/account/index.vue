<template>
    <div>
        {{ user }}
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: ''
        }
    },

    async asyncData({ params, app }) {
        let response = await app.$axios.$get(`api/user`)

        return {
            user: response
        }
    }
}
</script>