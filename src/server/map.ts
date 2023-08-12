import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    network(ns);
}

function network(ns: NS, root: string = "home", indent: number = 0, prefix: string = "", printed: string[] = ["home"]): void {
    ns.tprintf(prefix.slice(0, prefix.length - 1) + generateIndent(indent) + prefix.slice(prefix.length - 1, prefix.length) + root);

    const servers = ns.scan(root)
        .filter((server) => !printed.includes(server))
        .filter((server) => !ns.getServer(server).purchasedByPlayer);
    for (let i = 0; i < servers.length; i++) {
        printed.push(servers[i]);
        if (prefix.includes("┣")) {
            prefix = "┃" + prefix;
        }
        if (i === servers.length - 1) {
            network(ns, servers[i], indent + 1, constructPrefix(0, prefixLength(prefix), "┗"), printed);
        } else {
            network(ns, servers[i], indent + 1, constructPrefix(0, prefixLength(prefix), "┣"), printed);
        }
    }
}

function generateIndent(level: number) {
    let indent = "";
    for (let i = 0; i < level; i++) {
        indent += "  ";
    }

    return indent;
}

function constructPrefix(indent: number, length: number, ending: string): string {
    let prefix = "";
    for (let i = 0; i < length; i++) {
        if (prefix.length === 0) {
            prefix = prefix + generateIndent(indent) + "┃";
        } else {
            prefix = prefix + generateIndent(1) + "┃";
        }
    }
    
    return prefix + ending;
}

function prefixLength(prefix: string): number {
    let length = 0;
    for (let i = 0; i < prefix.length; i++) {
        if (prefix[i] === "┃") {
            length++;
        }
    }
    return length;
}

// function printServers(ns: NS, servers: string[], printed: string[] = ["home"], indent: number = 0): void {
//     printed = printed.concat(servers);
//     for (let i = 0; i < servers.length; i++) {
//         ns.tprintf(addIndent(indent, "┃"));
//         if (i === servers.length - 1) {
//             ns.tprintf(addIndent(indent, "┗" + servers[i]));
//         } else {
//             ns.tprintf(addIndent(indent, "┣" + servers[i]));
//         }
//
//         const connectedServers = ns.scan(servers[i]).filter((server) => !printed.includes(server));
//         if (connectedServers.length > 0) {
//             printServers(ns, connectedServers, printed, indent + 1);
//         }
//
//     }
// }
//
// function addIndent(level: number, string: string) {
//     let indent = "";
//     for (let i = 0; i < level; i++) {
//         indent += " ";
//     }
//
//     return indent + string;
// }
