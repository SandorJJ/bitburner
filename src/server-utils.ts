import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {
    ns.print(getNetwork(ns).length);
}

/**
 * Scans for all of the servers in the bitburner world.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {string} root - Where the program starts scanning for servers, default is "home".
 * @param {string[]} visited - The list of servers that have been visited.
 * @returns {string[]} An array of all the servers.
 */
function getNetwork(ns: NS, root: string = "home", visited:string[] = []): string[] {
    ns.scan(root)
    .filter(server => !visited.includes(server))
    .forEach(server => {
        visited.push(server);
        getNetwork(ns, server, visited);
    })

    return visited;
}

/**
 * Checks for the ram of a specific server.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {string} server - The name of the server to check the ram for.
 * @returns {number} The amount of ram a server has.
 */
function getServerRam(ns: NS, server: string): number {
    return ns.getServerMaxRam(server);
}