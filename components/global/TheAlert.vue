<template>
    <div class="alert notification is-info" v-if="message" @click.prevent="clear">
        {{ message }}
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            message: 'alert/message'
        })
    },

    methods: {
        ...mapActions({
            clear: 'alert/clear'
        })
    }
}
</script>

<style>
    .alert {
        border-radius:0;
    }
</style>