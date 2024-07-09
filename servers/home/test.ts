import { NS } from "../../NetscriptDefinitions";
import { getTarget } from "./spread";

export async function main(ns: NS) {
    ns.tprintf("" + getTarget(ns));
    ns.tprintf("neo-net" + ns.getServerMaxMoney("neo-net"));
    ns.tprintf("CSEC" + ns.getServerMaxMoney("CSEC"));
    ns.tprintf("zer0" + ns.getServerMaxMoney("zer0"));

}
