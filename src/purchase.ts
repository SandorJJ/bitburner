import { NS } from "../NetscriptDefinitions";

const AMOUNT_MIN = 1;
const AMOUNT_MAX = 25;
const RAM_AMOUNTS = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];

export async function main(ns: NS) {
    if (ns.args.length != 2) {
        ns.tprintf("Wrong number of arguments entered!\n" +
                   `Amount: ${AMOUNT_MIN}-${AMOUNT_MAX}\n` +
                   `Ram: ${RAM_AMOUNTS}`);
        return 1;
    }

    const amount = Number(ns.args[0]);
    if (amount < AMOUNT_MIN || amount > AMOUNT_MAX) {
        ns.tprintf("The amount of servers to purchase is incorrect!\n" +
            `Entered: ${amount}, Expected: ${AMOUNT_MIN}-${AMOUNT_MAX}`);
        return 2;
    } else if (amount + ns.getPurchasedServers().length > AMOUNT_MAX) {
        ns.tprintf(`You cannot buy ${amount} servers because you already have ${ns.getPurchasedServers().length} servers!`);
        return 3;
    }

    const ram = Number(ns.args[1]);
    if (!RAM_AMOUNTS.includes(ram)) {
        ns.tprintf("The RAM of the servers to purchase is incorrect!\n" +
            `Entered: ${ram}, Expected: ${RAM_AMOUNTS}`);
        return 4;
    }
    
    const cost = ns.getPurchasedServerCost(ram) * amount;
    if (cost > ns.getPlayer().money) {
        ns.tprintf(`You cannot afford to buy ${amount} servers with ${ram} RAM!\n` +
                   `Cost: ${cost} > Money: ${Math.floor(ns.getPlayer().money)}`);
    } else {
        for (let i = 0; i < amount; i++) {
            ns.purchaseServer("pserv", ram);
        }
    }
}
