/**
 *
 * 이 함수는 주어진 UTC 시간을 로컬 시간대로 변환한 후, 현재 시간과의 차이를 계산하여
 * 조건에 따라 적합한 형식의 문자열을 반환합니다.
 *
 * - 1시간 미만: "N분 전" (N분 전)
 * - 오늘: "오전/오후 HH:mm" (12시간제 형식)
 * - 어제: "어제"
 * - 그 외: "MM-DD(요일)" (월-일(요일) 형식)
 *
 * @param {string} utcTime - 변환할 UTC 시간 문자열.
 * @returns {string} 현재 시간과의 차이를 나타내는 포맷된 문자열.
 *
 * @example
 * // 5분 전일 경우 "5분 전" 반환
 * transDateFormatForChat("2024-11-14T10:30:00Z");
 *
 * // 어제일 경우 "어제" 반환
 * transDateFormatForChat("2024-11-13T18:00:00Z");
 *
 * // 며칠 전일 경우 "11-12(화)" 반환
 * transDateFormatForChat("2024-11-12T15:00:00Z");
 */
const transDateForChatRoom = (utcTime: string): string => {
    // 1. 주어진 UTC 시간을 Date 객체로 변환
    const utcDate = new Date(utcTime);

    // 2. 현재 시간 및 로컬 시간 변환
    const now = new Date();
    const localDate = new Date(
        utcDate.getTime() + now.getTimezoneOffset() * 60 * 1000,
    );

    // 3. 시간 차 계산
    const timeDiff = now.getTime() - localDate.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // 4. 조건에 따라 변환
    if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (days === 0) {
        // 오전/오후 시간 표시
        const isPM = localDate.getHours() >= 12;
        const hour = localDate.getHours() % 12 || 12; // 12시간제
        const minute = localDate.getMinutes().toString().padStart(2, '0');
        return `${isPM ? '오후' : '오전'} ${hour}:${minute}`;
    } else if (days === 1) {
        return '어제';
    } else {
        // 00월-00일(요일) 형식
        const parts = new Intl.DateTimeFormat(navigator.language, {
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
        }).formatToParts(localDate);

        const month = parts.find((part) => part.type === 'month')?.value || '';
        const day = parts.find((part) => part.type === 'day')?.value || '';
        const weekday =
            parts.find((part) => part.type === 'weekday')?.value || '';

        return `${month}-${day}(${weekday})`;
    }
};

export default transDateForChatRoom;
