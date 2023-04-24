import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {

}

/**
 * Purchase a certain number of servers of a certain size.
 * 
 * @param ns - The Netscript API.
 * @param ram - The size of the server to purchase.
 * @param amount - The number of servers to purchase.
 */
function purchaseServers(ns: NS, ram: number, amount: number) {
    for (let i = 0; i < amount; i++) {
        ns.purchaseServer("pserv", ram);
    }
}