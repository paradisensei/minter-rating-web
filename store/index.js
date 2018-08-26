import Vuex from 'vuex';
import {testnet as axios} from '~/api/axios';

export default function createStore () {
    return new Vuex.Store({
        state: {
            block_timestamp: {}
        },
        mutations: {
            update (state, height) {
                return axios.get('block/' + height)
                    .then(response => {
                        const block = response.data.result;
                        state.block_timestamp[block.height] = block.time;
                        console.log('Update state with block', height);
                        return block.time;
                    });
            }
        }
    })
}
