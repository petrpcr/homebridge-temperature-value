var Service, Characteristic;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory("homebridge-temperature-value", "TemperatureValue", TemperatureValue);
}

class TemperatureValue{
    constructor(log,config){
        this.name = config.name;
        this.inputfilename = config.inputfilename;
        this.manufacturer = config.manufacturer || "medvedi.eu"
        this.model = config.model || "RF433Mhz"
        this.serial = config.serial || "1234"
    }

    getServices() {
        var services = [],
            informationService = new Service.AccessoryInformation();

        informationService
            .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
            .setCharacteristic(Characteristic.Model, this.model)
            .setCharacteristic(Characteristic.SerialNumber, this.serial);
        services.push(informationService);

        this.temperatureService = new Service.TemperatureSensor(this.name);
        this.temperatureService
            .getCharacteristic(Characteristic.CurrentTemperature)
            .setProps({ minValue: -273, maxValue: 200 })
            .on("get", this.getTemperatureState.bind(this));
        services.push(this.temperatureService);

        

        return services;

    }
    getTemperatureState(){
        return 15
    }
}