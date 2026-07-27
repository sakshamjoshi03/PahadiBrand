import { ArrowRight, Sparkles } from "lucide-react";
import "./EmptyState.css";

export default function EmptyState({
    icon: Icon = Sparkles,
    title,
    description,
    actionLabel,
    onAction,
    actionIcon: ActionIcon = ArrowRight,
    className = "",
}) {
    return (
        <div className={`empty-state-card ${className}`.trim()}>
            <div className="empty-state-icon">
                <Icon size={24} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            {actionLabel && onAction ? (
                <button type="button" className="empty-state-action" onClick={onAction}>
                    {actionLabel}
                    <ActionIcon size={16} />
                </button>
            ) : null}
        </div>
    );
}
