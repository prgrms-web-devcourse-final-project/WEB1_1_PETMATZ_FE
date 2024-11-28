// 문자열 배열을 쉼표로 구분된 문자열로 변환하는 함수
export const convertArrayToCommaString = (
    arr: string[] | undefined,
): string => {
    // 배열이 undefined이거나 비어있다면 빈 문자열 반환
    if (!arr || arr.length === 0) return '';

    // 배열을 쉼표로 구분된 문자열로 변환
    return arr.join(',');
};

// 쉼표로 구분된 문자열을 문자열 배열로 변환하는 함수 (역방향 변환)
export const convertCommaStringToArray = (
    commaString: string | undefined,
): string[] => {
    // undefined나 빈 문자열이라면 빈 배열 반환
    if (!commaString) return [];

    // 쉼표로 구분된 문자열을 배열로 변환
    return commaString.split(',').filter((item) => item.trim() !== '');
};
