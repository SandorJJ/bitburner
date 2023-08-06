import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    const servers = getServers(ns);
    servers.forEach((server) => ns.tprintf(server));
}

/**
* Scans for all the servers in the world.
* @param {NS} ns - The Netscript API.
* @param {string} root=home - The server from which the scanning starts from.
* @param {set<string>} visited=new set() - The servers that have been visited.
* @returns {string[]} Returns an array of all the servers.
*/
export function getServers(ns: NS, root: string = "home", visited: Set<string> = new Set()): string[] {
    ns.scan(root)
    .filter((child) => !visited.has(child))
    .forEach((child) => {
        visited.add(child);
        getServers(ns, child, visited);
    })

    return [...visited];
}
