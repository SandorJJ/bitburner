import { NS } from "../../NetscriptDefinitions";

import { RED, GREEN, CYAN, UNDERLINE, RESET } from "../random/style";

const CONTINUED_CONNECTION = "┣";
const CORNER_CONNECTION = "┗";
const SPACE_INDENT = "  ";
const LINE_INDENT = "┃ ";

const SPECIAL_SERVERS = ["CSEC", "I.I.I.I", "avmnite-02h", "run4theh111z", "The-Cave", "darkweb"];

export async function main(ns: NS) {
    if (ns.args.length != 1) {
        ns.tprintf("Wrong number of args!");
        return;
    }

    if (ns.args[0] === "-m") {
        map(ns)
    } else if (ns.args[0] === "-h") {
        ns.tprintf("help");
    } else {
        ns.tprintf("WHAT?");
    }
}

function map(ns: NS, root: string = "home", printed: string[] = [], prefix: string = "  ") {
    if (root === "home") {
        ns.tprintf(CORNER_CONNECTION + UNDERLINE + root + RESET);
    }
    printed.push(root);

    const children = ns.scan(root)
        .filter((child) => !printed.includes(child))
        .filter((child) => !ns.getServer(child).purchasedByPlayer);

    for (let i = 0; i < children.length; i++) {
        if (i === children.length - 1) {
            printServerInfo(ns, prefix + CORNER_CONNECTION, children[i]);
            map(ns, children[i], printed, prefix + SPACE_INDENT);
        } else {
            printServerInfo(ns, prefix + CONTINUED_CONNECTION, children[i]);
            map(ns, children[i], printed, prefix + LINE_INDENT);
        }
    }
}

function printServerInfo(ns: NS, prefix: string, server: string) {
    ns.tprintf(prefix.replace(CORNER_CONNECTION, "┃").replace(CONTINUED_CONNECTION, "┃"));
    
    let info = server;
    
    if (SPECIAL_SERVERS.includes(server) && ns.getServer(server).hasAdminRights) {
        info = "\u001b[36;4m" + info + RESET;
    } else {
        if (SPECIAL_SERVERS.includes(server)) {
            info = CYAN + info + RESET;
        }

        if (ns.getServer(server).hasAdminRights) {
            info = UNDERLINE + info + RESET;
        }
    }

    const requiredHackingSkill = ns.getServer(server).requiredHackingSkill!;
    if (requiredHackingSkill < ns.getPlayer().skills.hacking) {
        info += GREEN + " (" + requiredHackingSkill + ")" + RESET;
    } else {
        info += RED + " (" + requiredHackingSkill + ")" + RESET;
    }

    if (ns.getServer(server).numOpenPortsRequired! <= portOpenersOwned(ns) && !ns.getServer(server).hasAdminRights) {
        info = "\u001b[33m" + "!!!" + RESET + info;
    }

    ns.tprintf(prefix + info);
}

function portOpenersOwned(ns: NS): number {
    let count = 0;
    
    const portOpeners = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]
    for (const opener of portOpeners) {
        if (ns.fileExists(opener)) {
            count++;
        }
    }

    return count;
}
