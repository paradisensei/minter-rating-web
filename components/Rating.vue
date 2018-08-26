<script>
    import {MAINNET, MAINNET_COIN_NAME, TESTNET_COIN_NAME} from "~/assets/variables";
    import {thousandsFilter, roundMoney, roundUp} from "~/assets/utils";

    export default {
        filters: {
            thousands: thousandsFilter,
            number: roundMoney,
            roundUp,
        },
        props: {
            network: {
                type: String,
                required: true,
            },
            nodes: {
                type: Array,
                required: true,
            },
        },
        data () {
            const coinName = this.network === MAINNET ? MAINNET_COIN_NAME : TESTNET_COIN_NAME;
            return {
                fields: [
                    { key: 'display_pub_key', label: 'Public key' },
                    { key: 'total_stake', label: `Total stake (${coinName})` },
                    { key: 'reward', label: `Accumulated reward (${coinName})`},
                    { key: 'delegates', label: 'Delegates' },
                    { key: 'uptime', label: 'Uptime (%)' },
                    { key: 'display_age', label: 'Age' }
                ]
            }
        }
    }
</script>

<template>
    <div>
        <b-table striped hover :fields="fields" :items="nodes">
            <template slot="display_pub_key" slot-scope="data">
                <b-link :href="'https://testnet.explorer.minter.network/validator/' + data.item.pub_key">
                    {{data.item.display_pub_key}}
                </b-link>
            </template>
        </b-table>

    </div>
    <!--<div class="u-grid u-grid&#45;&#45;vertical-margin">-->
        <!--<section class="u-cell u-cell&#45;&#45;medium&#45;&#45;1-2">-->
            <!--<div class="index-stats panel panel__section">-->
                <!--<div class="u-grid u-grid&#45;&#45;vertical-margin">-->
                    <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                        <!--<div class="index-stats__name">Status</div>-->
                        <!--<div class="index-stats__value index-stats__value&#45;&#45;primary" :class=" stats.status === 'updating' ? 'index-stats__yellow' : stats.status === 'active' ? 'index-stats__green' : 'index-stats__red'">-->
                            <!--{{ stats.status }}-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                        <!--<div class="index-stats__name">Uptime</div>-->
                        <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">{{ stats.uptime | number }}%</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</section>-->
        <!--<div class="u-cell u-cell&#45;&#45;medium&#45;&#45;1-2 u-hidden-medium-down"></div>-->
        <!--<section class="u-cell u-cell&#45;&#45;medium&#45;&#45;1-2">-->
            <!--<div class="panel">-->
                <!--<div class="panel__section panel__header">-->
                    <!--<h2 class="panel__header-title panel__title">-->
                        <!--<img class="panel__header-title-icon" src="/img/icon-block.svg" width="40" height="40" alt="" role="presentation">-->
                        <!--Blocks-->
                    <!--</h2>-->
                <!--</div>-->
                <!--<div class="panel__section">-->
                    <!--<div class="u-grid u-grid&#45;&#45;vertical-margin">-->
                        <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                            <!--<div class="index-stats__name">Number of blocks</div>-->
                            <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">{{ stats.numberOfBlocks | thousands }}</div>-->
                        <!--</div>-->
                        <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                            <!--<div class="index-stats__name">Speed of blocks (24h)</div>-->
                            <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">{{ stats.blockSpeed24h | number }}s</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</section>-->
        <!--<section class="u-cell u-cell&#45;&#45;medium&#45;&#45;1-2">-->
            <!--<div class="panel">-->
                <!--<div class="panel__section panel__header">-->
                    <!--<h2 class="panel__header-title panel__title">-->
                        <!--<img class="panel__header-title-icon" src="/img/icon-transaction.svg" width="40" height="40" alt="" role="presentation">-->
                        <!--Transactions-->
                    <!--</h2>-->
                <!--</div>-->
                <!--<div class="panel__section">-->
                    <!--<div class="u-grid u-grid&#45;&#45;vertical-margin">-->
                        <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                            <!--<div class="index-stats__name"># of transactions (24h)</div>-->
                            <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">{{ stats.tx24hCount | thousands }}</div>-->
                        <!--</div>-->
                        <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                            <!--<div class="index-stats__name"># per second (24h)</div>-->
                            <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">{{ stats.txPerSecond | number }}</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</section>-->

        <!--<section class="u-cell u-cell&#45;&#45;medium&#45;&#45;1-2">-->
            <!--<div class="panel">-->
                <!--<div class="panel__section panel__header">-->
                    <!--<h2 class="panel__header-title panel__title">-->
                        <!--<img class="panel__header-title-icon" src="/img/icon-validator.svg" width="40" height="40" alt="" role="presentation">-->
                        <!--Validators-->
                    <!--</h2>-->
                <!--</div>-->
                <!--<div class="panel__section">-->
                    <!--<div class="u-grid u-grid&#45;&#45;vertical-margin">-->
                        <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                            <!--<div class="index-stats__name">Active validators</div>-->
                            <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">{{ stats.activeValidators }}</div>-->
                        <!--</div>-->
                        <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                            <!--<div class="index-stats__name">Total # of validators</div>-->
                            <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">{{ stats.totalValidatorsCount }}</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</section>-->
        <!--<section class="u-cell u-cell&#45;&#45;medium&#45;&#45;1-2">-->
            <!--<div class="panel">-->
                <!--<div class="panel__section panel__header">-->
                    <!--<h2 class="panel__header-title panel__title">-->
                        <!--<img class="panel__header-title-icon" src="/img/icon-commission.svg" width="40" height="40" alt="" role="presentation">-->
                        <!--Commission-->
                    <!--</h2>-->
                <!--</div>-->
                <!--<div class="panel__section">-->
                    <!--<div class="u-grid u-grid&#45;&#45;vertical-margin">-->
                        <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                            <!--<div class="index-stats__name">Average per transaction (24h)</div>-->
                            <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">-->
                                <!--<span class="index-stats__value-text">{{ stats.averageTxCommission | roundUp | number }}</span>-->
                                <!--<span class="index-stats__sub-value">{{ coinName }}</span>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="u-cell u-cell&#45;&#45;1-2">-->
                            <!--<div class="index-stats__name">Total commission (24h)</div>-->
                            <!--<div class="index-stats__value index-stats__value&#45;&#45;primary">-->
                                <!--<span class="index-stats__value-text">{{ stats.totalCommission | roundUp | number | thousands }}</span>-->
                                <!--<span class="index-stats__sub-value">{{ coinName }}</span>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</section>-->
    <!--</div>-->
</template>