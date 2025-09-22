"use client";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface BubbleMapProps {
  data: any[];
  valueKey: string;
  title: string;
}

const cityCoordinates: { [key: string]: [number, number] } = {
  "Abu Dhabi": [54.3773, 24.4539],
  Dubai: [55.2708, 25.2048],
  Sharjah: [55.4209, 25.3463],
  Riyadh: [46.6753, 24.7136],
  Doha: [51.531, 25.2854],
  "Kuwait City": [47.9774, 29.3759],
  Manama: [50.586, 26.2285],
};

const BubbleMap: React.FC<BubbleMapProps> = ({ data, valueKey, title }) => {
  const maxValue = Math.max(...data.map((d) => d[valueKey]));

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ComposableMap
        projectionConfig={{ scale: 1000, center: [50, 25] }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#2D3748"
                stroke="#4A5568"
              />
            ))
          }
        </Geographies>
        {data.map((item, index) => {
          const coords = cityCoordinates[item.region];
          if (!coords) return null;

          const scale = item[valueKey] / maxValue;
          const bubbleSize = 5 + scale * 25;

          return (
            <Marker key={index} coordinates={coords}>
              <circle
                r={bubbleSize}
                fill="rgba(59, 130, 246, 0.5)"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};

export default BubbleMap;
