<script>
    import footerLinksData from 'minter-footer-links';
    import HeaderMenu from '~/components/HeaderMenu';

    export default {
        footerLinkList: footerLinksData,
        components: {
            HeaderMenu,
        }
    }
</script>

<template>
    <div class="main-wrap">
        <header class="header">
            <div class="header__container u-container">
                <div class="header__logo no-link">
                    <img class="header__logo-image" src="/img/minter-logo-circle.svg" alt="Minter" width="36" height="36">
                    <div class="header__logo-text">Nodes rating</div>
                </div>
                <HeaderMenu class="u-hidden-small-down"/>
            </div>
        </header>
        <HeaderMenu class="u-hidden-small-up"/>

        <main class="main-content u-container">
            <nuxt/>
        </main>

        <footer class="footer">
            <div class="footer__container u-container u-container--large">
                <img class="footer__logo" src="/img/minter-logo-white.svg" alt="Minter" width="190" height="59">
                <div class="footer__menu">
                    <div class="footer__menu-item" v-for="link in $options.footerLinkList" :key="link.slug">
                        <a class="footer__link link--hover" :href="link.url" target="_blank" rel="nofollow noopener">{{ link.title }}</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

