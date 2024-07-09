import { NS } from "../../NetscriptDefinitions";
import { getServers } from "./network";

export async function main(ns: NS) {
    const hijackableServers = getServers(ns)
    .filter((server) => !ns.hasRootAccess(server))
    .filter((server) => ns.getServerNumPortsRequired(server) <= numberOfPortOpeners(ns));

    hijackableServers.forEach((server) => {
        switch (numberOfPortOpeners(ns)) {
            case 5:
                ns.sqlinject(server);
            case 4:
                ns.httpworm(server);
            case 3:
                ns.relaysmtp(server);
            case 2:
                ns.ftpcrack(server);
            case 1:
                ns.brutessh(server);
            case 0:
                ns.nuke(server);
        }
        
        ns.tprintf(server);
    });
}

export function numberOfPortOpeners(ns: NS) {
    let count = 0;
    if (ns.fileExists("brutessh.exe")) {
        count++;
    }

    if (ns.fileExists("ftpcrack.exe")) {
        count++;
    }

    if (ns.fileExists("relaysmtp.exe")) {
        count++;
    }

    if (ns.fileExists("httpworm.exe")) {
        count++;
    }

    if (ns.fileExists("sqlinject.exe")) {
        count++;
    }

    return count;
}

