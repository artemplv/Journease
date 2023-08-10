import {
  useRef,
  useEffect,
} from 'react';

import InputField from '../InputField/InputField';

import './SearchPlacesInput.css';

const autocompleteOptions = {
  fields: ['place_id', 'name', 'geometry', 'formatted_address', 'photo'],
};

const noop = () => {};

function SearchPlacesInput(props) {
  const {
    onChange,
    onError = noop,
    className = '',
    placeholder
  } = props;

  const autocompleteRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (!window.google) {
      return onError('Service is not available');
    }
  
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
     inputRef.current,
     autocompleteOptions,
    );

    const onPlaceChange = async () => {
      const place = await autocompleteRef.current.getPlace();

      const placeData = {
        placeId: place.place_id,
        name: place.name,
        formattedAddress: place.formatted_address,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        photo: Array.isArray(place.photos) && place.photos.length > 0
          ? place.photos[0].getUrl()
          : null,
      };
      
      onChange(placeData);
    };

    autocompleteRef.current.addListener('place_changed', onPlaceChange);
  }, []);

  return (
    <InputField
      ref={inputRef}
      placeholder={placeholder || "Search for places"}
      className={className}
    />
  );
};

export default SearchPlacesInput;
