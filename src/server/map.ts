import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    network(ns);
}

function network(ns: NS, root: string = "home", indent: number = 0, prefix: string = "", printed: string[] = []): void {
    ns.tprintf(generateIndent(indent) + prefix + root);
    let bool = false;
    if (prefix === "┣") {
        ns.tprintf(generateIndent(indent) + "┃");
        bool = true;
    }
    if (bool) {
        ns.tprintf(generateIndent(indent) + prefix + root);
    } else {
        ns.tprintf(generateIndent(indent) + prefix + root);
    }
    printed.push(root);

    const servers = ns.scan(root).filter((server) => !printed.includes(server)).filter((server) => !ns.getServer(server).purchasedByPlayer);
    for (let i = 0; i < servers.length; i++) {
        printed.push(servers[i]);
        if (i === servers.length - 1) {
            network(ns, servers[i], indent + 1, "┗", printed);
        } else {
            network(ns, servers[i], indent + 1, "┣", printed);
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
