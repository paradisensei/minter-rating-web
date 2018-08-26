import {mainnet, testnet} from '~/api/axios';
import {MAINNET, DECIMALS} from "~/assets/variables";
import {getTimeDistance, shortFilter} from "~/assets/utils";

export function getNodes(type) {
    const axios = type === MAINNET ? mainnet : testnet;
    let nodes;
    let nodes_total_stake = 0;
    return axios.get('validators')
        .then(response => {
            // filter out inactive nodes
            nodes = response.data.result.filter(n => n.candidate.status === 2);
            // calculate total stake of all active nodes
            nodes.forEach(n => {
                nodes_total_stake += n.candidate.total_stake / 10**DECIMALS;
            });
            return Promise.all(
                nodes.map(n => axios.get('block/' + n.candidate.created_at_block))
            );
        })
        .then(responses => {
            return nodes
                .map((n, i) => {
                    const pub_key = n.candidate.pub_key;
                    const total_stake = n.candidate.total_stake / 10**DECIMALS;
                    const voting_power = total_stake / nodes_total_stake * 100;
                    const block = responses[i].data.result;
                    const age = new Date(block.time);
                    return {
                        pub_key,
                        display_pub_key: shortFilter(pub_key),
                        voting_power,
                        reward: n.accumulated_reward / 10**DECIMALS,
                        uptime: 100 - n.absent_times / 12,
                        commission: n.candidate.commission,
                        delegated_stakes: n.candidate.stakes.length - 1,
                        age,
                        display_age: getTimeDistance(age),
                        created_at: block.height
                    }
                })
                .sort(compare)
        })
}

const compare = (n1, n2) => {
    if (n1.voting_power === n2.voting_power) {
        if (n1.delegated_stakes === n2.delegated_stakes) {
            if (n1.reward === n2.reward) {
                if (n1.age === n2.age) {
                    if (n1.commission === n2.commission) {
                        return n2.uptime - n1.uptime
                    } else {
                        return n1.commission - n2.commission;
                    }
                } else {
                    return n1.age - n2.age;
                }
            } else {
                return n2.reward - n1.reward;
            }
        } else {
            return n2.delegated_stakes - n1.delegated_stakes;
        }
    } else {
        return n2.voting_power - n1.voting_power;
    }
};