import { useState, useEffect } from 'react';

interface Location {
    latitude: number | null;
    longitude: number | null;
    error?: string | null;
}

export function useLocation(): Location {
    const [location, setLocation] = useState<Location>({
        latitude: null,
        longitude: null,
        error: null,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        error: null,
                    });
                },
                (err) => {
                    setLocation({
                        latitude: null,
                        longitude: null,
                        error: `Error: ${err.message}`,
                    });
                },
            );
        } else {
            setLocation({
                latitude: null,
                longitude: null,
                error: 'Geolocation is not supported by your browser.',
            });
        }
    }, []);

    return location;
}
