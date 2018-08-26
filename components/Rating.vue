<script>
    import {MAINNET, MAINNET_COIN_NAME, TESTNET_COIN_NAME} from "~/assets/variables";
    import {roundMoney, roundUp} from "~/assets/utils";
    import TableLink from '~/components/TableLink'

    export default {
        components: {TableLink},
        filters: {
            number: roundMoney,
            pretty: (num) => Math.round(num)
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
            return {
                fields: [
                    { key: 'index', label: 'Rating' },
                    { key: 'display_pub_key', label: 'Public key' },
                    { key: 'voting_power', label: 'Voting power' },
                    { key: 'delegated_stakes', label: 'Delegated stakes' },
                    { key: 'reward', label: 'Accumulated reward'},
                    { key: 'display_age', label: 'Age' },
                    { key: 'commission', label: 'Commission' },
                    { key: 'uptime', label: 'Uptime' }
                ]
            }
        }
    }
</script>

<template>
    <div>
        <b-card title="Explainer"
                sub-title="Rating criteria by priority from highest to lowest">
            <div>
                <b>Voting power (%)</b> = <i>current node's total stake</i> <b>/</b> <i>all active nodes' total stake</i>
                <br>
                <b>Delegated stakes</b> = number of stakes delegated to current node by different token holders
                <br>
                <b>Accumulated reward (MNT)</b> = reward waiting to be sent to current node and its delegators within 12 blocks
                <br>
                <b>Age</b> = time passed since current node has declared its candidacy
                <br>
                <b>Commission (%)</b> = commission for delegators
                <br>
                <b>Uptime (%)</b> = 100% - (<i>number of blocks missed by current node</i> <b>/</b> <i>maximum number of missed blocks until stake slash</i>)
            </div>
        </b-card>
        <b-table responsive :fields="fields" :items="nodes">
            <template slot="index" slot-scope="data">
                <TableLink :link-text="(data.index + 1)"
                           :link-path="'nodes/' + data.item.pub_key"/>
            </template>
            <template slot="display_pub_key" slot-scope="data">
                <a :href="'https://testnet.explorer.minter.network/validator/' + data.item.pub_key"
                   target="_blank" class="link--default">
                    {{ data.value }}
                </a>
            </template>
            <template slot="voting_power" slot-scope="data">
                {{data.value | number}}%
            </template>
            <template slot="reward" slot-scope="data">
                {{data.value | pretty}} MNT
            </template>
            <template slot="display_age" slot-scope="data">
                <a :href="'https://testnet.explorer.minter.network/blocks/' + data.item.created_at"
                   target="_blank" class="link--default">
                    {{ data.value }}
                </a>
            </template>
            <template slot="uptime" slot-scope="data">
                {{data.value | number}}%
            </template>
            <template slot="commission" slot-scope="data">
                {{data.value | number}}%
            </template>
        </b-table>
    </div>
</template>
