import { NS } from '../NetscriptDefinitions';
import { purchaseServers, purchasedServersCost, purchasedServersUpgradeCost, upgradePurchasedServers } from "./pserv-utils";

export async function main(ns: NS) {
    const answer = "" + await ns.prompt("What would you like to do?", { 
        type: "select",
        choices: ["Purchase servers", "Upgrade servers"] 
    });
    
    if (answer === "Purchase servers") {
        const ram = +await ns.prompt("How much RAM should the servers have?", { type: "text" });
        const amount = +await ns.prompt("How many servers would you like to purchase?", { type: "text" });

        const maxRam = ns.getPurchasedServerMaxRam();
        if (ram > maxRam) {
            ns.tprint("WARN: You can't purchase " + ram + "GB RAM servers! (" + maxRam);
            return;
        }

        const pservsSlotsLeft = ns.getPurchasedServerLimit() - ns.getPurchasedServers().length;
        if (amount > pservsSlotsLeft) {
            ns.tprint("WARN: You can't purchase " + amount + " servers! (" + pservsSlotsLeft + ")");
            return;
        }

        const cost = purchasedServersCost(ns, ram, amount);
        if (ns.getServerMoneyAvailable("home") < cost) {
            ns.tprint("WARN: You don't have enough money to buy " + amount + " servers with " + ram + " GB of RAM! (" + cost + ")")
            return;
        }

        purchaseServers(ns, ram, amount);
    } else if ("Upgrade servers") {
        const ram = +await ns.prompt("With how much RAM should the servers be upgraded with?", { type: "text" });
        const pservs = ns.getPurchasedServers();

        const cost = purchasedServersUpgradeCost(ns, ram, pservs);
        if (ns.getServerMoneyAvailable("home") < cost) {
            ns.tprint("WARN: You don't have enough money to upgrade " + pservs.length + " servers to " + ram + " GB of RAM! (" + cost + ")")
            return;
        }

        upgradePurchasedServers(ns, ram, pservs);
    }
}