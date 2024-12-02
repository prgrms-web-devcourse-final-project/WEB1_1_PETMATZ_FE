const utcToCustomDateTime = (utcTime: string): string => {
    // 1. 주어진 UTC 시간을 Date 객체로 변환
    const utcDate = new Date(utcTime);

    // 2. UTC 시간을 한국 로컬 시간으로 변환 (UTC+9)
    const localDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    // 3. 현재 한국 로컬 시간 가져오기
    const now = new Date();

    // 4. 오늘인지 확인
    if (now.toDateString() === localDate.toDateString()) {
        const hour = localDate.getHours();
        const minute = localDate.getMinutes().toString().padStart(2, '0');
        const period = hour >= 12 ? '오후' : '오전';
        const formattedHour = (hour % 12 || 12).toString().padStart(2, '0');
        return `${formattedHour}:${minute} ${period}`; // e.g., "오후 01:05"
    }

    // 5. 오늘이 아닐 때: 00-00(요일) 형식
    const month = localDate.getMonth() + 1; // 월
    const day = localDate.getDate(); // 일
    const weekday = localDate.toLocaleDateString('ko-KR', { weekday: 'short' }); // 요일

    return `${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')} (${weekday})`;
};

export default utcToCustomDateTime;
