import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    const root = "home";
    const servers = ns.scan(root).filter((server) => !ns.getServer(server).purchasedByPlayer);
    ns.tprintf(root);
    printServers(ns, servers);
}

function printServers(ns: NS, servers: string[], printed: string[] = ["home"], indent: number = 0): void {
    printed = printed.concat(servers);
    for (let i = 0; i < servers.length; i++) {
        ns.tprintf(addIndent(indent, "┃"));
        if (i === servers.length - 1) {
            ns.tprintf(addIndent(indent, "┗" + servers[i]));
        } else {
            ns.tprintf(addIndent(indent, "┣" + servers[i]));
        }

        const connectedServers = ns.scan(servers[i]).filter((server) => !printed.includes(server));
        if (connectedServers.length > 0) {
            printServers(ns, connectedServers, printed, indent = indent + 1);
        }

    }
}

function addIndent(level: number, string: string) {
    let indent = "";
    for (let i = 0; i < level; i++) {
        indent += " ";
    }

    return indent + string;
}
