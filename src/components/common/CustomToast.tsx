import { toast, ToastContainer } from 'react-toastify';
import React, { useCallback, useRef } from 'react';
import Success from '@/assets/images/success.svg?react';
import Warning from '@/assets/images/warning.svg?react';

interface CustomToastProps {
    message: string;
    type: 'success' | 'warning';
}

export function CustomToast({ message, type }: CustomToastProps) {
    const Icon = type === 'success' ? Success : Warning;

    return (
        <div className="flex items-center gap-3 rounded-lg bg-[rgba(36,38,41,0.90)] px-6 py-3">
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="text-white text-label-l font-semibold">
                {message}
            </span>
        </div>
    );
}

export function ToastAnchor({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="absolute left-0 right-0 -top-20 z-50">
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    limit={1}
                    hideProgressBar
                    closeButton={false}
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

    const showToast = useCallback(
        (message: string, type: 'success' | 'warning' = 'success') => {
            if (isToastActiveRef.current) return false;

            isToastActiveRef.current = true;

            toast(() => CustomToast({ message, type }), {
                onClose: () => {
                    setTimeout(() => {
                        isToastActiveRef.current = false;
                    }, 300);
                },
                style: {
                    background: 'transparent',
                    boxShadow: 'none',
                    fontFamily: 'inherit',
                },
            });

            return true; // 토스트가 실제로 표시되었음을 반환
        },
        [],
    );

    const isToastActive = useCallback(() => {
        return isToastActiveRef.current;
    }, []);

    return { showToast, isToastActive };
}
