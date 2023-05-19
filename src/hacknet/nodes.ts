import { NS } from '../../NetscriptDefinitions';

const SLEEP_TIME = 10;
const UPGRADE_BY = 1;

export async function main(ns: NS) {
    const node = +ns.args[0];
    upgradeNodeLevel(ns, node, 199);
    upgradeNodeRam(ns, node, 6);
    upgradeNodeCores(ns, node, 15);
}

async function upgradeNodeLevel(ns:NS, node:number, amount:number) {
    while (amount > 0) {
        if (ns.hacknet.getNodeStats(node).level === 200) {
            break;
        }

        if (fundLevelUpgrade(ns, node)) {
            ns.hacknet.upgradeLevel(node, UPGRADE_BY);
            amount -= UPGRADE_BY;
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

function fundLevelUpgrade(ns:NS, node:number): boolean {
    return ns.hacknet.getLevelUpgradeCost(node, UPGRADE_BY) < ns.getServerMoneyAvailable("home");
}

async function upgradeNodeRam(ns:NS, node:number, amount:number) {
    while (amount > 0) {
        if (ns.hacknet.getNodeStats(node).ram === 64) {
            break;
        }

        if (fundRamUpgrade(ns, node)) {
            ns.hacknet.upgradeRam(node, UPGRADE_BY);
            amount -= UPGRADE_BY;
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

function fundRamUpgrade(ns:NS, node:number): boolean {
    return ns.hacknet.getRamUpgradeCost(node, UPGRADE_BY) < ns.getServerMoneyAvailable("home");
}

async function upgradeNodeCores(ns:NS, node:number, amount:number) {
    while (amount > 0) {
        if (ns.hacknet.getNodeStats(node).cores === 16) {
            break;
        }

        if (fundCoreUpgrade(ns, node)) {
            ns.hacknet.upgradeCore(node, UPGRADE_BY);
            amount -= UPGRADE_BY;
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

function fundCoreUpgrade(ns:NS, node:number): boolean {
    return ns.hacknet.getCoreUpgradeCost(node, UPGRADE_BY) < ns.getServerMoneyAvailable("home");
}