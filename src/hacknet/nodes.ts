import { NS } from '../../NetscriptDefinitions';

const SLEEP_TIME = 500;
const MAX_NODE_LEVEL = 200;
const MAX_NODE_RAM = 64;
const MAX_NODE_CORES = 16;

export async function main(ns: NS) {
    if (ns.args.length !== 4) {
        printHelpMessage(ns);
        return 1;
    }
    
    if (!Number.isInteger(ns.args[0]) || !Number.isInteger(ns.args[1]) || !Number.isInteger(ns.args[2]) || !Number.isInteger(ns.args[3])) {
        printHelpMessage(ns);
        return 2;
    }
    
    const nodesCount = +ns.args[0];
    let levelOfNodes = +ns.args[1];
    if (levelOfNodes > MAX_NODE_LEVEL) {
        levelOfNodes = MAX_NODE_LEVEL;
    }
    let ramOfNodes = +ns.args[2];
    if (ramOfNodes > MAX_NODE_RAM) {
        ramOfNodes = MAX_NODE_RAM;
    }
    let coresOfNodes = +ns.args[3];
    if (coresOfNodes > MAX_NODE_CORES) {
        coresOfNodes = MAX_NODE_RAM;
    }

    for (let i = 0; i < nodesCount; i++) {
        if (ns.hacknet.numNodes() < nodesCount) {
            if (ns.hacknet.numNodes() === 0) {
                ns.hacknet.purchaseNode();
                continue;
            }
            while (isNodeMaxed(ns, ns.hacknet.numNodes() - 1)) {
                ns.hacknet.purchaseNode();
                await ns.sleep(SLEEP_TIME);
            }
        }
        await upgradeNodeLevelTo(ns, i, levelOfNodes);
        await upgradeNodeRamTo(ns, i, ramOfNodes);
        await upgradeNodeCoresTo(ns, i, coresOfNodes);
    }
}

/**
 * Upgrades a node's level until it reaches the level that was input.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {number} index - The index of the node to upgrade.
 * @param {number} level - The level to upgrade the node to.
 */
async function upgradeNodeLevelTo(ns:NS, index:number, level:number) {
    while (ns.hacknet.getNodeStats(index).level < level) {
        if (affordLevelUpgrade(ns, index)) {
            ns.hacknet.upgradeLevel(index, 1);
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

/**
 * Checks whether there is enough money to upgrade the node's level or not, returns true or false, respectively.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {number} index - The index of the node to check if the upgrade can be afforded for it.
 * @returns {boolean} Returns true if upgrade can be afforded, false if not.
 */
function affordLevelUpgrade(ns:NS, index:number): boolean {
    return ns.hacknet.getLevelUpgradeCost(index, 1) < ns.getServerMoneyAvailable("home");
}

/**
 * Upgrades a node's RAM until it reaches the RAM that was input.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {number} index - The index of the node to upgrade.
 * @param {number} ram - The RAM to upgrade the node to.
 */
async function upgradeNodeRamTo(ns:NS, index:number, ram:number) {
    while (ns.hacknet.getNodeStats(index).ram < ram) {
        if (affordRamUpgrade(ns, index)) {
            ns.hacknet.upgradeRam(index, 1);
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

/**
 * Checks whether there is enough money to upgrade the node's RAM or not, returns true or false, respectively.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {number} index - The index of the node to check if the upgrade can be afforded for it.
 * @returns {boolean} Returns true if upgrade can be afforded, false if not.
 */
function affordRamUpgrade(ns:NS, index:number): boolean {
    return ns.hacknet.getRamUpgradeCost(index, 1) < ns.getServerMoneyAvailable("home");
}

/**
 * Upgrades a node's cores until it reaches the cores that was input.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {number} index - The index of the node to upgrade.
 * @param {number} cores - The cores to upgrade the node to.
 */
async function upgradeNodeCoresTo(ns:NS, index:number, cores:number) {
    while (ns.hacknet.getNodeStats(index).cores < cores) {
        if (affordCoreUpgrade(ns, index)) {
            ns.hacknet.upgradeCore(index, 1);
        } else {
            await ns.sleep(SLEEP_TIME);
        }
    }
}

/**
 * Checks whether there is enough money to upgrade the node's cores or not, returns true or false, respectively.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {number} index - The index of the node to check if the upgrade can be afforded for it.
 * @returns {boolean} Returns true if upgrade can be afforded, false if not.
 */
function affordCoreUpgrade(ns:NS, index:number): boolean {
    return ns.hacknet.getCoreUpgradeCost(index, 1) < ns.getServerMoneyAvailable("home");
}

/**
 * Checks whether or not a node is maxed.
 * 
 * @param {NS} ns - The Netscript API. 
 * @param {number} index - The index of the node to check if it's maxed or not.
 * @returns {boolean} Returns true if the node is maxed, false if not.
 */
function isNodeMaxed(ns:NS, index:number): boolean {
    const nodeStats = ns.hacknet.getNodeStats(index);
    return nodeStats.level === MAX_NODE_LEVEL && nodeStats.ram === MAX_NODE_RAM && nodeStats.cores === MAX_NODE_CORES;
}

/**
 * Prints how to use the script to the terminal.
 * 
 * @param {NS} ns - The Netscript API.
 */
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