import _ from "lodash";
import * as ably from "./external/ably.js"

export class GenericDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.withCredentials = instanceSettings.withCredentials;
    this.headers = {'Content-Type': 'application/json'};
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }

    this.onBatteryStats = [];
    this.onCPUTemp = [];
    this.onCPUMem = [];
    this.onNetworkStats = [];
    this.onDiskIOStats = [];
    this.ablyClient()
  }

  ablyClient() {

    let channel = ably
      .Ably
      .Realtime('44rb_A.hLHdbw:HuDlU-4Z22ESceAd')
      .channels
      .get('Tooling');

    channel.subscribe("onBatteryStats", (message) => {
      this.onBatteryStats.push([message.data.percent, new Date()])
    })
    channel.subscribe("onCPUTemp", (message) => {
      this.onCPUTemp.push([message.data.max, new Date()])
    })

    channel.subscribe("onCPUMem", (message) => {
      this.onCPUMem.push([message.data.used / 1e+6, new Date()])
    })

    channel.subscribe("onNetworkStats", (message) => {
      this.onNetworkStats.push([(message.data[0].tx_bytes) / 1e+6, new Date()])
    })

    channel.subscribe("onDiskIOStats", (message) => {
      this.onDiskIOStats.push([message.data.wIO, new Date()])
    })

  }

  query(options) {

    console.log(options.targets[0]["target"])
    console.log("Battery Stat: ", this.onBatteryStats)
    console.log("DISK IO Write: ", this.onDiskIOStats)
    console.log("CPU Mem: ", this.onCPUMem)
    console.log("CPU Temp: ", this.onCPUTemp)
    console.log("Network: ", this.onNetworkStats)

    return Promise.resolve({

        data: [
          {
            "target": options.targets[0]["target"],
            "datapoints": eval("this."+options.targets[0]["target"])
          }
        ]
    })
  }

  testDatasource() {
    return this.doRequest({
      url: this.url + '/',
      method: 'GET',
    }).then(response => {
      if (response.status === 200) {
        return {status: "success", message: "Data source is working", title: "Success"};
      }
    });
  }

  metricFindQuery(query) {
    return [
      {text: "onBatteryStats", value: "onBatteryStats"},
      {text: "onCPUTemp", value: "onCPUTemp"},
      {text: "onCPUMem", value: "onCPUMem"},
      {text: "onNetworkStats", value: "onNetworkStats"},
      {text: "onDiskIOStats", value: "onDiskIOStats"}
    ]
  }
}
