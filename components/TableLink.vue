<script>
    import {shortFilter} from "~/assets/utils";

    export default {
        props: {
            linkText: {
                type: String|Number,
                required: true,
            },
            linkPath: {
                type: String,
                required: true,
            }
        },
        computed: {
            shortText() {
                return shortFilter(this.linkText);
            }
        },
        render(createElement) {
            return createElement(
                'nuxt-link',
                {
                    class: {
                        'table__cell-overflow--middle': true,
                        'link--default': !this.isNotLink,
                    },
                    props: {
                        to: this.linkPath,
                    }
                },
                [
                    this.shortText,
                ]
            )
        }
    }
</script>
