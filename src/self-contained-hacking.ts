import { NS } from "../NetscriptDefinitions";

export async function main(ns: NS) {
    const serverToHack = String(ns.args[0]);
    const securityThreshold = ns.getServerMinSecurityLevel(serverToHack) * 1.20;
    const moneyThreshold = ns.getServerMaxMoney(serverToHack) * 0.9;

    if (ns.getServerSecurityLevel(serverToHack) > securityThreshold) {
        ns.weaken(serverToHack);
    } else if (ns.getServerMoneyAvailable(serverToHack) < moneyThreshold) {
        ns.grow(serverToHack);
    } else {
        ns.hack(serverToHack);
    }
}
