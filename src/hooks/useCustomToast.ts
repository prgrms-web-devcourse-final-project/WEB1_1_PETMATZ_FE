import { toast } from 'react-toastify';
import { useRef, useCallback } from 'react';
import { CustomToast } from '@/components/common';

export default function useCustomToast() {
    const isToastActiveRef = useRef(false);

    const showToast = useCallback(
        (message: string, type: 'success' | 'warning' = 'success') => {
            if (isToastActiveRef.current) {
                return;
            }

            isToastActiveRef.current = true;

            toast(() => CustomToast({ message, type }), {
                position: 'bottom-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
                style: {
                    background: 'transparent',
                    boxShadow: 'none',
                    fontFamily: 'inherit',
                },
                onClose: () => {
                    setTimeout(() => {
                        isToastActiveRef.current = false;
                    }, 300); // 애니메이션 완료를 위한 추가 시간
                },
            });
        },
        [],
    );

    const isToastActive = useCallback(() => {
        return isToastActiveRef.current;
    }, []);

    return { showToast, isToastActive };
}
