import { NS } from '../NetscriptDefinitions';
import { getNetworkWithScripts } from './network';

export async function main(ns: NS) {
    const answer = await ns.prompt("Would you like to kill all running scripts?", { type: "boolean" });
    if (answer) {
        killScripts(ns);
        ns.tprint("Successfully killed all running scripts!");
    }
}


/**
 * Kills all running scripts of an array of servers. Kills all scripts by default.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {string[]} servers - An array of servers to kill scripts on, default: all servers with running scripts.
 */
export function killScripts(ns: NS, servers: string[] = getNetworkWithScripts(ns)): void {
    servers.forEach((server: string) => ns.killall(server, true));
}