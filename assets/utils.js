import {MAINNET, TESTNET, BASE_TITLE} from "~/assets/variables";
import formatDistanceStrict from 'date-fns/esm/formatDistanceStrict'
import toDate from 'date-fns/esm/toDate';

/**
 * @param {number} num
 * @param {number} [precision=3]
 * @return {string}
 */
export function roundMoney(num, precision = 3) {
    let data = String(num).split(/[eE]/);
    if (data.length === 1) {
        // no E
        return reducePrecision(num).toString();
    }

    let zeros = '';
    let sign = num < 0 ? '-' : '';
    // digits before E
    let digits = data[0].replace('.', '');
    // power
    let mag = Number(data[1]) + 1;

    if (mag < 0) {
        zeros = sign + '0.';
        while (mag++) {
            zeros += '0';
        }
        return zeros + digits.replace(/^\-/,'').substr(0, precision).replace(/0+$/, '');
    } else {
        mag -= digits.length;
        while (mag--) {
            zeros += '0';
        }
        return digits + zeros;
    }
}

/**
 * @param {number} num
 * @return {number}
 */
function reducePrecision(num) {
    if (Math.abs(num) < Math.pow(0.1, 8)) {
        return num
    } else if (Math.abs(num) < Math.pow(0.1, 5)) {
        return round(num, 8);
    } else if (Math.abs(num) < Math.pow(0.1, 3)) {
        return round(num, 6);
    } else {
        return round(num, 4);
    }
}


/**
 * Round to power
 * @param {number} value
 * @param {number} power
 * @return {number}
 */
export function round(value, power) {
    let tenPower = Math.pow(10, power);
    return Math.round(value * tenPower) / tenPower;
}

/**
 * Round up to min value (10^-power)
 * @param {number|string} value
 * @param {number} power
 * @return {number}
 */
export function roundUp(value, power = 8) {
    if (parseFloat(value) === 0) {
        return 0;
    }
    const sign = value >= 0 ? 1 : -1;
    const minValue = Math.pow(10, -power);
    return Math.max(minValue, Math.abs(value)) * sign;

}

export function getNetworkType(route) {
    return route.path.indexOf('/testnet') === 0 ? TESTNET : MAINNET;
}

export function getTimeDistance(timestamp) {
    const distance = formatDistanceStrict(toDate(timestamp), new Date());

    return distance && distance !== 'Invalid Date' ? distance : false;
}

export function shortFilter(value, endLength = 6, minLengthToShort) {
    const startLength = endLength + 'Mx'.length - 1;
    minLengthToShort = minLengthToShort || startLength + endLength;
    value = value.toString();
    const isLong = value.length > minLengthToShort;

    return isLong ? value.substr(0, startLength) + '…' + value.substr(-endLength) : value;
}

export function getTitle(text) {
    return BASE_TITLE + ' | ' + text;
}