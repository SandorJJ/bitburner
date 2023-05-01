import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {

}

/**
 * Scans for all of the servers in the bitburner world.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {string} root - Where the program starts scanning for servers, default is "home".
 * @param {string[]} visited - The list of servers that have been visited.
 * @returns {string[]} An array of all the servers.
 */
export function getNetwork(ns: NS, root: string = "home", visited:string[] = ["home"]): string[] {
    ns.scan(root)
    .filter(server => !visited.includes(server))
    .forEach(server => {
        visited.push(server);  
        getNetwork(ns, server, visited);
    })

    return visited;
}