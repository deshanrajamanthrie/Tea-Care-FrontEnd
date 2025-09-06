import { useState, useCallback } from 'react';

interface UseApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface UseApiOptions {
    onSuccess?: (data: any) => void;
    onError?: (error: string) => void;
}

export const useApi = <T = any>(options: UseApiOptions = {}) => {
    const [state, setState] = useState<UseApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(async (apiCall: () => Promise<T>) => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const result = await apiCall();
            setState({
                data: result,
                loading: false,
                error: null,
            });

            if (options.onSuccess) {
                options.onSuccess(result);
            }

            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred';
            setState({
                data: null,
                loading: false,
                error: errorMessage,
            });

            if (options.onError) {
                options.onError(errorMessage);
            }

            throw error;
        }
    }, [options]);

    const reset = useCallback(() => {
        setState({
            data: null,
            loading: false,
            error: null,
        });
    }, []);

    return {
        ...state,
        execute,
        reset,
    };
};

// Specialized hook for async operations with loading states
export const useAsyncOperation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async <T>(
        operation: () => Promise<T>,
        options: {
            onSuccess?: (data: T) => void;
            onError?: (error: string) => void;
        } = {}
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const result = await operation();
            if (options.onSuccess) {
                options.onSuccess(result);
            }
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);
            if (options.onError) {
                options.onError(errorMessage);
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        execute,
        clearError: () => setError(null),
    };
};