import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Info, XCircle } from "lucide-react";
import "./NotificationProvider.css";

const NotificationContext = createContext(null);

const ICONS = {
    success: CheckCircle2,
    error: XCircle,
    warning: CircleAlert,
    info: Info,
};

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    const addNotification = useCallback((message, type = "info", duration = 4000) => {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        setNotifications((prev) => [...prev, { id, message, type, duration }]);
        if (duration > 0) {
            window.setTimeout(() => removeNotification(id), duration);
        }
    }, [removeNotification]);

    useEffect(() => {
        if (!notifications.length) return undefined;
        const latest = notifications[notifications.length - 1];
        const timeoutId = window.setTimeout(() => removeNotification(latest.id), latest.duration || 4000);
        return () => window.clearTimeout(timeoutId);
    }, [notifications, removeNotification]);

    const value = useMemo(() => ({ addNotification }), [addNotification]);

    return (
        <NotificationContext.Provider value={value}>
            <div className="notification-stack" aria-live="polite">
                {notifications.map((notification) => {
                    const Icon = ICONS[notification.type] || Info;
                    return (
                        <div key={notification.id} className={`notification-item ${notification.type}`}>
                            <div className="notification-icon">
                                <Icon size={18} />
                            </div>
                            <div className="notification-message">{notification.message}</div>
                            <button type="button" className="notification-close" onClick={() => removeNotification(notification.id)}>
                                ×
                            </button>
                        </div>
                    );
                })}
            </div>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
}
