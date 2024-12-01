import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDukSP2wxBR0vzH4rBZ64zuYZ1tpkV3cXU';
const containerStyle = {
  width: '100%',
  height: '250px',
  width: '370px',
};

const center = {
  lat: 40.748817,  
  lng: -73.985428,
};

const M = () => {
  const [startLocation, setStartLocation] = useState('University of Western Ontario');
  const [endLocation, setEndLocation] = useState('');
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const handleInputChange = (e, setLocation) => {
    setLocation(e.target.value);
  };
  const handleGetRoute = async (e) => {
    e.preventDefault();
    if (!startLocation || !endLocation) {
      setError("Both start and end locations are required");
      return;
    }

    try {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: startLocation,
          destination: endLocation,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setError(null); 
          } else {
            setError('Could not fetch directions');
          }
        }
      );
    } catch (err) {
      setError('An error occurred while fetching the route');
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <div>
          <div>
            <form onSubmit={handleGetRoute}>
              <div>
                <input
                  type="text"
                  placeholder="End Location"
                  value={endLocation}
                  onChange={(e) => handleInputChange(e, setEndLocation)}
                  required
                  className = 'bg-transparent w-[13.5rem] font-oswald outline-none h-[3.5rem]' style={{ backgroundImage: "url('src/assets/24.png')" }}
                />
              </div>
              <button type="submit">Get Directions</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>

         <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true, 
                }}
              />
            )}

            {startLocation && (
              <Marker position={{ lat: parseFloat(startLocation.split(',')[0]), lng: parseFloat(startLocation.split(',')[1]) }} />
            )}
            {endLocation && (
              <Marker position={{ lat: parseFloat(endLocation.split(',')[0]), lng: parseFloat(endLocation.split(',')[1]) }} />
            )}
          </GoogleMap>
          </div>

        </div>


        {directions && (
          <div className="route-details font-oswald flex flex-col">
            <h3 >Route Details:</h3>
            <p>Distance: {directions.routes[0].legs[0].distance.text}</p>
            <p>Duration: {directions.routes[0].legs[0].duration.text}</p>
          </div> // send this over elsewhere
        )}
      </LoadScript>
    </div>
  );
};

export default M;
