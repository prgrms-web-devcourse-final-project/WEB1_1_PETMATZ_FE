import { IMessage } from '@/types/chat';
import { utcToLocalTime } from '@/utils';

const groupMessagesByDate = (messages: IMessage[] | null) => {
    if (!messages) return null;

    const groupedMessages: Array<IMessage | { date: string }> = [];
    let lastDate: string | null = null;

    // 날짜 포맷 함수 (YYYY-MM-DD 요일)
    const formatDateWithDay = (date: Date): string => {
        // 날짜 정보 가져오기
        const year = date.getFullYear(); // 연도
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월 (0부터 시작하므로 +1)
        const day = date.getDate().toString().padStart(2, '0'); // 일
        const weekday = ['일', '월', '화', '수', '목', '금', '토'][
            date.getDay()
        ]; // 요일 배열에서 가져오기

        // 조합하여 반환
        return `${year}-${month}-${day} (${weekday})`;
    };

    messages.forEach((message) => {
        const utcDate = new Date(message.msgTimestamp);
        const localDate = new Date(
            utcDate.getTime() - utcDate.getTimezoneOffset() * 60000,
        );
        const currentDate = formatDateWithDay(localDate); // "YYYY-MM-DD (요일)" 형식

        if (!lastDate || lastDate !== currentDate) {
            groupedMessages.push({ date: currentDate });
        }

        groupedMessages.push({
            ...message,
            msgTimestamp: utcToLocalTime(message.msgTimestamp), // 로컬 시간으로 변환된 HH:mm
        });

        lastDate = currentDate;
    });

    return groupedMessages;
};

export default groupMessagesByDate;
