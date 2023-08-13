import { NS } from "../NetscriptDefinitions";
import { getServers } from "./server/network";

export async function main(ns: NS) {
  const servers = getServers(ns).filter((server) => ns.getServer(server).moneyMax === 0)
  .filter((server) => ns.getServer(server).maxRam === 0);
  ns.tprintf("" + servers);
}
