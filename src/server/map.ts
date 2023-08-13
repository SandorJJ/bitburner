import { NS } from "../../NetscriptDefinitions";

export async function main(ns: NS) {
    map(ns)
}

function map(ns: NS, root: string = "home", printed: string[] = [], indentLevel: number = 0, prefix: string = "") {
    ns.tprintf(createIndent(indentLevel) + prefix + root);
    printed.push(root);

    const children = ns.scan(root)
        .filter((child) => !printed.includes(child))
        .filter((child) => !child.includes("pserv"));

    for (let i = 0; i < children.length; i++) {
        if (i === children.length - 1) {
            map(ns, children[i], printed, indentLevel + 1, "┗");
        } else {
            map(ns, children[i], printed, indentLevel + 1, "┣");
        }
    }
}

function createIndent(level: number): string {
    let indent = "";
    for (let i = 0; i < level; i++) {
        indent += " ";
    }

    return indent;
}
