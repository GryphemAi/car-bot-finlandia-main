"use client";

import { useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
const geoUrlDetailed = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

// Dados dos países e cidades
const countryData = [
  {
    name: "Finland",
    color: "#3B82F6",
    percentage: 100,
    coordinates: [27, 65],
    cities: [
      { 
        name: "Helsinki",
        coordinates: [24.9384, 60.1699],
        percentage: 45,
        color: "#3B82F6", // Azul
        boundingBox: [24.7384, 59.9699, 25.1384, 60.3699]
      },
      { 
        name: "Tampere",
        coordinates: [23.7610, 61.4981],
        percentage: 25,
        color: "#10B981", // Verde
        boundingBox: [23.5610, 61.2981, 23.9610, 61.6981]
      },
      { 
        name: "Turku",
        coordinates: [22.2666, 60.4518],
        percentage: 20,
        color: "#F59E0B", // Amarelo
        boundingBox: [22.0666, 60.2518, 22.4666, 60.6518]
      },
      { 
        name: "Oulu",
        coordinates: [25.4715, 65.0126],
        percentage: 10,
        color: "#EC4899", // Rosa
        boundingBox: [25.2715, 64.8126, 25.6715, 65.2126]
      }
    ]
  }
];

// Configurações de zoom para cada nível
const zoomLevels = {
  world: {
    zoom: 1,
    center: [0, 30],
    scale: 150 // Aumentado para mostrar o mapa mundi completo
  },
  country: {
    zoom: 6,
    scale: 1000
  },
  city: {
    zoom: 25,
    scale: 8000
  }
};

export function WorldMap() {
  const [view, setView] = useState({
    type: "world",
    zoom: zoomLevels.world.zoom,
    center: zoomLevels.world.center,
    scale: zoomLevels.world.scale,
    selectedCountry: null,
    selectedCity: null,
    canSelectCity: false // Controle para permitir seleção de cidade
  });

  const handleCountryClick = useCallback((country) => {
    if (view.type === "world") {
      // Primeiro zoom no país - Visão completa
      setView({
        type: "country",
        zoom: zoomLevels.country.zoom,
        center: country.coordinates,
        scale: zoomLevels.country.scale,
        selectedCountry: country,
        selectedCity: null,
        canSelectCity: true // Habilita seleção de cidade após mostrar país
      });
    } else {
      // Volta para visão mundial
      setView({
        type: "world",
        zoom: zoomLevels.world.zoom,
        center: zoomLevels.world.center,
        scale: zoomLevels.world.scale,
        selectedCountry: null,
        selectedCity: null,
        canSelectCity: false
      });
    }
  }, [view.type]);

  const handleCityClick = useCallback((city) => {
    // Só permite clicar nas cidades quando estiver habilitado
    if (view.canSelectCity && view.type === "country") {
      setView({
        type: "city",
        zoom: zoomLevels.city.zoom,
        center: city.coordinates,
        scale: zoomLevels.city.scale,
        selectedCountry: view.selectedCountry,
        selectedCity: city,
        canSelectCity: false
      });
    }
  }, [view.canSelectCity, view.type, view.selectedCountry]);

  const handleBackToCountry = useCallback(() => {
    if (view.selectedCountry) {
      setView({
        type: "country",
        zoom: zoomLevels.country.zoom,
        center: view.selectedCountry.coordinates,
        scale: zoomLevels.country.scale,
        selectedCountry: view.selectedCountry,
        selectedCity: null,
        canSelectCity: true
      });
    }
  }, [view.selectedCountry]);

  return (
    <div className="relative w-full h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Legenda das Cidades - Aparece apenas na visão do país */}
      {view.type === "country" && view.canSelectCity && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md z-10">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">
            {view.selectedCountry.name} - Concentração por Cidade
          </h3>
          <div className="space-y-2">
            {view.selectedCountry.cities.map((city) => (
              <div
                key={city.name}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
                onClick={() => handleCityClick(city)}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: city.color }}
                />
                <span className="text-sm text-gray-600">
                  {city.name}: {city.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: view.scale
        }}
      >
        <ZoomableGroup
          center={view.center}
          zoom={view.zoom}
          minZoom={1}
          maxZoom={50}
        >
          <Geographies geography={view.type === "world" ? geoUrl : geoUrlDetailed}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = countryData.find(c => geo.properties.name === c.name);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => country && handleCountryClick(country)}
                    style={{
                      default: {
                        fill: country ? country.color : "#e5e7eb",
                        stroke: "#ffffff",
                        strokeWidth: country ? 0.8 : 0.3,
                        outline: "none",
                        transition: "all 0.3s"
                      },
                      hover: {
                        fill: country ? country.color : "#e5e7eb",
                        stroke: "#ffffff",
                        strokeWidth: country ? 1 : 0.3,
                        outline: "none",
                        cursor: country ? "pointer" : "default"
                      },
                      pressed: {
                        fill: country ? country.color : "#e5e7eb",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Marcadores de cidade - Aparecem apenas na visão do país */}
          {view.type === "country" && view.selectedCountry?.cities.map((city) => (
            <g key={city.name}>
              {/* Área da cidade */}
              <rect
                x={city.boundingBox[0]}
                y={city.boundingBox[1]}
                width={city.boundingBox[2] - city.boundingBox[0]}
                height={city.boundingBox[3] - city.boundingBox[1]}
                fill={city.color}
                fillOpacity={0.2}
                stroke={city.color}
                strokeWidth={0.5}
                style={{ 
                  cursor: view.canSelectCity ? "pointer" : "default",
                  transition: "all 0.3s ease"
                }}
                onClick={() => handleCityClick(city)}
              />
              
              {/* Marcador da cidade */}
              <Marker 
                coordinates={city.coordinates}
                onClick={() => handleCityClick(city)}
              >
                <g transform="translate(-6, -6)">
                  <circle
                    r={view.selectedCity?.name === city.name ? 8 : 6}
                    fill={city.color}
                    stroke="#fff"
                    strokeWidth={2}
                    style={{
                      cursor: view.canSelectCity ? "pointer" : "default",
                      transition: "all 0.3s ease"
                    }}
                  />
                </g>
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fontFamily: "system-ui",
                    fontSize: view.selectedCity?.name === city.name ? "14px" : "12px",
                    fontWeight: "500",
                    fill: "#374151",
                    stroke: "#fff",
                    strokeWidth: 2,
                    strokeLinejoin: "round",
                    paintOrder: "stroke",
                    cursor: view.canSelectCity ? "pointer" : "default"
                  }}
                >
                  {city.name}
                </text>
              </Marker>
            </g>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Botão de Voltar - Aparece quando visualizando uma cidade ou país */}
      {(view.type === "city" || view.type === "country") && (
        <button
          className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md z-10 
                     text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={view.type === "city" ? handleBackToCountry : () => handleCountryClick(view.selectedCountry)}
        >
          ← Voltar para {view.type === "city" ? view.selectedCountry?.name : "Mapa Mundial"}
        </button>
      )}
    </div>
  );
}
