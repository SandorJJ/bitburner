import { NS } from "../../NetscriptDefinitions";
import { YELLOW, RESET } from "../random/style";

export async function main(ns: NS) {
    if (ns.args.length != 1 && ns.args.length != 2) {
        ns.tprintf(`${YELLOW}Wrong number of arguments entered!${RESET}`);
        return;
    }
    
    const option = String(ns.args[0]);
    if (option === "-h" || option === "--help") {
        ns.tprintf("Hack.ts: grows, weakens, and hacks a target forever.\n" +
                   "Usage: hack.ts (-h)(-a target)\n" +
                   "-h    --help        displays help information\n" +
                   "-a    --hack        start growing, weakening, and hacking the target")
    } else if (option === "-a" || option === "--hack") {
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
    } else {
        ns.tprintf(`${YELLOW}Invalid usage!${RESET}`);
    }
}
