import { NS } from "../../NetscriptDefinitions";
import { getServers } from "../server/network";

const REQUIRED_HACKING_DIVIDER = 2;

export async function main(ns: NS) {
    ns.tprintf(getTarget(ns));
}

/**
* Finds the best target to hack.
* @param {NS} ns - The Netscript API.
* @returns {string} Returns the target.
*/
export function getTarget(ns: NS): string {
    const hackableServers = getServers(ns)
        .filter((server) => server !== "home")
        .filter((server) => !ns.getServer(server).purchasedByPlayer)
        .filter((server) => (ns.getPlayer().skills.hacking / REQUIRED_HACKING_DIVIDER) >= ns.getServerRequiredHackingLevel(server))
        .filter((server) => ns.hasRootAccess(server));
    
    let target = hackableServers[0];
    hackableServers.forEach((server) => {
        if ((ns.getServerMaxMoney(server) / ns.getServerMinSecurityLevel(server)) > ns.getServerMaxMoney(target) / ns.getServerMinSecurityLevel(target)) {
            target = server;
        }
    });
    
    if (target === undefined) {
        target = "n00dles";
    }

    return target;
}
