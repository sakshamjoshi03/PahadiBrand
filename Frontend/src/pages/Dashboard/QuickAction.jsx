import "./Dashboard.css";
import { ArrowRight } from "lucide-react";

export default function QuickAction({
    icon: Icon,
    title,
    subtitle,
    onClick,
}) {
    return (
        <div className="quick-action-card" onClick={onClick}>
            <div className="quick-action-top">
                <div className="quick-action-icon">
                    <Icon size={26} />
                </div>

                <ArrowRight
                    size={18}
                    className="quick-arrow"
                />
            </div>

            <h3>{title}</h3>

            <p>{subtitle}</p>
        </div>
    );
}