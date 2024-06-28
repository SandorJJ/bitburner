import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    const servers = network(ns, "home", new Array("home"));
    servers.forEach((server) => ns.tprintf(server));
    ns.tprintf("" + servers.length);
}

export function network(ns: NS, root = "home", children = new Array("home")) {
    ns.scan(root)
    .filter((child) => !children.includes(child))
    .forEach((child) => {
        children.push(child);
        network(ns, child, children);
    });

    return children;
}
