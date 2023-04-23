import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {
  const target = "" + ns.args[0];
  const moneyThreshold = ns.getServerMaxMoney(target) * 0.8;
  const securityThreshold = ns.getServerMinSecurityLevel(target) * 1.2;
  
  if (ns.getServerMoneyAvailable(target) < moneyThreshold) {
    let grownBy = await ns.grow(target);
    ns.print("INFO: " + target + "'s money was grown by " + grownBy);
  } else if (ns.getServerSecurityLevel(target) > securityThreshold) {
    let weakenedBy = await ns.weaken(target);
    ns.print("INFO: " + target + " was weakened by " + weakenedBy); 
  } else {
    let moneyStolen = await ns.hack;
    ns.print("INFO: Money stolen from " + target + ": " + moneyStolen);
  }
}