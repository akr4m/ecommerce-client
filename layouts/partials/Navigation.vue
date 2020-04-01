<template>
    <nav class="navbar is-white">
        <div class="container">
            <div class="navbar-brand">
                <nuxt-link :to="{ name: 'index' }" class="navbar-item">
                    cart
                </nuxt-link>
                <div class="navbar-burger burger" data-target="nav">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="navbar-menu">
                <template v-for="category in categories">
                    <template v-if="category.children.length">
                        <div 
                            :key="category.id"
                            class="navbar-item is-hoverable has-dropdown"
                        >
                            <nuxt-link
                                :to="{ name: 'categories-slug', params: { slug: category.slug } }"
                                class="navbar-link"
                            >
                                {{ category.name }}
                            </nuxt-link>
                            <div 
                                class="navbar-dropdown"
                            >
                                <nuxt-link
                                    class="navbar-item"
                                    v-for="child in category.children"
                                    :key="child.slug"
                                    :to="{ name: 'categories-slug', params: { slug: child.slug } }"
                                >
                                    {{ child.name }}
                                </nuxt-link>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <nuxt-link 
                            :key="category.id" 
                            class="navbar-item" 
                            :to="{ name: 'categories-slug', params: { slug: category.slug } }"
                        >
                            {{ category.name }}
                        </nuxt-link>
                    </template>
                </template>
            </div>

            <div id="nav" class="navbar-menu">
                <template v-if="$auth.loggedIn">
                    <div class="navbar-end">
                        <nuxt-link :to="{ name: 'account' }" class="navbar-item">
                            {{ $auth.user.name }}
                        </nuxt-link>
                        <a href="#" class="navbar-item" @click.prevent="signOut">
                            Sign out
                        </a>
                    </div>
                </template>
                <div class="navbar-end" v-else>
                    <nuxt-link :to="{ name: 'auth-login' }" class="navbar-item">
                        Sign in
                    </nuxt-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            categories: 'categories'
        })
    },

    methods: {
        async signOut() {
            try {
                await this.$auth.logout()

                this.$router.replace({ name: 'index' })
            } catch (e) {
                
            }
        }
    }
}
</script>