import { NS } from "../../NetscriptDefinitions";
import { YELLOW, RESET } from "../random/style";

const AMOUNT_MIN = 1;
const AMOUNT_MAX = 25;
const RAM_AMOUNTS = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];

export async function main(ns: NS) {
    if (ns.args.length != 2) {
        ns.tprintf(`${YELLOW}Wrong number of arguments entered!${RESET}`);
        ns.tprintf("Purchase.ts: Purchases the specified amount of servers with a specified amount of ram.\n" +
                   "Usage: hack.ts amount ram\n" +
                   "amount        the number of servers to purchase\n" + 
                   "ram           the amount of ram for the servers to have")
        return;
    }

    const amount = Number(ns.args[0]);
    const max = AMOUNT_MAX - ns.getPurchasedServers().length;
    if (max === 0) {
        ns.tprintf(`${YELLOW}Cannot purchase more servers!${RESET}\n`);
        return;
    } else if (amount < AMOUNT_MIN || amount > max) {
        ns.tprintf(`${YELLOW}Invalid amount entered!${RESET}\n` +
                   `Entered: ${amount}, Expected: ${AMOUNT_MIN} - ${max}`);
        return;
    }

    const ram = Number(ns.args[1]);
    if (!RAM_AMOUNTS.includes(ram)) {
        ns.tprintf(`${YELLOW}Invalid ram entered!${RESET}\n` +
            `Entered: ${ram}, Expected: ${RAM_AMOUNTS.reduce((line, number) => line + number + ", ", "").slice(0, 58)}`);
        return;
    }
    
    const cost = ns.getPurchasedServerCost(ram) * amount;
    if (cost > ns.getPlayer().money) {
        ns.tprintf(`${YELLOW}Insufficient funds!${RESET}\n` +
                   `Cost: ${cost}, Money: ${Math.floor(ns.getPlayer().money)}`);
    } else {
        for (let i = 0; i < amount; i++) {
            ns.purchaseServer("pserv", ram);
        }
    }
}
