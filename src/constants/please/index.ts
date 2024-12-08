type TabId = 'DOL' | 'MAL';

export const pleaseTab: { id: TabId; label: string }[] = [
    { id: 'MAL', label: '돌봄 리스트' },
    { id: 'DOL', label: '맡김 리스트' },
];

export const PROGRESS_TYPE: Record<'BEF' | 'INP' | 'AFT', string> = {
    BEF: '진행전',
    INP: '진행중',
    AFT: '완료',
};
