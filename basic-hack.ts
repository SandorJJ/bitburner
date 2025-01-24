import { NS } from "../../NetscriptDefinitions";

/** 
* @param {NS} ns 
*/
export async function main(ns: NS) {
    const target = String(ns.args[0]);
    const moneyThreshold = ns.getServerMaxMoney(target) * 0.9;
    const securityThreshold = ns.getServerSecurityLevel(target) * 1.1;

    while (true) {
        if (moneyThreshold > ns.getServerMoneyAvailable(target)) {
            await ns.grow(target);
        } else if (securityThreshold < ns.getServerSecurityLevel(target)) {
            await ns.weaken(target);
        } else {
            await ns.hack(target);
        }
    }
}
