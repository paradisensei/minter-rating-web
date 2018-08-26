import axios from 'axios'
import {NODE_API_MAINNET_URL, NODE_API_TESTNET_URL} from "~/assets/variables";

export let mainnet = axios.create({
    baseURL: `${NODE_API_MAINNET_URL}/api/`,
});

export let testnet = axios.create({
    baseURL: `${NODE_API_TESTNET_URL}/api/`,
});
