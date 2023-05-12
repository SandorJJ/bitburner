import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {
  const target = "" + ns.args[0];
  const moneyThreshold = ns.getServerMaxMoney(target) * 0.75;
  const securityThreshold = ns.getServerMinSecurityLevel(target) + 5;
  
  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThreshold) {
      let weakenedBy = await ns.weaken(target);
      ns.print("INFO\n" + target + " was weakened by " + weakenedBy); 
    } else if (ns.getServerMoneyAvailable(target) < moneyThreshold) {
      let grownBy = (await ns.grow(target) - 1) * 100;
      let securityLevel = ns.getServerSecurityLevel(target);
      ns.print("WARN:\n" + target + "'s money was grown by " + grownBy + "% (Security: " + securityLevel + ")");
    } else {
      let moneyStolen = await ns.hack(target);
      ns.print("SUCCESS:\nMoney stolen from " + target + ": " + moneyStolen);      
    }
  }
}