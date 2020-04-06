<template>
  <div>
    <TheAlert />
    <Navigation />
    <nuxt />
  </div>
</template>

<script>
import Navigation from '@/layouts/partials/Navigation'
import TheAlert from '@/components/global/TheAlert'

export default {
  components : {
    Navigation,
    TheAlert
  }  
}
</script>