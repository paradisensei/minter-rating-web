<script>
    import {getTitle, roundMoney} from '~/assets/utils';
    import BackButton from '~/components/BackButton';
    import {getNodeProfile} from "~/api";

    export default {
        components: {
            BackButton,
        },
        filters: {
            number: roundMoney,
            pretty: (num) => Math.round(num)
        },
        asyncData({ params, error }) {
            return getNodeProfile(params.pubKey);
        },
        head() {
            const title = getTitle('Profile');

            return {
                title: title,
                meta: [
                    { hid: 'og-title', name: 'og:title', content: title },
                ],
            }
        }
    }
</script>

<template>
    <div>
        <b-card>
            <p class="card-text">
                Any suggestions regarding node profile page are highly appreciated.
            </p>
        </b-card>
        <section class="panel u-section">
            <div class="panel__section panel__header">
                <h1 class="panel__header-title panel__title">
                    <BackButton/>
                    Node profile
                </h1>
            </div>
            <dl>
                <dt>Address</dt>
                <dd class="u-select-all">
                    <a :href="'https://testnet.explorer.minter.network/address/' + address"
                       target="_blank" class="link--default">
                        {{ address }}
                    </a>
                </dd>
                <dt>Public key</dt>
                <dd class="u-select-all">
                    <a :href="'https://testnet.explorer.minter.network/validator/' + pubKey"
                       target="_blank" class="link--default">
                        {{ pubKey }}
                    </a>
                </dd>
                <dt>Total stake</dt>
                <dd class="u-select-all">
                    {{totalStake | pretty}} MNT
                </dd>
                <dt>Own stake</dt>
                <dd class="u-select-all">
                    {{own_stake | pretty}} MNT ({{own_stake_perc | number}}% of total stake)
                </dd>
                <dt>Delegated stake</dt>
                <dd class="u-select-all">
                    {{delegated_stake | pretty}} MNT ({{delegated_stake_perc | number}}% of total stake)
                </dd>
            </dl>
        </section>
    </div>
</template>
