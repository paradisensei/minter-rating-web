<script>
    import {getNodes} from "~/api";
    import {getNetworkType} from "~/assets/utils";

    let timer = null;

    export default {
        asyncData ({ route }) {
            if (process.server) {
                return;
            }
            return getNodes(getNetworkType(route))
                .then((nodes) => ({
                    nodes,
                    isDataLoading: false,
                }))
                .catch((e) => {});
        },
        data() {
            return {
                isDataLoading: true,
                nodes: null,
            }
        },
        beforeMount() {
            if (this.isDataLoading) {
                this.updateData();
            } else {
                this.handleData();
            }
        },
        destroyed() {
            clearTimeout(timer);
        },
        methods: {
            updateData() {
                getNodes(getNetworkType(this.$route))
                    .then((nodes) => {
                        this.nodes = nodes;
                        this.handleData();
                    })
                    .catch(this.handleData);
            },
            handleData() {
                this.isDataLoading = false;
                timer = setTimeout(this.updateData, 5000);
            },
        }
    }
</script>
