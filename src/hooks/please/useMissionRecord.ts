import { useState } from 'react';
import { putImageToS3 } from '@/hooks/api/auth';
import { getPetMissionInfo, createMissionContent } from '@/hooks/api/please';
import { PetMissionInfoResponse } from '@/types/please';

interface UseMissionRecordParams {
    petMissionId: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

interface RecordMissionParams {
    askId: string;
    comment: string;
    image?: File;
}

export default function useMissionRecord({
    petMissionId,
    onSuccess,
    onError,
}: UseMissionRecordParams) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [missionData, setMissionData] =
        useState<PetMissionInfoResponse['data']>();

    const recordMission = async ({
        askId,
        comment,
        image,
    }: RecordMissionParams) => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. 먼저 미션 컨텐츠 생성 (이미지가 있다면 'Y', 없다면 '')
            const createResponse = await createMissionContent({
                askId,
                comment,
                imgURL: image ? 'Y' : '',
            });

            if (!createResponse.ok) {
                throw new Error(
                    createResponse.error?.msg || '미션 등록에 실패했습니다.',
                );
            }

            // 2. 이미지가 있다면 S3에 업로드
            if (image) {
                const s3Response = await putImageToS3({
                    id: Number(askId),
                    imgURL: createResponse.data,
                    img: image,
                    type: 'H',
                });
                if (!s3Response) {
                    throw new Error('이미지 업로드에 실패했습니다.');
                }
            }

            // 3. 미션 데이터 갱신 (전체 미션 정보 다시 조회)
            const updatedMission = await getPetMissionInfo(petMissionId);
            if (updatedMission.ok && updatedMission.data) {
                setMissionData(updatedMission.data);
            }

            onSuccess?.();
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : '미션 등록 중 오류가 발생했습니다.';
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        recordMission,
        isLoading,
        error,
        missionData,
    };
}
