import { NS } from "../../NetscriptDefinitions";
import { YELLOW, RESET } from "../random/style";
import { getServers } from "../server/network";

const SCRIPT = "hack/hack.js";

export async function main(ns: NS) {
    if (ns.args.length != 1) {
        ns.tprintf(`${YELLOW}Wrong number of arguments entered!${RESET}`);
        ns.tprintf("Deploy.ts: deploys hack.ts on all possible servers.\n" +
                   "Usage: deploy.ts target\n" +
                   "target        the target for hack.ts")
        return;
    }

    const target = String(ns.args[0]);
    try {
        ns.hasRootAccess(target);
    } catch (error) {
        ns.tprintf(`${YELLOW}Invalid target entered!${RESET}`);
        return;
    }

    const scriptRam = ns.getScriptRam(SCRIPT);
    const rootAccessServers = getServers(ns).filter((server) => ns.hasRootAccess(server))
    .filter((server) => ns.getServerMaxRam(server) > scriptRam);


    for (const server of rootAccessServers) {
        const serverRam = ns.getServerMaxRam(server);
        const threads = Math.floor(serverRam / scriptRam);

        ns.scp(SCRIPT, server, "home");
        ns.exec(SCRIPT, server, threads, target);
        await ns.sleep(15000);
    }
}
