/**
 * UTC 시간 문자열을 로컬 시간 문자열로 변환합니다 (HH:mm 형식).
 *
 * @param {string} utcTime - UTC 시간 문자열 (예: "2024-11-20T15:00:00Z").
 * @returns {string} - 로컬 시간 문자열 (HH:mm 형식, 예: "23:00").
 */
const utcToLocalTime = (utcTime: string) => {
    const date = new Date(utcTime); // UTC 시간
    const localOffset = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date.getTime() - localOffset);

    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
};

export default utcToLocalTime;
