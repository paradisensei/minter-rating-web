<script>
    import PageMixin from '~/components/PageMixin';
    import Rating from '~/components/Rating';
    import {MAINNET} from "~/assets/variables";

    export default {
        components: {
            Rating: Rating,
        },
        mixins: [
            PageMixin,
        ],
        data() {
            return {
                network: MAINNET,
            }
        }
    }
</script>

<template>
    <Rating :nodes="nodes" :network="network" v-if="nodes"/>
    <h1 class="u-text-center" style="margin-top: 50px" v-else-if="!isDataLoading">Mainnet is not launched yet</h1>
</template>
