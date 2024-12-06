export const formatDate = (dateString: string): string => {
    const koreaTime = new Date(dateString);
    koreaTime.setHours(koreaTime.getHours() + 9);

    return koreaTime.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatTime = (dateString: string): string => {
    const koreaTime = new Date(dateString);
    koreaTime.setHours(koreaTime.getHours() + 9);

    return koreaTime.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
    });
};
