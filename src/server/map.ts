import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    const root = "home";
    const servers = ns.scan(root).filter((server) => !ns.getServer(server).purchasedByPlayer);
    ns.tprintf(root);
    printServers(ns, servers);
}

function printServers(ns: NS, servers: string[], printed: string[] = ["home"]): void {
    printed = printed.concat(servers);
    for (let i = 0; i < servers.length; i++) {
        if (i === servers.length - 1) {
            ns.tprintf("┃\n┗" + servers[i]);
        } else {
            ns.tprintf("┃\n┣" + servers[i]);
        }

        const connectedServers = ns.scan(servers[i]).filter((server) => !printed.includes(server));
        if (connectedServers.length > 0) {
            printServers(ns, connectedServers, printed);
        }

    }
}
