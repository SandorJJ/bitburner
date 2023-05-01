import { NS } from '../NetscriptDefinitions';
import { getNetwork } from './server-utils';

export async function main(ns: NS) {
    killAllScripts(ns);
}

export function killAllScripts(ns: NS) {
    const serversWithRunningScripts = getNetwork(ns).filter((server) => ns.getServerUsedRam(server) > 0);

    for (const server of serversWithRunningScripts) {
        ns.killall(server, true);
    }
}