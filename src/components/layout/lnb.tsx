import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    BarChart3,
    User,
    MonitorPlay,
    UserCircle,
    MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
    id: string;
    label: string;
    path: string;
    icon: React.ReactNode;
    disabled?: boolean;
}

const menuItems: MenuItem[] = [
    {
        id: 'daily',
        label: '기준시뮬레이션',
        path: '/pm/daily-smlt/result',
        icon: <BarChart3 className="size-5" />,
    },
    {
        id: 'user',
        label: '사용자시뮬레이션',
        path: '/pm/user-smlt/config',
        icon: <User className="size-5" />,
    },
    {
        id: 'monitoring',
        label: '시뮬레이션 모니터링',
        path: '/pm/monitoring',
        icon: <MonitorPlay className="size-5" />,
    },
    {
        id: 'facility-config',
        label: '시설물 매핑',
        path: '/pm/facility-config',
        icon: <MapPin className="size-5" />,
    },
];

export function Lnb() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [width, setWidth] = useState(256);
    const [isResizing, setIsResizing] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const sidebarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;

            const newWidth = e.clientX;
            if (newWidth >= 64 && newWidth <= 400) {
                setWidth(newWidth);
                if (newWidth < 100) {
                    setIsCollapsed(true);
                } else {
                    setIsCollapsed(false);
                }
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const handleMouseDown = () => {
        setIsResizing(true);
    };

    return (
        <aside
            ref={sidebarRef}
            className="relative flex flex-col bg-linear-to-b from-background to-muted/20 border-r border-border/50 shadow-sm"
            style={{ width: isCollapsed ? '64px' : `${width}px` }}
        >
            {/* Header */}
            <div className="flex items-center h-14 px-4 border-b border-border/50 gap-3 bg-background/80 backdrop-blur-sm">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center size-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 shrink-0"
                    aria-label="뒤로가기"
                    title="뒤로가기"
                >
                    <ChevronLeft className="size-4" />
                </button>
                {!isCollapsed && (
                    <h2 className="text-sm font-bold tracking-tight text-foreground truncate flex-1">
                        PM 예측관리
                    </h2>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4 px-3">
                <ul className="space-y-1.5">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const isDisabled = item.disabled;

                        return (
                            <li key={item.id}>
                                {isDisabled ? (
                                    <div
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-not-allowed opacity-50',
                                            isCollapsed && 'justify-center px-2',
                                        )}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        {item.icon}
                                        {!isCollapsed && (
                                            <span className="flex-1 truncate">{item.label}</span>
                                        )}
                                        {!isCollapsed && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                                개발중
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={cn(
                                            'group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                                            isCollapsed && 'justify-center px-2',
                                            isActive
                                                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/80',
                                        )}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <span
                                            className={cn(
                                                'transition-transform duration-200',
                                                !isActive && 'group-hover:scale-110',
                                            )}
                                        >
                                            {item.icon}
                                        </span>
                                        {!isCollapsed && (
                                            <span className="flex-1 truncate">{item.label}</span>
                                        )}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Info Footer */}
            {!isCollapsed && (
                <div className="border-t border-border/50 p-4 bg-muted/30">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 text-primary shrink-0 shadow-sm">
                            <UserCircle className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-foreground truncate">
                                홍길동
                            </div>
                            <div className="text-xs text-muted-foreground truncate">공항정보팀</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Resize Handle */}
            <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors group"
                onMouseDown={handleMouseDown}
            >
                <div className="absolute top-0 right-0 w-1 h-full bg-transparent group-hover:bg-primary/50" />
            </div>

            {/* Collapse/Expand Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute top-1/2 -right-3 -translate-y-1/2 flex items-center justify-center size-6 rounded-full bg-background border border-border/50 shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 z-10"
                aria-label={isCollapsed ? '메뉴 펼치기' : '메뉴 접기'}
                title={isCollapsed ? '메뉴 펼치기' : '메뉴 접기'}
            >
                {isCollapsed ? (
                    <ChevronRight className="size-3" />
                ) : (
                    <ChevronLeft className="size-3" />
                )}
            </button>
        </aside>
    );
}
