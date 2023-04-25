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
 * @param {NS} ns - The Netscript API.
 * @param {number} ram - The size of the server to purchase.
 * @param {number} amount - The number of servers to purchase.
 */
function purchaseServers(ns: NS, ram: number, amount: number): void {
    for (let i = 0; i < amount; i++) {
        ns.purchaseServer("pserv", ram);
    }
}

/** 
 * Upgraded a list of purchased servers by a certain amount of ram.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {number} ram - The size to upgrade servers by.
 * @param {string[]} pservs - The list of the purchased servers to upgrade.
 */
function upgradePurchasedServers(ns:NS, ram: number, pservs: string[]): void {
    for (let i = 0; i < pservs.length; i++) {
        ns.upgradePurchasedServer(pservs[i], ram)
    }
}

/**
 * 
 * @param {NS} ns - The Netscript API.
 * @param {number} ram - The size of the servers to check the cost of.
 * @param {number} amount - The number of servers to check the price for.
 * @returns {number} The cost to purchase the servers.
 */
function purchasedServersCost(ns: NS, ram: number, amount: number): number {
    return ns.getPurchasedServerCost(ram) * amount;
}

/**
 * 
 * @param {NS} ns - The Netscript API.
 * @param {number} ram - The size of the purchased servers to check the cost of.
 * @param {number} pservs - The list of purchased servers to check to price for.
 * @returns {number} The cost to uprade the purchased servers.
 */
function purchasedServersUpgradeCost(ns: NS, ram: number, pservs: string[]): number {
    let cost = 0;
    for (let i = 0; i < pservs.length; i++) {
        cost += ns.getPurchasedServerUpgradeCost(pservs[i], ram);
    }

    return cost;
}