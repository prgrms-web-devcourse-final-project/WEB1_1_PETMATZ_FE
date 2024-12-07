const formatDateWithTime = (dateInput: Date | string): string => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    // Date 객체 생성
    const date =
        typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    // 년도, 월, 일, 요일, 시간, 분 추출
    const year = date.getFullYear().toString(); // YY 형식
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 0을 채워 2자리로 만듦
    const day = date.getDate().toString().padStart(2, '0');
    const weekday = days[date.getDay()]; // 요일
    const hours = date.getHours().toString().padStart(2, '0'); // 시간
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분

    return `${year}.${month}.${day}.(${weekday}) ${hours}:${minutes}`;
};

export default formatDateWithTime;
