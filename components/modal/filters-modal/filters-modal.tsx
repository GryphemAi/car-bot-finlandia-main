import React from 'react';
import { Checkbox } from '../../ui/checkbox';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Label } from '../../ui/label';
import { Card, CardContent } from '../../ui/card';
import { Dialog, DialogContent } from '../../ui/dialog';
import { Combobox } from '../../combobox';
import { FilterState, useFilterStore } from '@/lib/store';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { DualRangeSlider } from '../../ui/dual-range-slider';
import { getYear } from 'date-fns';
import {
  bodyTypes,
  brands,
  carTypes,
  commissioningYears,
  eletronicTypes,
  engineTypes,
  inspectionYears,
  interiorTypes,
  loadTypes,
  models,
  months,
  othersTypes,
  powerTypes,
  priceTypes,
  securityTypes
} from './data';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoCard = ({
  children,
  title,
  className
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => (
  <Card>
    <CardContent className="my-0 flex flex-col justify-center p-2">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className={cn('mb-4 grid grid-cols-2 gap-4 px-0 py-4', className)}>
        {children}
      </div>
    </CardContent>
  </Card>
);

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const {
    carType,
    engineType,
    bodyType,
    popularFeatures,
    brandAndModel,
    modelSpecification,
    velocityType,
    yearRange,
    kilometersRange,
    price,
    accelerationRange,
    maxSpeedRange,
    peopleRange,
    doorRange,
    powerRange,
    powerType,
    fuelConsumption,
    inspection,
    commissioningData,
    batteryCapacityRange,
    eletricAutonomyRange,
    eletricConsumption,
    loadType,
    interiorType,
    eletronicType,
    securityType,
    othersType,
    setCarType,
    setEngineType,
    setBodyType,
    toggleFeature,
    setBrandAndModel,
    setModelSpecification,
    setVelocityType,
    setYearsRange,
    setKilometersRange,
    setPriceRange,
    togglePriceOptions,
    setAccelerationRange,
    setMaxSpeedRange,
    setPeopleRange,
    setDoorRange,
    setPowerRange,
    setPowerType,
    setFuelConsumptionRange,
    setFuelConsumptionType,
    setInspection,
    setComissioningData,
    setBatteryCapacityRange,
    setEletricAutonomyRange,
    setEletricConsumptionRange,
    setEletricConsumptionType,
    setLoadType,
    setInteriorType,
    setEletronicType,
    setSecurityType,
    setOthersType,
    resetFilters
  } = useFilterStore();

  const renderContent = () => (
    <div className="mt-4 flex h-full w-full flex-col justify-between gap-4">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <InfoCard title="Suositut Ominaisuudet">
          <div className="flex gap-2">
            <Switch
              id="plugIn"
              checked={popularFeatures.plugIn}
              onCheckedChange={() => toggleFeature('plugIn')}
            />
            <Label htmlFor="plugIn">Latausliitinliitin</Label>
          </div>
          <div className="flex gap-2">
            <Switch
              id="allWheelDrive"
              checked={popularFeatures.allWheelDrive}
              onCheckedChange={() => toggleFeature('allWheelDrive')}
            />
            <Label htmlFor="allWheelDrive">Neliveto</Label>
          </div>
          <div className="flex gap-2">
            <Switch
              id="towBar"
              checked={popularFeatures.towBar}
              onCheckedChange={() => toggleFeature('towBar')}
            />
            <Label htmlFor="towBar">Vetokoukku</Label>
          </div>
        </InfoCard>

        <InfoCard title="Auton Tyyppi">
          {carTypes.map((type) => (
            <div key={type} className="flex gap-2">
              <Checkbox
                id={type}
                checked={carType.includes(type)}
                onCheckedChange={() => setCarType(type)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </InfoCard>

        <InfoCard title="Moottori Tyyppi">
          {engineTypes.map((type) => (
            <div key={type} className="flex gap-2">
              <Checkbox
                id={type}
                checked={engineType.includes(type)}
                onCheckedChange={() => setEngineType(type)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </InfoCard>

        <InfoCard title="Korin Tyyppi" className="max-h-28 overflow-y-auto">
          {bodyTypes.map((type) => (
            <div key={type} className="flex gap-2">
              <Checkbox
                id={type}
                checked={bodyType.includes(type)}
                onCheckedChange={() => setBodyType(type)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </InfoCard>

        <InfoCard title="Merkki ja Malli">
          <div className="flex w-full flex-col gap-2">
            <Label>Merkki</Label>
            <Combobox
              data={brands.map((brand) => ({
                value: brand.id,
                label: brand.name
              }))}
              search
              value={brandAndModel.brand}
              inputPlaceHolder="Etsi merkki"
              onSearchChange={(value) => {}}
              onSelectChange={(value) => {}}
              onValueChange={(label) => setBrandAndModel('brand', label)}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label>Malli</Label>
            <Combobox
              data={models.map((model) => ({
                value: model.id,
                label: model.name
              }))}
              search
              value={brandAndModel.model}
              inputPlaceHolder="Etsi malli"
              onSearchChange={(value) => {}}
              onSelectChange={(value) => {}}
              onValueChange={(label) => setBrandAndModel('model', label)}
            />
          </div>
        </InfoCard>

        <InfoCard title="Mallin Määritys" className="flex">
          <div className="flex w-full flex-col gap-2">
            <Label>Määritys</Label>
            <Input
              type="text"
              value={modelSpecification}
              placeholder="Etsi määrite, esimerkiksi Pitkä kantama"
              onChange={(e) => setModelSpecification(e.target.value)}
            />
          </div>
        </InfoCard>

        <InfoCard title="Nopeudet" className="flex">
          <RadioGroup
            value={velocityType}
            onValueChange={(value) => setVelocityType(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="r1" />
              <Label htmlFor="r1">Ei väliä</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auto" id="r2" />
              <Label htmlFor="r2">Automaattinen</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="r3" />
              <Label htmlFor="r3">Manuaalinen</Label>
            </div>
          </RadioGroup>
        </InfoCard>

        <InfoCard title="Vuosi" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={yearRange[0]}
              min={1910}
              max={getYear(new Date())}
              onChange={(e) =>
                setYearsRange([Math.abs(Number(e.target.value)), yearRange[1]])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={yearRange[1]}
              min={1910}
              max={getYear(new Date())}
              onChange={(e) =>
                setYearsRange([yearRange[0], Math.abs(Number(e.target.value))])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={yearRange}
            onValueChange={setYearsRange}
            min={1910}
            max={getYear(new Date())}
            step={1}
          />
        </InfoCard>

        <InfoCard title="Kilometrimäärä" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={kilometersRange[0]}
              min={0}
              max={600000}
              onChange={(e) =>
                setKilometersRange([
                  Math.abs(Number(e.target.value)),
                  kilometersRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={kilometersRange[1]}
              min={0}
              max={600000}
              onChange={(e) =>
                setKilometersRange([
                  kilometersRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={kilometersRange}
            onValueChange={setKilometersRange}
            min={0}
            max={600000}
            step={5000}
          />
        </InfoCard>

        <InfoCard title="Hinta" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={price.priceRange[0]}
              min={1}
              max={450000}
              onChange={(e) =>
                setPriceRange([
                  Math.abs(Number(e.target.value)),
                  price.priceRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={price.priceRange[1]}
              min={1}
              max={450000}
              onChange={(e) =>
                setPriceRange([
                  price.priceRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={price.priceRange}
            onValueChange={(values) => setPriceRange([values[0], values[1]])}
            min={1}
            max={450000}
            step={100}
          />
          <div className="mb-2 grid grid-cols-2 gap-2">
            {priceTypes.map((type) => {
              const option = type[
                'value'
              ] as keyof FilterState['price']['options'];

              return (
                <div key={type.value} className="flex gap-2">
                  <Checkbox
                    id={type.value}
                    checked={price.options[option]}
                    onCheckedChange={() => togglePriceOptions(option)}
                  />
                  <Label htmlFor={type.value}>{type.label}</Label>
                </div>
              );
            })}
          </div>
        </InfoCard>

        <InfoCard title="Polttoaineenkulutus" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={fuelConsumption.consumptionRange[0]}
              min={1}
              max={30}
              onChange={(e) =>
                setFuelConsumptionRange([
                  Math.abs(Number(e.target.value)),
                  fuelConsumption.consumptionRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={fuelConsumption.consumptionRange[1]}
              min={1}
              max={30}
              onChange={(e) =>
                setFuelConsumptionRange([
                  fuelConsumption.consumptionRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={fuelConsumption.consumptionRange}
            onValueChange={(values) =>
              setFuelConsumptionRange([values[0], values[1]])
            }
            min={1}
            max={30}
            step={1}
          />
          <div className="mb-2 grid grid-cols-2 gap-2">
            <RadioGroup
              value={fuelConsumption.type}
              onValueChange={(value) => setFuelConsumptionType(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="connected" id="r1" />
                <Label htmlFor="r1">Yhdistetty</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="city" id="r2" />
                <Label htmlFor="r2">Kaupunki</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rodovia" id="r3" />
                <Label htmlFor="r3">Moottoritie</Label>
              </div>
            </RadioGroup>
          </div>
        </InfoCard>

        <InfoCard
          title="Kiihdytys (0-100 km, sekuntia)"
          className="flex flex-col"
        >
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={accelerationRange[0]}
              min={1}
              max={10}
              onChange={(e) =>
                setAccelerationRange([
                  Math.abs(Number(e.target.value)),
                  accelerationRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={accelerationRange[1]}
              min={1}
              max={10}
              onChange={(e) =>
                setAccelerationRange([
                  accelerationRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={accelerationRange}
            onValueChange={setAccelerationRange}
            min={1}
            max={10}
            step={1}
          />
        </InfoCard>

        <InfoCard title="Maksimi nopeus (km/h)" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={maxSpeedRange[0]}
              min={10}
              max={500}
              onChange={(e) =>
                setMaxSpeedRange([
                  Math.abs(Number(e.target.value)),
                  maxSpeedRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={maxSpeedRange[1]}
              min={10}
              max={500}
              onChange={(e) =>
                setMaxSpeedRange([
                  maxSpeedRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={maxSpeedRange}
            onValueChange={setMaxSpeedRange}
            min={10}
            max={500}
            step={10}
          />
        </InfoCard>

        <InfoCard title="Teho" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={powerRange[0]}
              min={50}
              max={500}
              onChange={(e) =>
                setPowerRange([Math.abs(Number(e.target.value)), powerRange[1]])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={powerRange[1]}
              min={50}
              max={500}
              onChange={(e) =>
                setPowerRange([powerRange[0], Math.abs(Number(e.target.value))])
              }
              className="ml-2"
            />
          </div>
          <div className="flex flex-row gap-2">
            <DualRangeSlider
              className="mt-2"
              value={powerRange}
              onValueChange={setPowerRange}
              min={50}
              max={500}
              step={10}
            />

            <Combobox
              data={powerTypes.map((type) => ({
                value: type.id,
                label: type.name
              }))}
              value={powerType}
              onSelectChange={(value) => {}}
              onValueChange={(label) => setPowerType(label)}
            />
          </div>
        </InfoCard>

        <InfoCard title="Henkilöiden määrä" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={peopleRange[0]}
              min={1}
              max={12}
              onChange={(e) =>
                setPeopleRange([
                  Math.abs(Number(e.target.value)),
                  peopleRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={peopleRange[1]}
              min={1}
              max={12}
              onChange={(e) =>
                setPeopleRange([
                  peopleRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={peopleRange}
            onValueChange={setPeopleRange}
            min={1}
            max={12}
            step={1}
          />
        </InfoCard>

        <InfoCard title="Ovien määrä" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={doorRange[0]}
              min={1}
              max={7}
              onChange={(e) =>
                setDoorRange([Math.abs(Number(e.target.value)), doorRange[1]])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={doorRange[1]}
              min={1}
              max={7}
              onChange={(e) =>
                setDoorRange([doorRange[0], Math.abs(Number(e.target.value))])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={doorRange}
            onValueChange={setDoorRange}
            min={1}
            max={7}
            step={1}
          />
        </InfoCard>

        <InfoCard title="Tarkastus">
          <div className="flex w-full flex-col gap-2">
            <Combobox
              data={months.map((month) => ({
                value: month.id,
                label: month.name
              }))}
              value={inspection.month}
              onSelectChange={(value) => {}}
              onValueChange={(label) => setInspection('month', label)}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Combobox
              data={inspectionYears.map((year) => ({
                value: String(year),
                label: String(year)
              }))}
              value={String(inspection.year)}
              onSelectChange={(value) => {}}
              onValueChange={(label) => setInspection('year', label)}
            />
          </div>
        </InfoCard>

        <InfoCard title="Komission tiedot">
          <div className="flex w-full flex-col gap-2">
            <Combobox
              data={months.map((month) => ({
                value: month.id,
                label: month.name
              }))}
              value={commissioningData.month}
              onSelectChange={(value) => {}}
              onValueChange={(label) => setComissioningData('month', label)}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Combobox
              data={commissioningYears.map((year) => ({
                value: String(year),
                label: String(year)
              }))}
              value={String(commissioningData.year)}
              onSelectChange={(value) => {}}
              onValueChange={(label) => setComissioningData('year', label)}
            />
          </div>
        </InfoCard>

        <InfoCard title="Akun kapasiteetti (kW/h)" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={batteryCapacityRange[0]}
              min={10}
              max={200}
              onChange={(e) =>
                setBatteryCapacityRange([
                  Math.abs(Number(e.target.value)),
                  batteryCapacityRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={batteryCapacityRange[1]}
              min={10}
              max={200}
              onChange={(e) =>
                setBatteryCapacityRange([
                  batteryCapacityRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={batteryCapacityRange}
            onValueChange={setBatteryCapacityRange}
            min={10}
            max={200}
            step={10}
          />
        </InfoCard>

        <InfoCard
          title="Sähköinen toimintamatka (km)"
          className="flex flex-col"
        >
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={eletricAutonomyRange[0]}
              min={10}
              max={1200}
              onChange={(e) =>
                setEletricAutonomyRange([
                  Math.abs(Number(e.target.value)),
                  eletricAutonomyRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={eletricAutonomyRange[1]}
              min={10}
              max={1200}
              onChange={(e) =>
                setEletricAutonomyRange([
                  eletricAutonomyRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={eletricAutonomyRange}
            onValueChange={setEletricAutonomyRange}
            min={10}
            max={1200}
            step={10}
          />
        </InfoCard>

        <InfoCard title="Sähkönkulutus (kWh/100 km)" className="flex flex-col">
          <div className="mb-2 flex items-center">
            <Input
              type="number"
              value={eletricConsumption.consumptionRange[0]}
              min={1}
              max={30}
              onChange={(e) =>
                setEletricConsumptionRange([
                  Math.abs(Number(e.target.value)),
                  eletricConsumption.consumptionRange[1]
                ])
              }
              className="mr-2"
            />
            <span>-</span>
            <Input
              type="number"
              value={eletricConsumption.consumptionRange[1]}
              min={1}
              max={30}
              onChange={(e) =>
                setEletricConsumptionRange([
                  eletricConsumption.consumptionRange[0],
                  Math.abs(Number(e.target.value))
                ])
              }
              className="ml-2"
            />
          </div>
          <DualRangeSlider
            className="mt-2"
            value={eletricConsumption.consumptionRange}
            onValueChange={(values) =>
              setEletricConsumptionRange([values[0], values[1]])
            }
            min={1}
            max={30}
            step={1}
          />
          <div className="mb-2 grid grid-cols-2 gap-2">
            <RadioGroup
              value={eletricConsumption.type}
              onValueChange={(value) => setEletricConsumptionType(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="connected" id="r1" />
                <Label htmlFor="r1">Yhteydessä</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="city" id="r2" />
                <Label htmlFor="r2">Kaupunki</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rodovia" id="r3" />
                <Label htmlFor="r3">Moottoritie</Label>
              </div>
            </RadioGroup>
          </div>
        </InfoCard>

        <InfoCard title="Kuormatyyppi">
          {loadTypes.map((type) => (
            <div key={type} className="flex gap-2">
              <Checkbox
                id={type}
                checked={loadType.includes(type)}
                onCheckedChange={() => setLoadType(type)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </InfoCard>

        <div className="col-span-2">
          <InfoCard title="Sisätila">
            {interiorTypes.map((type) => (
              <div key={type} className="flex gap-2">
                <Checkbox
                  id={type}
                  checked={interiorType.includes(type)}
                  onCheckedChange={() => setInteriorType(type)}
                />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
          </InfoCard>
        </div>

        <div className="col-span-2">
          <InfoCard title="Elektroniikka">
            {eletronicTypes.map((type) => (
              <div key={type} className="flex gap-2">
                <Checkbox
                  id={type}
                  checked={eletronicType.includes(type)}
                  onCheckedChange={() => setEletronicType(type)}
                />
                <Label htmlFor={type}>{type}</Label>
              </div>
            ))}
          </InfoCard>
        </div>

        <InfoCard title="Turvallisuus">
          {securityTypes.map((type) => (
            <div key={type} className="flex gap-2">
              <Checkbox
                id={type}
                checked={securityType.includes(type)}
                onCheckedChange={() => setSecurityType(type)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </InfoCard>

        <InfoCard title="Muut">
          {othersTypes.map((type) => (
            <div key={type} className="flex gap-2">
              <Checkbox
                id={type}
                checked={othersType.includes(type)}
                onCheckedChange={() => setOthersType(type)}
              />
              <Label htmlFor={type}>{type}</Label>
            </div>
          ))}
        </InfoCard>
      </div>

      <div className="mt-6 flex w-full gap-4">
        <Button
          onClick={() => {
            resetFilters();
          }}
          className="flex-1 bg-blue-600 text-white"
        >
          Tyhjennä suodattimet
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
          className="flex-1 bg-blue-600 text-white"
        >
          Käytä suodattimia
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-full min-h-full overflow-y-auto p-6 md:min-h-[auto] md:max-w-4xl">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
