import { TelemetryClient } from './telemetry-client';

class TelemetryDiagnosticControls {
  constructor() {
    this._diagnosticChannelConnectionString = () => '*111#';
    this._diagnosticInfo = '';
    this._telemetryClient = new TelemetryClient();
  }

  readDiagnosticInfo() {
    return this._diagnosticInfo;
  }

  writeDiagnosticInfo(newValue) {
    this._diagnosticInfo = newValue;
  }

  checkTransmission() {
    this._diagnosticInfo = '';

    this._telemetryClient.disconnect();

    let retryLeft = 3;
    while (this._telemetryClient.onlineStatus() === false && retryLeft > 0) {
      this._telemetryClient.connect(this._diagnosticChannelConnectionString);
      retryLeft -= 1;
    }

    if (this._telemetryClient.onlineStatus() === false) {
      throw 'Unable to connect';
    }

    this._telemetryClient.send(TelemetryClient.diagnosticMessage());
    this._diagnosticInfo = this._telemetryClient.receive();
  }
}

export {
  TelemetryDiagnosticControls,
};
