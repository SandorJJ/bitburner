import { NS } from "../NetscriptDefinitions";
import { getTarget } from "./hack/target";

export async function main(ns: NS) { 
  const target = getTarget(ns);
  ns.exec("hack/deploy.js", "home", 1, target);
}
