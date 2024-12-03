import { toast, ToastContainer } from 'react-toastify';
import React, { useCallback, useRef, useEffect } from 'react';
import Success from '@/assets/images/success.svg?react';
import Warning from '@/assets/images/warning.svg?react';

interface CustomToastProps {
    message: string;
    type: 'success' | 'warning';
}

export function CustomToast({ message, type }: CustomToastProps) {
    const Icon = type === 'success' ? Success : Warning;

    return (
        <div className="z-50 flex items-center gap-3 rounded-lg bg-[rgba(36,38,41,0.90)] px-6 py-3">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="text-white text-label-l font-semibold">
                {message}
            </span>
        </div>
    );
}

export function ToastAnchor({ children }: { children: React.ReactNode }) {
    // ToastContainer를 직접 설정하여 autoClose가 확실히 동작하도록 함
    return (
        <div className="relative">
            <div className="absolute left-0 right-0 -top-20 z-50">
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    limit={1}
                    hideProgressBar
                    closeButton={false}
                    closeOnClick={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    style={{
                        position: 'relative',
                        inset: 'unset',
                        transform: 'none',
                        width: '100%',
                    }}
                    className="!absolute !p-0"
                    toastClassName="!m-0"
                />
            </div>
            {children}
        </div>
    );
}

export function useCustomToast() {
    const isToastActiveRef = useRef(false);
    const toastIdRef = useRef<string | number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const clearToastState = useCallback(() => {
        isToastActiveRef.current = false;
        toastIdRef.current = null;
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const showToast = useCallback(
        (message: string, type: 'success' | 'warning' = 'success') => {
            // 이전 toast가 있다면 강제로 제거
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
                clearToastState();
            }

            isToastActiveRef.current = true;

            // 새로운 toast 생성
            toastIdRef.current = toast(() => CustomToast({ message, type }), {
                autoClose: 3000,
                onClose: () => {
                    // toast가 닫힐 때 300ms 후에 상태 초기화
                    timerRef.current = setTimeout(() => {
                        clearToastState();
                    }, 300);
                },
                closeOnClick: false,
                pauseOnFocusLoss: false,
                draggable: false,
                pauseOnHover: false,
                style: {
                    background: 'transparent',
                    boxShadow: 'none',
                    fontFamily: 'inherit',
                },
            });

            // 3초 후에 강제로 toast 제거
            timerRef.current = setTimeout(() => {
                if (toastIdRef.current) {
                    toast.dismiss(toastIdRef.current);
                    clearToastState();
                }
            }, 3000);

            return true;
        },
        [clearToastState],
    );

    const isToastActive = useCallback(() => {
        return isToastActiveRef.current;
    }, []);

    // cleanup
    useEffect(() => {
        return () => {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
            }
            clearToastState();
        };
    }, [clearToastState]);

    return { showToast, isToastActive };
}
