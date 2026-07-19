import "./SuggestionChips.css";

const suggestions = [
  "🌿 Buransh",
  "🍯 Honey",
  "🥣 Recipes",
  "🏔 Culture",
  "❤️ Wellness",
];

export default function SuggestionChips() {
  return (
    <div className="suggestion-container">
      {suggestions.map((item, index) => (
        <button
          key={item}
          className="suggestion-chip"
          style={{
            animationDelay: `${index * 0.15}s`,
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}