import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    const servers = getServers(ns);
    servers.forEach((server) => ns.tprintf(server));
    ns.tprintf("" + servers.length);
}

/**
 * Scans for all the servers in Bitburner.
 * @param {NS} ns - The Netscript API.
 * @param {string} [root="home"] - The server from which to start scanning from.
 * @param {string[]} [children=new Array("home")] - The servers that have been found.
 * @returns {string[]} A list of all the servers in Bitburner.
 */
export function getServers(ns: NS, root: string = "home", children: string[] = new Array("home")): string[] {
    ns.scan(root)
    .filter((child) => !children.includes(child))
    .forEach((child) => {
        children.push(child);
        getServers(ns, child, children);
    });

    return children;
}
