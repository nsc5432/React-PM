import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart3, User, MonitorPlay, UserCircle } from 'lucide-react';
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
        icon: <BarChart3 className="h-5 w-5" />,
    },
    {
        id: 'user',
        label: '사용자시뮬레이션',
        path: '/pm/user-smlt/config',
        icon: <User className="h-5 w-5" />,
    },
    {
        id: 'monitoring',
        label: '시뮬레이션 모니터링',
        path: '/pm/monitoring',
        icon: <MonitorPlay className="h-5 w-5" />,
    },
];

export function Lnb() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [width, setWidth] = useState(256); // 초기값 w-64 = 256px
    const [isResizing, setIsResizing] = useState(false);
    const location = useLocation();
    const sidebarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;

            const newWidth = e.clientX;
            // 최소 너비 64px (w-16), 최대 너비 400px
            if (newWidth >= 64 && newWidth <= 400) {
                setWidth(newWidth);
                // 너비가 100px 이하면 자동으로 collapse
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
            className="relative flex flex-col bg-background border-r"
            style={{ width: isCollapsed ? '64px' : `${width}px` }}
        >
            {/* Header */}
            <div className="flex items-center justify-between h-12 px-4 border-b">
                {!isCollapsed && (
                    <h2 className="text-sm font-semibold text-foreground truncate">PM 예측관리</h2>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn(
                        'flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors',
                        isCollapsed && 'mx-auto',
                    )}
                    aria-label={isCollapsed ? '메뉴 펼치기' : '메뉴 접기'}
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const isDisabled = item.disabled;

                        return (
                            <li key={item.id}>
                                {isDisabled ? (
                                    <div
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium cursor-not-allowed opacity-50',
                                            isCollapsed && 'justify-center px-2',
                                        )}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        {item.icon}
                                        {!isCollapsed && (
                                            <span className="flex-1 truncate">{item.label}</span>
                                        )}
                                        {!isCollapsed && (
                                            <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                                개발중
                                            </span>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                                            isCollapsed && 'justify-center px-2',
                                            isActive
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                                        )}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        {item.icon}
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
                <div className="border-t p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary shrink-0">
                            <UserCircle className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">홍길동</div>
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
        </aside>
    );
}
