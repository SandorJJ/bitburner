import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {

}

/**
 * Gains root access to the server. Opens all possible ports and then tries to gain root access to the server.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {string} server - The server to compromise.
 * @returns {number} Returns 0: if the compromise was successful, 1: if not enough ports have been opened, 2: if an unexpected error occured.
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
