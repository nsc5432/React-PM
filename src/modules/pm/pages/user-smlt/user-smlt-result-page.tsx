import { useParams } from 'react-router-dom';
import AirportDashboard from '../../shared/components/airport-dashboard';

export default function UserSmltResultPage() {
    const { key } = useParams<{ key: string }>();

    // key 값을 사용하여 특정 시뮬레이션 결과를 조회할 수 있습니다
    // 현재는 key 값을 받기만 하고, 추후 API 연동 시 활용 예정
    return <AirportDashboard simulationType="user" simulationKey={key} />;
}
