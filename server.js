const SerialPort = require("serialport");
const sPortName = "COM4";
const nBaudRate = 115200;

listOfPorts = () => {
  // list of ports
  SerialPort.list().then((aPort) => {
    aPort.forEach((oPort) => {
      console.log(oPort);
    });
  });
};

// listOfPorts();

const myPort = new SerialPort(sPortName, {
  baudRate: nBaudRate,
});
connect = () => {
  let Readline = SerialPort.parsers.Readline; // make instance of Readline parser
  let parser = myPort.pipe(new Readline({ delimiter: "\n" })); // pipe the serial stream to the parser

  myPort.on("open", () =>
    console.log(`Port ${sPortName} open. Data rate: ${nBaudRate}\n`)
  );
  parser.on("data", readSerialData);
  myPort.on("close", () => console.log(`Port ${sPortName} closed.`));
  myPort.on("error", (error) =>
    console.log(`Serial port ${sPortName} error: ${error}`)
  );
};

function readSerialData(data) {
  console.log(`data: ${data}`);
}

connect();
