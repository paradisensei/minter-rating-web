<script>
    export default {
        methods: {
            goBack() {
                this.$router.push('/testnet');
            }
        },
    }
</script>

<template>
    <button class="u-semantic-button panel__header-title-icon" @click="goBack">
        <img class="u-display-block" src="/img/icon-back.svg" alt="Back">
    </button>
</template>
