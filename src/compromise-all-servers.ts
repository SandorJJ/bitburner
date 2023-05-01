import { NS } from "../NetscriptDefinitions";
import { getNetwork } from "./network";
import { compromiseServer } from "./compromise"

export async function main(ns: NS) {
    const servers = getNetwork(ns)
        .filter(server => !ns.hasRootAccess(server));
    
    let compromised = 0;
    for (const server of servers) {
        let value = compromiseServer(ns, server);

        if (value === 0) {
            compromised++;
        } else if (value === 2) {
            ns.tprint("ERROR: An unexpected error has occured.");
        }
    }

    if (compromised === 0) {
        ns.tprint("Unable to compromise more servers.");
    } else {
        ns.tprint("SUCCESS: Successfully compromised " + compromised + " servers!");
    }
}