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
export function getNetwork(ns: NS, root: string = "home", visited:string[] = []): string[] {
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
export function getServerRam(ns: NS, server: string): number {
    return ns.getServerMaxRam(server);
}

/**
 * Gains root access to a specific server.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {string} server - The server to compromise.
 * @returns {number} Returns 0 if the compromise was successful, 1 if not enough ports have been opened, 2 if an unexpected error occured.
 */
export function compromiseServer(ns: NS, server: string): number {
    if (ns.fileExists("BruteSSH.exe")) {
        ns.brutessh(server);
    }

    if (ns.fileExists("FTPCrack.exe")) {
        ns.ftpcrack(server);
    }

    if (ns.fileExists("relaySMTP.exe")) {
        ns.relaysmtp(server);
    }

    if (ns.fileExists("HTTPWorm.exe")) {
        ns.httpworm(server);
    }

    if (ns.fileExists("SQLInject.exe")) {
        ns.sqlinject(server);
    }
    
    try {
        ns.nuke(server);
    } catch (error) {
        if (error.includes("Not enough ports opened to use NUKE.exe virus.")) {
            return 1;
        } else {
            return 2;
        }
    }

    return 0;
}
