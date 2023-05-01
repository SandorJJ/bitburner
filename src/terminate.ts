import { NS } from '../NetscriptDefinitions';
import { getNetworkWithScripts } from './network';

export async function main(ns: NS) {

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