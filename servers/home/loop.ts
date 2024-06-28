/**
 * loop.ts
 * -------
 * Continuously loops grow, weaken, and hack.
 */

import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    const target = ns.args[0].toString();
    const moneyThreshold = ns.getServerMaxMoney(target) * 0.9;
    const securityThreshold = ns.getServerMinSecurityLevel(target) * 1.1;

    while (true) {
        if (ns.getServerMoneyAvailable(target) < moneyThreshold) {
            ns.print("WARN");
            await ns.grow(target);
        } else if (ns.getServerSecurityLevel(target) > securityThreshold) {
            ns.print("INFO");
            await ns.weaken(target);
        } else {
            ns.print("ERROR");
            await ns.hack(target);
        }
    }
}
