import { NS } from "../../NetscriptDefinitions";

const RAM_AMOUNTS = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];

export async function main(ns: NS) {
    if (ns.args.length != 1) {
        ns.tprintf("Wrong number of arguments entered!\n" +
                   `Ram: ${RAM_AMOUNTS}`);
        return 1;
    }


    const ram = Number(ns.args[0]);
    if (!RAM_AMOUNTS.includes(ram)) {
        ns.tprintf("The RAM of the servers to purchase is incorrect!\n" +
            `Entered: ${ram}, Expected: ${RAM_AMOUNTS}`);
        return 4;
    }

    const cost = ns.getPurchasedServers().reduce((total, server) => {
        const upgradeCost = ns.getPurchasedServerUpgradeCost(server, ram);

        if (upgradeCost === -1) {
            return total;
        }

        return total + upgradeCost;
    }, 0);
    if (cost > ns.getPlayer().money) {
        ns.tprintf(`You cannot afford to upgrade servers to ${ram} RAM!\n` +
                   `Cost: ${cost} > Money: ${Math.floor(ns.getPlayer().money)}`);
    } else {
        ns.getPurchasedServers().forEach((server) => ns.upgradePurchasedServer(server, ram));
    }
}
