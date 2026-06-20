import "./Dashboard.css";
import { ArrowRight } from "lucide-react";

export default function UpdateCard({
    title,
    description,
    date,
}) {
    return (
        <div className="update-card">

            <div className="update-date">
                {date}
            </div>

            <h3>{title}</h3>

            <p>{description}</p>

            <button className="read-more-btn">
                Read More
                <ArrowRight size={16} />
            </button>

        </div>
    );
}