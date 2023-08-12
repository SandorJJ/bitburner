import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    network(ns);
}

function network(ns: NS, root: string = "home", indent: number = 0, prefix: string = " ", printed: string[] = ["home"]): void {
    if (indent === 11) {
        return; 
    }
    if (root === "home") {
        ns.tprintf(root);
    } else {
    ns.tprintf(prefix.slice(0, prefix.length - 1) + generateIndent(indent - prefix.length) + prefix.slice(prefix.length - 1, prefix.length) + root);
    }

    const servers = ns.scan(root)
        .filter((server) => !printed.includes(server))
        .filter((server) => !ns.getServer(server).purchasedByPlayer);
    for (let i = 0; i < servers.length; i++) {
        printed.push(servers[i]);
        if (prefix.includes("┣") && servers[i] != "max-hardware" && servers[i] != "global-pharm" && servers[i] != "nova-med") {
            prefix = "┃" + prefix;
        }
        if (i === servers.length - 1) {
            network(ns, servers[i], indent + 1, constructPrefix(prefixLength(prefix), "┗"), printed);
        } else {
            network(ns, servers[i], indent + 1, constructPrefix(prefixLength(prefix), "┣"), printed);
        }
    }
}

function generateIndent(level: number) {
    let indent = "";
    for (let i = 0; i < level; i++) {
        indent += " ";
    }

    return indent;
}

function constructPrefix(length: number, ending: string): string {
    let prefix = "";
    for (let i = 0; i < length; i++) {
        if (prefix.length === 0) {
            prefix = prefix + "┃";
        } else {
            prefix = prefix + "┃";
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




// function network(ns: ns, root: string = "home", indent: number = 0, prefix: string = "", printed: string[] = ["home"]): void {
//     ns.tprintf(prefix.slice(0, prefix.length - 1) + generateindent(indent) + prefix.slice(prefix.length - 1, prefix.length) + root);
//
//     const servers = ns.scan(root)
//         .filter((server) => !printed.includes(server))
//         .filter((server) => !ns.getserver(server).purchasedbyplayer);
//     for (let i = 0; i < servers.length; i++) {
//         printed.push(servers[i]);
//         if (prefix.includes("┣")) {
//             prefix = "┃" + prefix;
//         }
//         if (i === servers.length - 1) {
//             network(ns, servers[i], indent + 1, constructprefix(1, prefixlength(prefix), "┗"), printed);
//         } else {
//             network(ns, servers[i], indent + 1, constructprefix(1, prefixlength(prefix), "┣"), printed);
//         }
//     }
// }
//
// function generateindent(level: number) {
//     let indent = "";
//     for (let i = 0; i < level; i++) {
//         indent += "  ";
//     }
//
//     return indent;
// }
//
// function constructprefix(indent: number, length: number, ending: string): string {
//     let prefix = "";
//     for (let i = 0; i < length; i++) {
//         if (prefix.length === 0) {
//             prefix = prefix + generateindent(indent) + "┃";
//         } else {
//             prefix = prefix + generateindent(1) + "┃";
//         }
//     }
//     
//     return prefix + ending;
// }
//
// function prefixlength(prefix: string): number {
//     let length = 0;
//     for (let i = 0; i < prefix.length; i++) {
//         if (prefix[i] === "┃") {
//             length++;
//         }
//     }
//     return length;
// }
