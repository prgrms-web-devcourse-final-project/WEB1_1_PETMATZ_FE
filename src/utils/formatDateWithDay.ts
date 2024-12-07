const formatDateWithDay = (dateString: string) => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${month}-${day}(${dayOfWeek})`;
};

const getFormattedDateRange = (
    startDate: string,
    endDate: string,
): [string, string | undefined, string | undefined] => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 날짜가 같은지 비교
    const isSameDay =
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate();

    if (isSameDay) {
        return [formatDateWithDay(startDate), undefined, undefined];
    } else {
        return [formatDateWithDay(startDate), '-', formatDateWithDay(endDate)];
    }
};

export default getFormattedDateRange;
