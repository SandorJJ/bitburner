import { NS } from "../../NetscriptDefinitions";
import { getServers } from "./network";

export async function main(ns: NS) {
    const script = ns.args[0].toString();
    const target = getTarget(ns);
    const ramUsage = ns.getScriptRam(script);
    const hijackedServers = getServers(ns).filter((server) => ns.hasRootAccess(server));

    hijackedServers.forEach((server) => {
        ns.scp(script, server);
        let threads = Math.floor((ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) / ramUsage);
        if (threads > 0) {
            ns.exec(script, server, threads, target);
        }
    });
}

export function getTarget(ns: NS) {
    const potentialTargets = getServers(ns)
    .filter((server) => ns.getServerMaxMoney(server) > 0)
    .filter((server) => ns.getServerRequiredHackingLevel(server) <= (ns.getHackingLevel() / 3));

    let target = potentialTargets[0];
    potentialTargets.forEach((server) => {
        if (ns.getServerMaxMoney(server) > ns.getServerMaxMoney(target)) {
            target = server;
        }
    });

    return target;
}
