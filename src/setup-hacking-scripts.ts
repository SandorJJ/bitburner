import { NS } from '../NetscriptDefinitions';
import { getNetwork } from './server-utils';

export async function main(ns: NS) {
    const target = ns.args[0];
    const script = "basic-hacking-script.js";
    const scriptRam = ns.getScriptRam(script, "home");
    const servers = getNetwork(ns)
        .filter(server => !(server === "home"))
        .filter(server => ns.hasRootAccess(server));

    for (const server of servers) {
        if (!ns.fileExists(script, server)) {
            ns.scp(script, server, "home");
        }

        let serverRam = ns.getServerMaxRam(server);
        let threads = Math.floor(serverRam / scriptRam);

        if (threads != 0) {
            ns.exec(script, server, threads, target);
        }
    }
}