export const state = () => ({
    products: [],
    count: 0
})

export const getters = {
    products(state) {
        return state.products
    },

    count(state) {
        return state.products.length
    }
}

export const mutations = {
    SET_PRODUCTS (state, products) {
        state.products = products
    }
}

export const actions = {
    async getCart({ commit }) {
        let response = await this.$axios.$get('api/cart')

        commit('SET_PRODUCTS', response.data.products)
        
        return response
    },

    async destroy({ dispatch }, productId) {
        let response = await this.$axios.$delete(`api/cart/${productId}`)

        dispatch('getCart')
    },

    async update({ dispatch }, { productId, quantity }) {
        let response = await this.$axios.$patch(`api/cart/${productId}`, {
            quantity
        })

        dispatch('getCart')
    }
}