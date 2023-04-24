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
    .filter(host => !visited.includes(host))
    .forEach(host => {
        visited.push(host);
        getNetwork(ns, host, visited);
    })

    return visited;
}