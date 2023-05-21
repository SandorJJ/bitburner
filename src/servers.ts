import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {
    const answer = await ns.prompt("What would you like to do?", { 
        type: "select" ,
        choices: ["Purchase servers", "Upgrade servers", "Cost to purchase servers", "Cost to upgrade servers"]
    });

    const ram = +await ns.prompt("RAM of servers?", {
        type: "select",
        choices: ["2", "4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048", "4096", "8192"]
    });

    const count = +await ns.prompt("Number of servers?", { type: "text" });

    switch (answer) {
        case "Purchase servers": {
            
        }
        case "Upgrade servers": {

        }
        case "Cost to purchase servers": {

        }
        case "Cost to upgrade servers": {

        }
    }


}

/**
 * Purchase a certain number of servers of a certain RAM amount.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {number} ram - The size of the server to purchase.
 * @param {number} amount - The number of servers to purchase.
 */
export function purchaseServers(ns: NS, ram: number, amount: number): void {
    for (let i = 0; i < amount; i++) {
        ns.purchaseServer("pserv", ram);
    }
}

/** 
 * Upgraded a list of purchased servers by a certain amount of RAM.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {number} ram - The size to upgrade servers by.
 * @param {string[]} pservs - The list of the purchased servers to upgrade.
 */
export function upgradePurchasedServers(ns:NS, ram: number, pservs: string[]): void {
    for (let i = 0; i < pservs.length; i++) {
        ns.upgradePurchasedServer(pservs[i], ram);
    }
}

/**
 * Returns the cost of buying purchased servers of a certain RAM.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {number} ram - The size of the servers to check the cost of.
 * @param {number} amount - The number of servers to check the price for.
 * @returns {number} The cost to purchase the servers.
 */
export function purchasedServersCost(ns: NS, ram: number, amount: number): number {
    return ns.getPurchasedServerCost(ram) * amount;
}

/**
 * Returns the cost of upgrading purchased servers to a certain RAM.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {number} ram - The size of the purchased servers to check the cost of.
 * @param {number} pservs - The list of purchased servers to check to price for.
 * @returns {number} The cost to uprade the purchased servers.
 */
export function purchasedServersUpgradeCost(ns: NS, ram: number, pservs: string[]): number {
    let cost = 0;
    for (let i = 0; i < pservs.length; i++) {
        cost += ns.getPurchasedServerUpgradeCost(pservs[i], ram);
    }

    return cost;
}