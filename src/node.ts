import { NS } from "../NetscriptDefinitions";

export async function main(ns: NS) {
    if (ns.args.length != 4) {
        ns.tprintf("Wrong number of arguments entered!");
        return 1;
    }

    const amount = ns.args[0];
    const level = ns.args[1];
    const ram = ns.args[2];
    const core = ns.args[3];
}
