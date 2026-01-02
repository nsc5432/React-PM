import { useState, useEffect, useCallback } from 'react';
import { counterService } from '@/api/services/counter.service';
import { counterStatusData } from '@/lib/mock-data';
import type { CounterStatus, ApiError } from '@/types/api.types';

export const useCounterStatus = () => {
    // 초기값을 mock 데이터로 설정하여 항상 데이터 표시 가능
    const [data, setData] = useState<CounterStatus[]>(counterStatusData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ApiError | null>(null);

    const enableMock = import.meta.env.VITE_ENABLE_MOCK === 'true';

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            if (enableMock) {
                // Mock 데이터 사용
                setData(counterStatusData);
                setLoading(false);
            } else {
                // API 호출 시도
                const result = await counterService.getAll();
                setData(result);
                setLoading(false);
            }
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError);

            // Fallback to mock data on error (조용히 처리)
            console.warn(
                '[useCounterStatus] API failed (status: ' + apiError.status + '), using mock data',
            );
            setData(counterStatusData);
            setLoading(false);
        }
    }, [enableMock]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
