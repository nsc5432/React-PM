import { useState, useEffect, useCallback } from 'react';
import { userService } from '@/api/services/user.service';
import { userInfoData } from '@/lib/mock-data';
import type { UserInfo, ApiError } from '@/types/api.types';

export const useUserInfo = (key: string | null) => {
    // 초기값을 null로 설정
    const [data, setData] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);

    const enableMock = import.meta.env.VITE_ENABLE_MOCK === 'true';

    const fetchData = useCallback(async () => {
        // key가 없으면 데이터를 가져오지 않음
        if (!key) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            if (enableMock) {
                // Mock 데이터 사용
                const mockUser = userInfoData[key] || userInfoData['default'];
                setData(mockUser);
                setLoading(false);
            } else {
                // API 호출 시도
                const result = await userService.getByKey(key);
                setData(result);
                setLoading(false);
            }
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError);

            // Fallback to mock data on error (조용히 처리)
            console.warn(
                '[useUserInfo] API failed (status: ' + apiError.status + '), using mock data',
            );
            const mockUser = userInfoData[key] || userInfoData['default'];
            setData(mockUser);
            setLoading(false);
        }
    }, [key, enableMock]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
