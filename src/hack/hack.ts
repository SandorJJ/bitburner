import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    if (ns.args.length === 0) {
        ns.tprintf("WARN: No server entered to hack!");
        return;
    }

    const serverToHack = String(ns.args[0]);
    const securityThreshold = ns.getServerMinSecurityLevel(serverToHack) * 1.1;
    const moneyThreshold = ns.getServerMaxMoney(serverToHack) * 0.90;

    while (true) {
        if (securityThreshold < ns.getServerSecurityLevel(serverToHack)) {
            let securityReduced = await ns.weaken(serverToHack);
            ns.printf(`INFO:\nSecurity reduced: ${securityReduced}`);
        } else if (moneyThreshold > ns.getServerMoneyAvailable(serverToHack)) {
            let moneyIncreased = await ns.grow(serverToHack);
            ns.printf(`WARN:\nMoney increased: ${moneyIncreased}`);
        } else {
            let hackedFor = await ns.hack(serverToHack);
            ns.printf(`ERROR:\nHacked for: ${hackedFor}`);
        }
    }
}
