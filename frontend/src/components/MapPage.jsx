import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { io } from "socket.io-client";
import axios from "axios";
import "./MapPage.css";

// Text-to-speech helper
const speak = (text) => {
  try {
    const u = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (err) {
    console.warn("TTS not available", err);
  }
};

export default function MapPage() {
  const [rides, setRides] = useState([]);
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const socketRef = useRef(null);
  const watchIdRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [steps, setSteps] = useState([]);
  const [destination, setDestination] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Initialize map & fetch rides
  useEffect(() => {
    axios.get(`${API_URL}/api/rides/search`)
      .then(res => setRides(res.data.results || []))
      .catch(err => console.error("Failed to fetch rides", err));

    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [77.5946, 12.9716],
      zoom: 13,
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.addControl(geolocateControl);

    map.on("load", () => {
      geolocateControl.trigger();
      // Add empty route source
      if (!map.getSource("route")) {
        map.addSource("route", { type: "geojson", data: { type: "Feature", geometry: { type: "LineString", coordinates: [] } } });
        map.addLayer({ id: "route", type: "line", source: "route", paint: { "line-width": 5, "line-color": "#0074D9" } });
      }
    });

    return () => map.remove();
  }, []);

  // Initialize socket
  useEffect(() => {
    const socket = io(API_URL, { transports: ["websocket"] });
    socketRef.current = socket;
    socket.on("connect", () => console.log("socket connected", socket.id));
    socket.on("locationSaved", (d) => console.log("locationSaved", d));
    return () => socket.disconnect();
  }, []);

  // Start live location sharing
  const startSharing = () => {
    if (!navigator.geolocation) { alert("Geolocation not supported"); return; }
    setIsSharing(true);
    setStatus("sharing");

    const id = navigator.geolocation.watchPosition((pos) => {
      const lng = pos.coords.longitude;
      const lat = pos.coords.latitude;

      const payload = {
        lat, lng,
        accuracy: pos.coords.accuracy,
        heading: pos.coords.heading,
        speed: pos.coords.speed,
        timestamp: pos.timestamp
      };
      socketRef.current?.emit("myLocation", payload);

      // Update marker on map
      const map = mapRef.current;
      if (!map) return;

      const markerGeoJSON = { type: "Feature", geometry: { type: "Point", coordinates: [lng, lat] } };

      if (!map.getSource("user-marker")) {
        map.addSource("user-marker", { type: "geojson", data: markerGeoJSON });
        map.addLayer({ id: "user-marker", type: "circle", source: "user-marker", paint: { "circle-radius": 8, "circle-color": "#FF0000" } });
      } else {
        map.getSource("user-marker").setData(markerGeoJSON);
      }

      // Optional: center map on your location
      map.setCenter([lng, lat]);

    }, (err) => {
      console.error(err);
      setStatus("geolocation error");
    }, { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 });

    watchIdRef.current = id;
  };

  const stopSharing = () => {
    if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    setIsSharing(false);
    setStatus("idle");
  };

  // Helpers
  const toPair = (lnglat) => `${lnglat[0]},${lnglat[1]}`;
  const getCurrentPositionPair = () => new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => resolve([pos.coords.longitude, pos.coords.latitude]),
        () => { const center = mapRef.current.getCenter(); resolve([center.lng, center.lat]); },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      const center = mapRef.current.getCenter();
      resolve([center.lng, center.lat]);
    }
  });

  const requestRoute = async (originPair, destPair, profile = "driving-car") => {
    try {
      const url = `${API_URL}/api/route?start=${toPair(originPair)}&end=${toPair(destPair)}&profile=${profile}`;
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
      alert("Failed to fetch route");
      return null;
    }
  };

  const drawRouteAndSteps = (route) => {
    const coords = route.geometry.coordinates;
    const map = mapRef.current;
    if (!map) return;

    const geojson = { type: "Feature", geometry: { type: "LineString", coordinates: coords } };
    map.getSource("route")?.setData(geojson);

    // fit bounds
    const bounds = coords.reduce((b, c) => b.extend(c), new maplibregl.LngLatBounds(coords[0], coords[0]));
    map.fitBounds(bounds, { padding: 60 });

    const stepsList = [];
    (route.segments || []).forEach(seg => {
      (seg.steps || []).forEach(st => {
        stepsList.push({
          instruction: st.instruction,
          distance: st.distance,
          duration: st.duration
        });
      });
    });
    setSteps(stepsList);

    if (stepsList.length) speak(stepsList[0].instruction + ` in ${Math.round(stepsList[0].distance)} meters`);
  };

  const handleRoute = async () => {
    setStatus("routing");
    const origin = await getCurrentPositionPair(); // [lng, lat]
    try {
      const startStr = origin.join(",");
const url = `${API_URL}/api/route?start=${startStr}&end=${encodeURIComponent(destination)}&profile=driving-car`;
const resp = await fetch(url);
     
    const data = await resp.json();
      if (!data || !data.routes || !data.routes.length) {
        alert("No route found");
        setStatus("idle");
        return;
      }
      const route = data.routes[0];
      drawRouteAndSteps(route);
      setStatus("routed");
    } catch (err) {
      alert("Failed to fetch route");
      setStatus("idle");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <div style={{ width: 340, padding: 12, boxSizing: "border-box", background: "#fff", overflow: "auto" }}>
        <h3>Available Ride Locations</h3>
        <ul>
          {rides.length === 0 ? <li>No rides found</li> : rides.map((ride, idx) => (
            <li key={idx}><b>From:</b> {ride.source || ride.start} <b>To:</b> {ride.destination || ride.end}</li>
          ))}
        </ul>
        <hr />
        <h3>Navigation</h3>
        <div>Status: {status}</div>
        <div style={{ marginTop: 10 }}>
          <label>Destination (lat,lng):</label>
          <input value={destination} onChange={e => setDestination(e.target.value)} style={{ width: "100%" }} placeholder="e.g. 12.9758,77.6050" />
          <div style={{ marginTop: 6 }}>
            <button onClick={handleRoute}>Route</button>
            <button onClick={() => {
              setSteps([]);
              mapRef.current.getSource("route")?.setData({ type: "Feature", geometry: { type: "LineString", coordinates: [] } });
            }}>Clear</button>
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <h4>Live sharing</h4>
          {!isSharing ? <button onClick={startSharing}>Start Sharing</button> : <button onClick={stopSharing}>Stop Sharing</button>}
        </div>
        <div style={{ marginTop: 12 }}>
          <h4>Steps</h4>
          <ol>
            {steps.map((s, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                <div><strong>{s.instruction}</strong></div>
                <div style={{ fontSize: 12, color: "#555" }}>{Math.round(s.distance)} m • {Math.round(s.duration)} s</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div ref={mapContainer} style={{ flex: 1 }} className="mapContainer" />
    </div>
  );
}
