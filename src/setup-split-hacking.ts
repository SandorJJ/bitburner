import { NS } from '../NetscriptDefinitions';
import { getNetwork } from './network';

export async function main(ns: NS) {
    const script = "basic-hacking-script.js";
    const scriptRam = ns.getScriptRam(script);
    const serversWithRam = getNetwork(ns).filter(server => ns.getServerMaxRam(server) > 0);
    const hackableServers = getNetwork(ns)
        .filter(server => ns.getServerMaxMoney(server) > 0)
        .filter(server => ns.getServerRequiredHackingLevel(server) < (ns.getHackingLevel() / 3));
    let totalRam = 0;
    for (const server of serversWithRam) {
        totalRam += ns.getServerMaxRam(server);
    }
    const threadsPerServer = Math.floor(totalRam / scriptRam / hackableServers.length);

    for (const server of serversWithRam) {
        ns.scp(script, server, "home");
    }


    for (const hackableServer of hackableServers) {
        let threadsLeft = threadsPerServer;

        for (const serverWithRam of serversWithRam) {
            let serverRamAvailable = ns.getServerMaxRam(serverWithRam) - ns.getServerUsedRam(serverWithRam);
            let threads = Math.floor(serverRamAvailable / scriptRam);

            if (threads === 0) {
                continue;
            }

            if (threadsLeft < threads) {
                threads = threadsLeft;
            }
            
            ns.exec(script, serverWithRam, threads, hackableServer);
            
            threadsLeft -= threads;
            if (threadsLeft === 0) {
                break;
            }
        }
    }
}