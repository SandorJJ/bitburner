import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {
    const answer = await ns.prompt("What would you like to do?", { 
        type: "select",
        choices: ["Get the available RAM of a server"]
     });
    if (answer === "Get the available RAM of a server") {
        const server = "" + await ns.prompt("What server would you like to know the RAM of?", { type:"text" });
        ns.tprint("SUCCESS\nThe available RAM of " + server + " is " + getServerRamAvailable(ns, server) + " GB.");
    }
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