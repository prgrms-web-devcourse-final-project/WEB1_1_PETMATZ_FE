import { useState, useEffect } from 'react';
import type { LocationResponse } from '@/types/location';

export function useLocation(): LocationResponse {
    const [response, setResponse] = useState<LocationResponse>({
        ok: false,
        error: undefined,
        data: {
            latitude: null,
            longitude: null,
        },
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setResponse({
                        ok: true,
                        data: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                        error: undefined,
                    });
                },
                (err) => {
                    setResponse({
                        ok: false,
                        data: {
                            latitude: null,
                            longitude: null,
                        },
                        error: {
                            status: err.code,
                            msg: err.message,
                        },
                    });
                },
            );
        } else {
            setResponse({
                ok: false,
                data: {
                    latitude: null,
                    longitude: null,
                },
                error: {
                    status: 0,
                    msg: 'Geolocation is not supported by your browser.',
                },
            });
        }
    }, []);

    return response;
}
