<template>
    <table class="table is-hoverable is-fullwidth">
        <tbody>
            <tr v-for="address in addresses" :key="address.id">
                <td>
                    <p :class="{ 'has-text-weight-bold': address.id === selectedAddress.id }">
                        <strong v-if="address.label">{{ address.label }}:</strong><br>
                        {{ address.name }}<br>
                        {{ address.address_l }}<br>
                        {{ address.city }} {{ address.postal_code }}<br>
                        {{ address.area.name }}
                    </p>
                </td>
                <td>
                    <a href="#" class="button is-info" @click.prevent="$emit('ship', address)">
                        Ship here
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        addresses: {
            required: true,
            type: Array
        },
        selectedAddress: {
            required: true,
            type: Object
        }
    }
}
</script>