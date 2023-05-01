import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {

}

/**
 * Checks for the ram of a specific server.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {string} server - The name of the server to check the ram for.
 * @returns {number} The amount of ram a server has.
 */
export function getServerRam(ns: NS, server: string): number {
    return ns.getServerMaxRam(server);
}