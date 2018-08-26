import {mainnet, testnet} from '~/api/axios';
import {MAINNET} from "~/assets/variables";
import {getTimeDistance} from "~/assets/utils";

export function getNodes(type) {
    const axios = type === MAINNET ? mainnet : testnet;
    let nodes;
    return axios.get('validators')
        .then(response => {
            // process active nodes info
            nodes = response.data.result.filter(n => n.candidate.status === 2);
            return Promise.all(
                nodes.map(n => axios.get('block/' + n.candidate.created_at_block))
            );
        })
        .then(responses => {
            return nodes
                .map((n, i) => {
                    const pub_key = n.candidate.pub_key;
                    const display_pub_key =
                        pub_key.substr(0, 5) +
                        '...' +
                        pub_key.substr(pub_key.length - 5, 5);
                    const age = new Date(responses[i].data.result.time);
                    const display_age = getTimeDistance(age);
                    return {
                        pub_key,
                        display_pub_key,
                        reward: n.accumulated_reward / 10**18,
                        uptime: 100 - n.absent_times / 12,
                        absent: n.absent_times,
                        total_stake: n.candidate.total_stake / 10**18,
                        commission: n.candidate.commission,
                        delegates: n.candidate.stakes.length - 1,
                        age,
                        display_age
                    }
                })
                .sort(compare)
        })
}

const compare = (v1, v2) => {
    if (v1.total_stake === v2.total_stake) {
        if (v1.reward === v2.reward) {
            if (v1.delegates === v2.delegates) {
                if (v1.commission === v2.commission) {
                    if (v1.age === v2.age) {
                        return v1.absent - v2.absent
                    } else {
                        return v1.age - v2.age;
                    }
                } else {
                    return v2.commission - v1.commission;
                }
            } else {
                return v2.delegates - v1.delegates;
            }
        } else {
            return v2.reward - v1.reward;
        }
    } else {
        return v2.total_stake - v1.total_stake;
    }
};