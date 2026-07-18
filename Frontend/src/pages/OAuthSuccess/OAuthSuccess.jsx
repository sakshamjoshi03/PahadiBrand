import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate, searchParams]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "22px",
        fontWeight: "600",
      }}
    >
      Signing you in...
    </div>
  );
}