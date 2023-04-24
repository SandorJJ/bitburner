import { NS } from '../NetscriptDefinitions';

export async function main(ns: NS) {
    ns.print(getNetwork(ns).length);
}

function getNetwork(ns: NS, root: string = "home", visited:string[] = []): string[] {
    ns.scan(root)
    .filter(host => !visited.includes(host))
    .forEach(host => {
        visited.push(host);
        getNetwork(ns, host, visited);
    })

    return visited;
}