import { Sensor } from './sensor';

class Alarm {
  constructor() {
    this._lowPressureThreshold = 17;
    this._highPressureThreshold = 21;
    this._sensor = new Sensor();
    this._alarmOn = false;
  }

  check() {
    const psiPressureValue = this._sensor.popNextPressurePsiValue();

    if (psiPressureValue < this._lowPressureThreshold
      || this._highPressureThreshold < psiPressureValue) {
      this._alarmOn = true;
    }
  }

  alarmOn() {
    return this._alarmOn;
  }
}

export {
  Alarm,
};
