const utcToCustomDateTime = (utcTime: string): string => {
    // 1. 주어진 UTC 시간을 Date 객체로 변환
    const utcDate = new Date(utcTime);

    // 2. UTC 시간을 한국 로컬 시간으로 변환 (UTC+9)
    const localDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

    // 3. 현재 한국 로컬 시간 가져오기
    const now = new Date();

    // 4. 시간 차 계산
    const timeDiff = now.getTime() - localDate.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // 5. 조건에 따라 시간 변환
    if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (minutes < 60 * 24) {
        // 같은 날이라면 오전/오후 시간 표시
        const hour = localDate.getHours();
        const minute = localDate.getMinutes().toString().padStart(2, '0');
        const period = hour >= 12 ? '오후' : '오전';
        return `${period} ${hour % 12 || 12}:${minute}`;
    } else if (days === 1) {
        return '어제';
    } else {
        // 00월-00일(요일) 형식
        const formatter = new Intl.DateTimeFormat('ko-KR', {
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
        });
        return formatter.format(localDate); // e.g., '11-30(금)'
    }
};

export default utcToCustomDateTime;
