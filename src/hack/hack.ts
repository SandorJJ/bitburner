import { NS } from "../../NetscriptDefinitions";
import { YELLOW, RESET } from "../random/style";

export async function main(ns: NS) {
    if (ns.args.length != 1) {
        ns.tprintf(`${YELLOW}Wrong number of arguments entered!${RESET}`);
        ns.tprintf("Hack.ts: weakens, grows, and hacks a target forever.\n" +
                   "Usage: hack.ts target\n" +
                   "target        the server to grow, weaken, and hack")
        return;
    }
    
    const target = String(ns.args[1]);
    try {
        ns.getServerMinSecurityLevel(target);
    } catch (error) {
        ns.tprintf(`${YELLOW}Invalid target entered!${RESET}`);
        return;
    }

    const securityThreshold = ns.getServerMinSecurityLevel(target) * 1.1;
    const moneyThreshold = ns.getServerMaxMoney(target) * 0.90;

    while (true) {
        if (securityThreshold < ns.getServerSecurityLevel(target)) {
            await ns.weaken(target);
        } else if (moneyThreshold > ns.getServerMoneyAvailable(target)) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}
