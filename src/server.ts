import { NS } from "../NetscriptDefinitions";

const OPTIONS = ["-b", "-u"];
const AMOUNT_MIN = 1;
const AMOUNT_MAX = 20;
const RAM_AMOUNTS = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192];

export async function main(ns: NS) {
    if (ns.args.length != 2) {
        ns.tprintf("Not enough arguments entered!" +
                   "Options:" +
                   "-b      buy" +
                   "-u      upgrade" +
                   "Amount:" +
                   "1-20" +
                   "Ram:" +
                   "2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192");
        return 1;
    }

    const option = String(ns.args[0]);
    if (!OPTIONS.includes(option)) {
        return 2;
    }

    const amount = Number(ns.args[1]);
    if (amount < AMOUNT_MIN || amount > AMOUNT_MAX) {
        return 3;
    }

    const ram = Number(ns.args[2]);
    if (!RAM_AMOUNTS.includes(ram)) {
        return 4;
    }

    if (option === "-b") {
        for (let i = 0; i < amount; i++) {
            ns.purchaseServer("pserv", ram);
        }
    } else if (option === "-u") {
        ns.tprintf("Not yet implemented!");
    }
}
