export const PAYMENT_TYPE: Record<'HOURLY' | 'DAILY' | 'NEGOTIABLE', string> = {
    HOURLY: '시급',
    DAILY: '일급',
    NEGOTIABLE: '협의 후 결정',
};

export const sosTabs = [
    { id: 'all', label: 'ALL' },
    { id: 'user', label: 'MY' },
];
