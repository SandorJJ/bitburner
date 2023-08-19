# Bitburner
- - -
My Bitburner scripts.
- - - 
## Aspects of Bitburner
### [Hacking](./src/hack) - Scripts dealing with hacking.
- [hack.ts](./src/hack/hack.ts) - Hacks, grows and weakens a server.
- [target.ts](./src/hack/target.ts) - Determines the best target.
- [deploy.ts](./src/hack/deploy.ts) - Deploys a script on all servers with a target server.
- [root.ts](./src/hack/root.ts) - Gains root access to all possible servers.
- [terminate.ts](./src/hack/terminate.ts) - Stops all running scripts.

### [Servers](./src/server) - Scripts dealing with servers.
- [network.ts](./src/server/network.ts) - Scans for all the servers.

### [Purchased Servers](./src/pserver) - Scripts dealing with purchased servers.
- [purchase.ts](./src/pserver/purchase.ts) - Purchases the specified amount of servers with a specified amount of ram.
- [upgrade.ts](./src/pserver/upgrade.ts) - Upgrades all servers to a specific ram. 

### [Hacknet](./src/hacknet) - Scripts dealing with the hacknet.
- [purchase.ts](./src/hacknet/purchase.ts) - Purchases the specified amount of nodes.

## Standards
### Script Usage
- Scripts are command line tools that behave differently depending on the options that were passed in.
- Launching a script without any options will automatically display the help information.
- Example: __program__ -(a arg)(b arg1)(c arg2)
- Example: __program1__ -xyz

### Script Help
1. Usage of the script.
2. Information about what the script does.
3. Details of the script options.
