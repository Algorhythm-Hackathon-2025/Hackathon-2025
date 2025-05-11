import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import ImageSlider from "../components/ui/imageSlider";
import { createRoot } from "react-dom/client";

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  const icons: { [k: string]: L.Icon } = {
    streetlight: L.icon({
      iconUrl: "/customIcon/bulb.png",
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    pothole: L.icon({
      iconUrl: "/customIcon/pothole.png",
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    sidewalk: L.icon({
      iconUrl: "/customIcon/sidewalk.png",
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    trash: L.icon({
      iconUrl: "/customIcon/waste.png",
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    others: L.icon({
      iconUrl: "/customIcon/others.png",
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
  };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView([47.9121, 106.9385], 13);
    mapInstance.current = map;

    L.tileLayer(
      "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=3dabaeedc2614ee4a665fb9f4f461143",
      {
        attribution:
          '&copy; <a href="https://carto.com/">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    axios
      .get("/api/problems/get")
      .then((response) => {
        const problems = response.data;
        problems.forEach((problem: any) => {
          const { coordinates, categories, title, images } = problem;

          if (coordinates && coordinates.length === 2) {
            const icon = icons[categories as string] || icons.others;

            const marker = L.marker([coordinates[0], coordinates[1]], {
              icon,
            }).addTo(map);

            console.log(
              `Marker added at: ${coordinates[0]}, ${coordinates[1]} with icon: ${icon.options.iconUrl}`
            );

            const popupDiv = document.createElement("div");
            popupDiv.style.width = "210px";
            popupDiv.style.padding = "8px";
            marker.bindPopup(popupDiv);

            marker.on("popupopen", () => {
              const normalizedImages = (images || []).map(
                (img: string) => `/api/${img.replace(/\\/g, "/")}`
              );

              if (!popupDiv.hasChildNodes()) {
                // React component render to popupDiv
                // ReactDOM.render(
                //   <ImageSlider images={normalizedImages} title={title} id={problem._id} />,
                //   popupDiv
                // );
                createRoot(popupDiv).render(
                  <ImageSlider
                    images={normalizedImages}
                    title={title}
                    id={problem._id}
                  />
                );
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error("Failed to load problems:", error);
      });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      id="leaflet-map"
      style={{
        height: "100%",
        width: "100%",
        minHeight: "500px",
      }}
    />
  );
};

export default MapComponent;
