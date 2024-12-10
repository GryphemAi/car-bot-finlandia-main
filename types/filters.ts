export interface VehicleFilters {
  basicInfo: {
    vehicleType: string[];
    fuelType: string[];
    bodyType: string[];
    transmission: string;
    year: {
      min: number;
      max: number;
    };
    price: {
      min: number;
      max: number;
    };
    mileage: {
      min: number;
      max: number;
    };
  };
  technicalInfo: {
    engineSize: {
      min: number;
      max: number;
    };
    co2Emissions: {
      min: number;
      max: number;
    };
    power: {
      min: number;
      max: number;
      unit: string;
    };
    torque: {
      min: number;
      max: number;
    };
    towingWeight: {
      min: number;
      max: number;
    };
    weight: {
      min: number;
      max: number;
    };
    acceleration: {
      min: number;
      max: number;
    };
    passengers: number;
    doors: number;
  };
  electricInfo: {
    batteryCapacity: {
      min: number;
      max: number;
    };
    range: {
      min: number;
      max: number;
    };
    chargingTypes: string[];
    chargingPower: {
      ac: {
        min: number;
        max: number;
      };
      dc: {
        min: number;
        max: number;
      };
    };
    batteryWarranty: {
      years: number;
      kilometers: number;
    };
  };
  equipment: {
    interior: string[];
    electronics: string[];
    safety: string[];
  };
  color: {
    paint: string[];
    type: string;
  };
}
