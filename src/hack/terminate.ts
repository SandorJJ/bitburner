import { NS } from "../../NetscriptDefinitions";
import { getServers } from "../server/network";

export async function main(ns: NS) {
    const serversRunningScripts = getServers(ns).filter((server) => ns.getServerUsedRam(server));
    serversRunningScripts.forEach((server) => ns.killall(server));
}
