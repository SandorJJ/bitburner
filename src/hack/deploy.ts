import { NS } from "../../NetscriptDefinitions";
import { YELLOW, RESET } from "../random/style";
import { getServers } from "../server/network";

const SCRIPT = "hack/hack.ts";

export async function main(ns: NS) {
    if (ns.args.length != 1 && ns.args.length != 2) {
        ns.tprintf(`${YELLOW}Wrong number of arguments entered!${RESET}`);
        return;
    }

    const option = String(ns.args[0]);
    if (option === "-h" || option === "--help") {
        ns.tprintf("Deploy.ts: deploys hack.ts on all possible servers.\n" +
                   "Usage: deploy.ts (-h)(-d deploy)\n" +
                   "-h    --help        displays help information\n" +
                   "-d    --deploy      start deploying hack.ts on all possible servers")
    } else if (option === "-d" || option === "--deploy") {
        const target = String(ns.args[1]);
        const scriptRam = ns.getScriptRam(SCRIPT);
        const rootAccessServers = getServers(ns).filter((server) => ns.hasRootAccess(server))
        .filter((server) => ns.getServerMaxRam(server) > scriptRam);


        for (const server of rootAccessServers) {
            const serverRam = ns.getServerMaxRam(server);
            const threads = Math.floor(serverRam / scriptRam);

            ns.scp(SCRIPT, server, "home");
            ns.exec(SCRIPT, server, threads, "--hack", target);
            await ns.sleep(15000);
        }
    } else {
        ns.tprintf(`${YELLOW}Invalid usage!${RESET}`);
    }
}
