import { getYear } from 'date-fns';
import { create } from 'zustand';

export interface FilterState {
  
  carType: string[];
  engineType: string[];
  bodyType: string[];
  popularFeatures: {
    plugIn: boolean;
    allWheelDrive: boolean;
    towBar: boolean;
  };
  brandAndModel: {
    brand: string;
    model: string;
  };
  modelSpecification: string;
  velocityType: string;
  yearRange: [number, number];
  kilometersRange: [number, number];
  price: {
    priceRange: [number, number];
    options: {
      VATdeduction: boolean;
      TaxExemption: boolean;
      normal: boolean;
    };
  };
  accelerationRange: [number, number];
  maxSpeedRange: [number, number];
  peopleRange: [number, number];
  doorRange: [number, number];
  powerRange: [number, number];
  powerType: string;
  fuelConsumption: {
    consumptionRange: [number, number];
    type: string;
  };
  inspection: {
    month: string;
    year: string;
  };
  commissioningData: {
    month: string;
    year: string;
  };
  batteryCapacityRange: [number, number];
  eletricAutonomyRange: [number, number];
  eletricConsumption: {
    consumptionRange: [number, number];
    type: string;
  };
  loadType: string[];
  interiorType: string[];
  eletronicType: string[];
  securityType: string[];
  othersType: string[];
  setCarType: (type: string) => void;
  setEngineType: (type: string) => void;
  setBodyType: (type: string) => void;
  toggleFeature: (feature: keyof FilterState['popularFeatures']) => void;
  setBrandAndModel: (
    option: keyof FilterState['brandAndModel'],
    value: string
  ) => void;
  setModelSpecification: (value: string) => void;
  setVelocityType: (type: string) => void;
  setYearsRange: (values: [number, number]) => void;
  setKilometersRange: (values: [number, number]) => void;
  setPriceRange: (value: [number, number]) => void;
  togglePriceOptions: (option: keyof FilterState['price']['options']) => void;
  setAccelerationRange: (values: [number, number]) => void;
  setMaxSpeedRange: (values: [number, number]) => void;
  setPeopleRange: (values: [number, number]) => void;
  setDoorRange: (values: [number, number]) => void;
  setPowerRange: (values: [number, number]) => void;
  setPowerType: (value: string) => void;
  setFuelConsumptionRange: (value: [number, number]) => void;
  setFuelConsumptionType: (type: string) => void;
  setInspection: (
    option: keyof FilterState['inspection'],
    value: string
  ) => void;
  setComissioningData: (
    option: keyof FilterState['commissioningData'],
    value: string
  ) => void;
  setBatteryCapacityRange: (values: [number, number]) => void;
  setEletricAutonomyRange: (values: [number, number]) => void;
  setEletricConsumptionRange: (value: [number, number]) => void;
  setEletricConsumptionType: (type: string) => void;
  setLoadType: (type: string) => void;
  setInteriorType: (type: string) => void;
  setEletronicType: (type: string) => void;
  setSecurityType: (type: string) => void;
  setOthersType: (type: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  carType: [],
  engineType: [],
  bodyType: [],
  popularFeatures: {
    plugIn: false,
    allWheelDrive: false,
    towBar: false
  },
  brandAndModel: {
    brand: '',
    model: ''
  },
  modelSpecification: '',
  velocityType: 'any',
  yearRange: [1910, getYear(new Date())],
  kilometersRange: [0, 600000],
  price: {
    priceRange: [1, 450000],
    options: {
      normal: false,
      TaxExemption: false,
      VATdeduction: false
    }
  },
  accelerationRange: [1, 10],
  maxSpeedRange: [10, 500],
  peopleRange: [1, 12],
  doorRange: [1, 7],
  powerRange: [50, 500],
  powerType: 'Kw',
  fuelConsumption: {
    consumptionRange: [1, 30],
    type: 'connected'
  },
  inspection: {
    month: '',
    year: ''
  },
  commissioningData: {
    month: '',
    year: ''
  },
  batteryCapacityRange: [10, 200],
  eletricAutonomyRange: [10, 1200],
  eletricConsumption: {
    consumptionRange: [1, 30],
    type: 'connected'
  },
  loadType: [],
  interiorType: [],
  eletronicType: [],
  securityType: [],
  othersType: [],
  setCarType: (type) =>
    set((state) => ({
      carType: state.carType.includes(type)
        ? state.carType.filter((t) => t !== type)
        : [...state.carType, type]
    })),
  setEngineType: (type) =>
    set((state) => ({
      engineType: state.engineType.includes(type)
        ? state.engineType.filter((t) => t !== type)
        : [...state.engineType, type]
    })),
  setBodyType: (type) =>
    set((state) => ({
      bodyType: state.bodyType.includes(type)
        ? state.bodyType.filter((t) => t !== type)
        : [...state.bodyType, type]
    })),
  toggleFeature: (feature) =>
    set((state) => ({
      popularFeatures: {
        ...state.popularFeatures,
        [feature]: !state.popularFeatures[feature]
      }
    })),
  setBrandAndModel: (option, value) =>
    set((state) => ({
      brandAndModel: {
        ...state.brandAndModel,
        [option]: value
      }
    })),
  setModelSpecification: (value) =>
    set({
      modelSpecification: value
    }),
  setVelocityType: (type) =>
    set({
      velocityType: type
    }),
  setYearsRange: (year) =>
    set({
      yearRange: year
    }),
  setKilometersRange: (kilometers) =>
    set({
      kilometersRange: kilometers
    }),
  setPriceRange: (price) =>
    set((state) => ({
      price: {
        ...state.price,
        priceRange: price
      }
    })),
  togglePriceOptions: (option) =>
    set((state) => ({
      price: {
        ...state.price,
        options: {
          ...state.price.options,
          [option]: !state.price.options[option]
        }
      }
    })),
  setAccelerationRange: (accelerations) =>
    set({
      accelerationRange: accelerations
    }),
  setMaxSpeedRange: (maxSpeeds) =>
    set({
      maxSpeedRange: maxSpeeds
    }),
  setPeopleRange: (people) =>
    set({
      peopleRange: people
    }),
  setDoorRange: (door) =>
    set({
      doorRange: door
    }),
  setPowerRange: (power) =>
    set({
      powerRange: power
    }),
  setPowerType: (type) =>
    set({
      powerType: type
    }),
  setFuelConsumptionRange: (consumption) =>
    set((state) => ({
      fuelConsumption: {
        ...state.fuelConsumption,
        consumptionRange: consumption
      }
    })),
  setFuelConsumptionType: (type) =>
    set((state) => ({
      fuelConsumption: {
        ...state.fuelConsumption,
        type: type
      }
    })),
  setInspection: (option, value) =>
    set((state) => ({
      inspection: {
        ...state.inspection,
        [option]: value
      }
    })),
  setComissioningData: (option, value) =>
    set((state) => ({
      commissioningData: {
        ...state.commissioningData,
        [option]: value
      }
    })),
  setBatteryCapacityRange: (batteryCapacity) =>
    set({
      batteryCapacityRange: batteryCapacity
    }),
  setEletricAutonomyRange: (eletricAutonomy) =>
    set({
      eletricAutonomyRange: eletricAutonomy
    }),
  setEletricConsumptionRange: (consumption) =>
    set((state) => ({
      eletricConsumption: {
        ...state.eletricConsumption,
        consumptionRange: consumption
      }
    })),
  setEletricConsumptionType: (type) =>
    set((state) => ({
      eletricConsumption: {
        ...state.eletricConsumption,
        type: type
      }
    })),
  setLoadType: (type) =>
    set((state) => ({
      loadType: state.loadType.includes(type)
        ? state.loadType.filter((t) => t !== type)
        : [...state.loadType, type]
    })),
  setInteriorType: (type) =>
    set((state) => ({
      interiorType: state.interiorType.includes(type)
        ? state.interiorType.filter((t) => t !== type)
        : [...state.interiorType, type]
    })),
  setEletronicType: (type) =>
    set((state) => ({
      eletronicType: state.eletronicType.includes(type)
        ? state.eletronicType.filter((t) => t !== type)
        : [...state.eletronicType, type]
    })),
  setSecurityType: (type) =>
    set((state) => ({
      securityType: state.securityType.includes(type)
        ? state.securityType.filter((t) => t !== type)
        : [...state.securityType, type]
    })),
  setOthersType: (type) =>
    set((state) => ({
      othersType: state.othersType.includes(type)
        ? state.othersType.filter((t) => t !== type)
        : [...state.othersType, type]
    })),
  resetFilters: () =>
    set({
      carType: [],
      engineType: [],
      bodyType: [],
      popularFeatures: { plugIn: false, allWheelDrive: false, towBar: false },
      brandAndModel: {
        brand: '',
        model: ''
      },
      modelSpecification: '',
      velocityType: 'any',
      yearRange: [1910, getYear(new Date())],
      kilometersRange: [0, 600000],
      price: {
        priceRange: [0, 450000],
        options: {
          normal: false,
          TaxExemption: false,
          VATdeduction: false
        }
      },
      accelerationRange: [1, 10],
      maxSpeedRange: [10, 500],
      peopleRange: [1, 12],
      doorRange: [1, 7],
      powerRange: [50, 500],
      powerType: 'Kw',
      fuelConsumption: {
        consumptionRange: [1, 30],
        type: 'connected'
      },
      inspection: {
        month: '',
        year: ''
      },
      commissioningData: {
        month: '',
        year: ''
      },
      batteryCapacityRange: [10, 200],
      eletricAutonomyRange: [10, 1200],
      eletricConsumption: {
        consumptionRange: [1, 30],
        type: 'connected'
      },
      loadType: [],
      interiorType: [],
      eletronicType: [],
      securityType: [],
      othersType: []
    })
}));
