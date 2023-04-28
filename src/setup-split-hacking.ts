import { NS } from '../NetscriptDefinitions';
import { getNetwork } from './server-utils';

export async function main(ns: NS) {
    const script = "basic-hacking-script.js";
    const scriptRam = ns.getScriptRam(script);
    const serversWithRam = getNetwork(ns).filter(server => ns.getServerMaxRam(server) > 0);
    const serversWithMoney = getNetwork(ns).filter(server => ns.getServerMaxMoney(server) > 0);


    for (const serverWithMoney of serversWithMoney) {
        for (const serverWithRam of serversWithRam) {
            let serverRam = ns.getServerMaxRam(serverWithRam);
            
        }
    }
}