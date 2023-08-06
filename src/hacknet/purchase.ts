import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    if (ns.args.length != 1) {
        ns.tprintf("Wrong number of arguments entered!");
        return 0;
    }

    const amount = Number(ns.args[0]);
    let cost = 0;
    for (let i = 0; i < amount; i++) {
        cost += Math.round(ns.hacknet.getPurchaseNodeCost() * (1.85 ** i));
    }

    if (cost > ns.getPlayer().money) {
        ns.tprintf("You don't have enough money!");
    } else {
        for (let i = 0; i < amount; i++) {
            ns.hacknet.purchaseNode();
        }
    }
}
