import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {
    const ram = await ns.prompt("What size servers would you like to purchase?", { type: "text" });
    const amount = await ns.prompt("How many servers would you like to purchase?", { type: "text" });

    const playerMoney = ns.getServerMoneyAvailable("home");
    const costOfServers = (ns.getPurchasedServerCost(+ram) * +amount)
    if (playerMoney < costOfServers) {
        ns.tprint("WARN: You cannot afford to purchase the servers! (" + playerMoney + " < " + costOfServers + ")");
    } else {
        purchaseServers(ns, +ram, +amount);
    }
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