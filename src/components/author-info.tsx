import { useUserInfo } from '@/hooks/useUserInfo';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

interface AuthorInfoProps {
    userKey: string | null;
}

export const AuthorInfo = ({ userKey }: AuthorInfoProps) => {
    const { data: userInfo, loading } = useUserInfo(userKey);

    // userKey가 없으면 표시하지 않음
    if (!userKey) {
        return null;
    }

    return (
        <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex flex-col gap-1">
                                <div className="h-4 w-24 bg-blue-200 animate-pulse rounded" />
                                <div className="h-3 w-32 bg-blue-200 animate-pulse rounded" />
                            </div>
                        ) : userInfo ? (
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">
                                        {userInfo.name}
                                    </span>
                                    <span className="text-xs text-gray-500">작성자</span>
                                </div>
                                <span className="text-xs text-gray-600">{userInfo.department}</span>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-500">작성자 정보를 불러올 수 없습니다</div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
