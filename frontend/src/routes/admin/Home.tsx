import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import ImageSlider from "../../components/ui/imageSlider";


const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  const icons = {
    Streetlight: L.icon({
      iconUrl: "/customIcon/bulb.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    Pothole: L.icon({
      iconUrl: "/customIcon/pothole.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    Sidewalk: L.icon({
      iconUrl: "/customIcon/sidewalk.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    Trash: L.icon({
      iconUrl: "/customIcon/waste.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
    Others: L.icon({
      iconUrl: "/customIcon/other.jpg",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    }),
  };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current).setView([47.9121, 106.9385], 13);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    axios
      .get("/api/problems/get")
      .then((response) => {
        const problems = response.data;
        problems.forEach((problem: any) => {
          const { coordinates, categories, title, images } = problem;

          if (coordinates && coordinates.length === 2) {
            const icon = icons[categories as keyof typeof icons] || icons.Others;

            const marker = L.marker([coordinates[0], coordinates[1]], { icon }).addTo(map);

            // Create an empty container for the popup content
            const popupDiv = document.createElement("div");

            // Bind the empty container as the popup content.
            marker.bindPopup(popupDiv);

            // When the popup is opened, render the ImageSlider into the container.
            marker.on("popupopen", () => {
              // Normalize image paths (convert backslashes to forward slashes and prefix with uploads folder)
              const normalizedImages = (images || []).map((img: string) =>
                `http://localhost:3012/uploads/${img.replace(/\\/g, "/").split("/").pop()}`
              );
              
              
              if (!popupDiv.hasChildNodes()) {
                const root = ReactDOM.createRoot(popupDiv);
                root.render(<ImageSlider images={normalizedImages} title={title} />);
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
