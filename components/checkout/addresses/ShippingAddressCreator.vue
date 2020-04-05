<template>
<form action="#" @submit.prevent="store">
  <div class="field">
    <label class="label">Label</label>
    <div class="control">
      <input class="input" type="text" v-model="form.label">
    </div>
  </div>
  <div class="field">
    <label class="label">Name</label>
    <div class="control">
      <input class="input" type="text" v-model="form.name">
    </div>
  </div>

  <div class="field">
    <label class="label">Address line 1</label>
    <div class="control">
      <textarea class="textarea" placeholder="e.g. 76 AK Khandakar Rd" v-model="form.address_l"></textarea>
    </div>
  </div>

  <div class="field">
    <label class="label">City</label>
    <div class="control">
      <input class="input" type="text" v-model="form.city">
    </div>
  </div>

  <div class="columns">
    <div class="column is-6">
      <div class="field">
        <label class="label">Postal code</label>
        <div class="control">
          <input class="input" type="text" v-model="form.postal_code">
        </div>
      </div>
    </div>
    <div class="column is-6">
      <div class="field">
        <label class="label">Country</label>
        <div class="control">
            <div class="select is-fullwidth">
                <AreaDropdown v-model="form.area_id" />
            </div>
        </div>
      </div>
    </div>
  </div>

  <div class="field">
    <p class="control">
      <button class="button is-info">
        Add address
      </button>
      <a href="#" class="button is-text" @click.prevent="$emit('cancel')">Cancel</a>
    </p>
  </div>
</form>
</template>

<script>
import AreaDropdown from '@/components/form/AreaDropdown'

export default {
    data () {
      return {
        form: {
          label: '',
          name: '',
          address_1: '',
          city: '',
          postal_code: '',
          area_id: '',
          default: true
        }
      }
    },

    components: {
        AreaDropdown
    },

    methods: {
      async store () {
        let response = await this.$axios.$post('api/address', this.form)

        this.$emit('created', response.data)
      }
    }
}
</script>