import { NS } from '../../NetscriptDefinitions';

const SLEEP_TIME = 500;
const UPGRADE_BY = 1;
const MAX_NODE_LEVEL = 200;
const MAX_NODE_RAM = 64;
const MAX_NODE_CORES = 16;

export async function main(ns: NS) {
    if (ns.args[0] === "-h" || ns.args[0] === "--help" || ns.args.length !== 4) {
        printHelpMessage(ns);
        return 1;
    }

    // ADD MAX
    const nodesCount = +ns.args[0];
    const levelOfNodes = +ns.args[1];
    const ramOfNodes = +ns.args[2];
    const coresOfNodes = +ns.args[3];

    for (let i = 0; i < nodesCount; i++) {
        if (ns.hacknet.numNodes() < nodesCount) {
            while (isNodeMaxed(ns, ns.hacknet.numNodes() - 1, levelOfNodes, ramOfNodes, coresOfNodes)) {
                ns.hacknet.purchaseNode();
                await ns.sleep(SLEEP_TIME);
            }
        }
        await upgradeNodeLevelTo(ns, i, levelOfNodes);
        await upgradeNodeRamTo(ns, i, ramOfNodes);
        await upgradeNodeCoresTo(ns, i, coresOfNodes);
    }
}

async function upgradeNodeLevelTo(ns:NS, node:number, level:number) {
    while (ns.hacknet.getNodeStats(node).level < level) {
        if (affordLevelUpgrade(ns, node)) {
            ns.hacknet.upgradeLevel(node, UPGRADE_BY);
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

function affordLevelUpgrade(ns:NS, node:number): boolean {
    return ns.hacknet.getLevelUpgradeCost(node, UPGRADE_BY) < ns.getServerMoneyAvailable("home");
}

async function upgradeNodeRamTo(ns:NS, node:number, ram:number) {
    while (ns.hacknet.getNodeStats(node).ram < ram) {
        if (affordRamUpgrade(ns, node)) {
            ns.hacknet.upgradeRam(node, UPGRADE_BY);
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

function affordRamUpgrade(ns:NS, node:number): boolean {
    return ns.hacknet.getRamUpgradeCost(node, UPGRADE_BY) < ns.getServerMoneyAvailable("home");
}

async function upgradeNodeCoresTo(ns:NS, node:number, cores:number) {
    while (ns.hacknet.getNodeStats(node).cores < cores) {
        if (affordCoreUpgrade(ns, node)) {
            ns.hacknet.upgradeCore(node, UPGRADE_BY);
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

function affordCoreUpgrade(ns:NS, node:number): boolean {
    return ns.hacknet.getCoreUpgradeCost(node, UPGRADE_BY) < ns.getServerMoneyAvailable("home");
}

function isNodeMaxed(ns:NS, node:number, level:number, ram:number, cores:number): boolean {
    const nodeStats = ns.hacknet.getNodeStats(node);
    return nodeStats.level === level && nodeStats.ram === ram && nodeStats.cores === cores;
}

function printHelpMessage(ns: NS) {
    ns.tprint("\nrun nodes.ts amount levels ram cores" +
    "\n\nThe script buys hacknet nodes until the given amount is reached, with a certain number of levels, RAM, and cores. " + 
    "Should the amount of nodes input be less than owned, nothing will happen. " +
    "Should the number of levels, RAM, or cores be less than the nodes already have, nothing will happen." +
    "If the number of levels, RAM, or cores exceed their maximum values, nodes will be upgraded to their maximum values." +
    "\n\namount       The amount of hacknet nodes until the script stops buying more." +
    "\nlevels       The number of levels to upgrade the nodes to." +
    "\nram          The amount of ram to upgrade the nodes to." +
    "\ncores        The number of cores to upgrade the nodes to.");
}