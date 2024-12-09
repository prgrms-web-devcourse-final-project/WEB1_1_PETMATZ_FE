function convertToUTC(utcDate: string, kstTime: string) {
    // 1. UTC 날짜를 Date 객체로 생성
    const utcDateObj = new Date(`${utcDate}T00:00:00Z`); // UTC 기준 날짜

    // 2. KST 시간을 [hours, minutes]로 분리
    const [hours, minutes] = kstTime.split(':').map(Number);

    // 3. UTC 기준 시간 계산 (KST - 9시간)
    utcDateObj.setUTCHours(hours - 9, minutes, 0, 0); // 시간, 분 설정

    // 4. ISO 형식으로 반환
    return utcDateObj.toISOString();
}

export default convertToUTC;
