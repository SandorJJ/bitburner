import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {

}

/**
 * Returns the amount of RAM that is available on a server.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {string} server - The name of the server to check the RAM for.
 * @returns The amount of ram the server has.
 */
export function getServerRamAvailable(ns: NS, server: string): number {
    return ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
}