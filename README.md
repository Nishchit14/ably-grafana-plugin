## system-monitor

Monitor your system with the help of Ably(Real Time Client)

Below Events can be monitor:

 * `onBatteryStats` - return battery percentage
 * `onCPUTemp` - return main CPU temperature
 * `onCPUMem` - return write data size on the memory in `MB/second`
 * `onNetworkStats` - return transfer data size on the network in `MB`
 * `onDiskIOStats` - return write data size on the disk in `MB/second`
 
## Prerequisite

 * Install npm package: `npm i -g express-ably-channels`
 * Create an Ably Account

## Installation

To install this plugin using the `grafana-cli` tool:
```
sudo grafana-cli plugins install system-monitor
sudo service grafana-server restart
```

## Usage

 * Open **Grafana** from browser
 * Add data source **SystemMonitor**
 * After selecting data source, enter ably key
 * Then save and add new Dashboard
 * From New Dashboard default **New Panel** will generate
 * Then click on **Add Query**
 * From **Query** Panel, select require events


![Img](https://github.com/Nishchit14/ably-grafana-plugin/blob/master/Screenshot/SystemMonitor.png?raw=true)
