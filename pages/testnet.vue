<script>
    import PageMixin from '~/components/PageMixin';
    import Rating from '~/components/Rating';
    import {TESTNET} from "~/assets/variables";

    export default {
        components: {
            Rating: Rating,
        },
        mixins: [
            PageMixin,
        ],
        head() {
            const title = 'Minter Testnet Rating';

            return {
                title: title,
                meta: [
                    { hid: 'og-title', name: 'og:title', content: title },
                ],
            }
        },
        data() {
            return {
                network: TESTNET,
            }
        }
    }
</script>

<template>
    <Rating :nodes="nodes" :network="network" v-if="nodes"/>
    <h1 class="u-text-center" style="margin-top: 50px" v-else-if="!isDataLoading">Testnet Rating is not available</h1>
</template>
