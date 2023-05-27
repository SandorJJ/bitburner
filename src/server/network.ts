import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {
 
}

/**
 * Returns all of the servers in the bitburner world.
 * 
 * @param {NS} ns - The Netscript API.
 * @param {string} root - Where the program starts scanning for servers, default is "home".
 * @param {string[]} visited - The list of servers that have been visited.
 * @returns {string[]} An array of all of the servers.
 */
export function getNetwork(ns: NS, root: string = "home", visited:string[] = ["home"]): string[] {
    ns.scan(root)
    .filter((server) => !visited.includes(server))
    .forEach((server) => {
        visited.push(server);  
        getNetwork(ns, server, visited);
    })

    return visited;
}

/**
 * Returns all of the servers that have RAM.
 * 
 * @param {NS} ns - The Netscript API. 
 * @returns {string[]} Returns an array of all of the servers that have RAM.
 */
export function getNetworkWithRam(ns: NS): string[] {
    return getNetwork(ns).filter((server) => ns.getServerMaxRam(server) > 0);
}

/** 
 * Returns all of the servers that have money.
 * 
 * @param {NS} ns - The Netscript API. 
 * @returns {string[]} Returns an array of all of the servers with money.
 */
export function getNetworkWithMoney(ns: NS): string[] {
    return getNetwork(ns).filter((server) => ns.getServerMaxMoney(server) > 0);
}


/**
 * Returns all of the servers that have running scripts.
 * 
 * @param {NS} ns - The Netscript API.
 * @returns {string[]} Returns an array of all of the servers with running scripts.
 */
export function getNetworkWithScripts(ns: NS): string[] {
    return getNetwork(ns).filter((server) => ns.getServerUsedRam(server) > 0);
}