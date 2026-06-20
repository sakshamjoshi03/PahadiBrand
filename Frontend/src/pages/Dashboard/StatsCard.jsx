import "./Dashboard.css";

export default function StatsCard({
    icon: Icon,
    value,
    label,
    color = "#2E7D32",
}) {
    return (
        <div className="stats-card">
            <div
                className="stats-icon"
                style={{ backgroundColor: `${color}15`, color }}
            >
                <Icon size={28} />
            </div>

            <div className="stats-info">
                <h2>{value}</h2>
                <p>{label}</p>
            </div>
        </div>
    );
}