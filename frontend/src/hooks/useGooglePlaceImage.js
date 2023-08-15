import {
  useEffect,
  useState,
  useRef,
} from 'react';

const useGooglePlaceImage = (placeId) => {
  const [imageSrc, setImageSrc] = useState('');

  const service = useRef();

  useEffect(() => {
    if (!window.google) {
      return;
    }

    service.current = new window.google.maps.places.PlacesService(
      document.createElement('div'),
    );
  }, []);

  useEffect(() => {
    if (!placeId || !window.google) {
      return setImageSrc('');
    }

    const placeCallback = (place, status) => {
      if (status == window.google.maps.places.PlacesServiceStatus.OK) {
        const photoUrl = Array.isArray(place.photos) && place.photos.length > 0
        ? place.photos[0].getUrl()
        : '';
        setImageSrc(photoUrl);
      }
    };

    const request = {
      placeId,
      fields: ['photos'],
    };

    service.current.getDetails(request, placeCallback);
  }, [
    placeId,
  ]);

  return imageSrc;
};

export default useGooglePlaceImage;
