<script>
    import {getTitle} from '~/assets/utils';
    import BackButton from '~/components/BackButton';

    export default {
        components: {
            BackButton,
        },
        filters: {
        },
        asyncData({ params, error }) {
            return {
                pubKey: params.pubKey,
                link: `https://testnet.explorer.minter.network/validator/${params.pubKey}`
            };
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
        <b-card title="Coming soon"
                sub-title="Is under development">
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
                <dt>Pub key</dt>
                <dd class="u-select-all">
                    <a :href="link" target="_blank" class="link--default">
                        {{ pubKey }}
                    </a>
                </dd>
            </dl>
        </section>
    </div>
</template>
