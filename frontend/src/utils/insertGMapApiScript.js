const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const insertGMapApiScript = () => {
  const googleMapsScript = document.createElement('script');
  googleMapsScript.async = true;
  googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=Function.prototype`;

  const body = document.querySelector('body');
  body.appendChild(googleMapsScript);
};

export default insertGMapApiScript;
