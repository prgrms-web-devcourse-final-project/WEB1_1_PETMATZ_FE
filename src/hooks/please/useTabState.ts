import { useCallback, useEffect, useState } from 'react';

export const useTabState = (id: string) => {
    const storageKey = `please-detail-tab-${id}`;

    // localStorage에서 초기값을 가져옴
    const getInitialState = () => {
        const saved = localStorage.getItem(storageKey);
        return saved !== null ? JSON.parse(saved) : true;
    };

    const [isInfoTab, setIsInfoTab] = useState(getInitialState);

    // 상태가 변경될 때마다 localStorage에 저장
    const updateTabState = useCallback(
        (newState: boolean) => {
            setIsInfoTab(newState);
            localStorage.setItem(storageKey, JSON.stringify(newState));
        },
        [storageKey],
    );

    // 컴포넌트가 언마운트될 때 localStorage에서 제거
    useEffect(() => {
        return () => {
            localStorage.removeItem(storageKey);
        };
    }, [storageKey]);

    return [isInfoTab, updateTabState] as const;
};

export default useTabState;
