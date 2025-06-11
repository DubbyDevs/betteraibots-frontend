// src/GoogleAnalytics.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// Replace with your actual Measurement ID
const GA_MEASUREMENT_ID = "G-J3TD7Y2P7M";

export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
}
