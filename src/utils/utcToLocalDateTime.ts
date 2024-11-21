/**
 * UTC 시간 문자열을 로컬 날짜/시간 문자열로 변환합니다.
 *
 * @param {string} utcTime - UTC 시간 문자열 (예: "2024-11-20T15:00:00Z").
 * @returns {string} - 로컬 날짜/시간 문자열 (예: "2024-11-20 23:00").
 */
const utcToLocalDateTime = (utcTime: string) => {
    const date = new Date(utcTime); // UTC 시간
    const localOffset = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date.getTime() - localOffset);

    const year = localTime.getFullYear();
    const month = (localTime.getMonth() + 1).toString().padStart(2, '0');
    const day = localTime.getDate().toString().padStart(2, '0');
    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default utcToLocalDateTime;
