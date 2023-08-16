import { NS } from "../../NetscriptDefinitions";
import { getServers } from "../server/network";

const SCRIPT = "hack/hack.js";

export async function main(ns: NS) {
    if (ns.args.length === 0) {
        ns.tprintf("WARN: No server entered to hack!");
        return;
    }

    const serverToHack = String(ns.args[0]);
    const script = SCRIPT;
    const scriptRam = ns.getScriptRam(script);
    const rootAccessServers = getServers(ns).filter((server) => ns.hasRootAccess(server))
       .filter((server) => ns.getServerMaxRam(server) > scriptRam);


    for (const server of rootAccessServers) {
        const serverRam = ns.getServerMaxRam(server);
        const threads = Math.floor(serverRam / scriptRam);

        ns.scp(script, server, "home");
        ns.exec(script, server, threads, serverToHack);
        await ns.sleep(15000);
    }
}
