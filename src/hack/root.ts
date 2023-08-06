import { NS } from "../../NetscriptDefinitions";
import { getServers } from "../server/network";

export async function main(ns: NS) {
    const noRootAccessServers = getServers(ns).filter((server) => !ns.hasRootAccess(server));

    noRootAccessServers.forEach((server: string) => {
        if (ns.fileExists("BruteSSH.exe")) {
            ns.brutessh(server);
        }

        if (ns.fileExists("FTPCrack.exe")) {
            ns.ftpcrack(server);
        }

        if (ns.fileExists("relaySMTP.exe")) {
            ns.relaysmtp(server);
        }

        if (ns.fileExists("HTTPWorm.exe")) {
            ns.httpworm(server);
        }

        if (ns.fileExists("SQLInject.exe")) {
            ns.sqlinject(server);
        }

        if (ns.getServer(server).openPortCount! >= ns.getServerNumPortsRequired(server)) {
            ns.nuke(server);
        }
    });
    
    const noRootAccessServersAfter = getServers(ns).filter((server) => !ns.hasRootAccess(server));
    const gainedRootAccess = noRootAccessServers.filter((server) => !noRootAccessServersAfter.includes(server));
    
    if (gainedRootAccess.length !== 0) {
        const reducedToString = gainedRootAccess.reduce((server, server1) => server.concat(", " + server1));
        ns.tprintf(`Gained root access to ${gainedRootAccess.length} servers: ${reducedToString}`);
    } else {
        ns.tprintf("Wasn't able to gain root access any new servers!");
    }
}
