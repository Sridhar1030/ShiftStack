import { useState } from "react";
import axios from "axios";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [token, setToken] = useState("");
    const baseUrl = import.meta.env.VITE_API_URL;
    console.log("backend url is ",baseUrl)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? `/api/auth/login` : `/api/auth/register`;
        try {
            const res = await axios.post(url, form);
            setToken(res.data.token || "Success! User created.");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div style={{ margin: "2rem auto", width: "300px", textAlign: "center" }}>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            {!isLogin && (
                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
            )}
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>
            <p style={{ marginTop: "1rem" }}>
                {isLogin ? "No account?" : "Already have one?"}{" "}
                <span
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ color: "blue", cursor: "pointer" }}
                >
                    {isLogin ? "Register" : "Login"}
                </span>
            </p>
            {token && <div style={{ marginTop: "1rem" }}>Response: {token}</div>}
        </div>
    );
}
