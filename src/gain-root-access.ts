import { NS } from "../NetscriptDefinitions";
import { network } from "./network";

export async function main(ns: NS) {
    const noRootAccessServers = network(ns).filter((server) => !ns.hasRootAccess(server));

    noRootAccessServers.forEach((server) => {
        let portsOpened = 0;
        if (ns.fileExists("BruteSSH.exe")) {
            ns.brutessh(server);
            portsOpened++;
        }

        if (ns.fileExists("FTPCrack.exe")) {
            ns.ftpcrack(server);
            portsOpened++;
        }

        if (ns.fileExists("relaySMTP.exe")) {
            ns.relaysmtp(server);
            portsOpened++;
        }

        if (ns.fileExists("HTTPWorm.exe")) {
            ns.httpworm(server);
            portsOpened++;
        }

        if (ns.fileExists("SQLInject.exe")) {
            ns.sqlinject(server);
            portsOpened++;
        }

        if (ns.getServerNumPortsRequired(server) <= portsOpened) {
            ns.nuke(server);
        }
    });
}
