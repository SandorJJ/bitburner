import { NS } from "../NetscriptDefinitions";

const RAM_AMOUNTS = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];

export async function main(ns: NS) {
    if (ns.args.length != 1) {
        ns.tprintf("Wrong number of arguments entered!\n" +
                   `Ram: ${RAM_AMOUNTS}`);
        return 1;
    }


    const ram = Number(ns.args[1]);
    if (!RAM_AMOUNTS.includes(ram)) {
        ns.tprintf("The RAM of the servers to purchase is incorrect!\n" +
            `Entered: ${ram}, Expected: ${RAM_AMOUNTS}`);
        return 4;
    }
    
    ns.getPurchasedServers().forEach((server) => ns.upgradePurchasedServer(server, ram));
}
