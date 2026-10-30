import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useEmployee } from "../context/EmployeeContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useEmployee();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dropdownRef = useRef(null);

  const roleOptions = [
    { value: "admin", label: "Administrator" },
    { value: "hr", label: "HR Manager" },
    { value: "employee", label: "Employee" },
  ];

  const selectedLabel =
    roleOptions.find((opt) => opt.value === formData.role)?.label || "Select role";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async () => {
    const { username, password } = formData;

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    try {
      setError("");
      const result = await login({ username: username.trim(), password, role: formData.role });
      navigate(result.user.role === "employee" ? "/documents" : "/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(/logoBackground.jpeg)`,
        backgroundColor: "#0f172a",
      }}
    >
      {/* Lighter overlay – change 50 to 60 / 40 / 30 depending on how strong you want it */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Narrower container */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-7 pb-5 text-center border-b border-white/12">
            <div className="mb-4 flex justify-center mt-[-5rem]">
              <img
                src="/logo.png"
                alt="Viral Ads Media"
                className="max-w-[340px] max-h-[340px] w-auto h-auto object-contain drop-shadow-lg"
              />
            </div>

            <h2 className="text-xl font-semibold text-white tracking-tight mt-[-8rem]">
              HR Management
            </h2>

            <p className="mt-1 text-slate-300/85 text-sm">
              Sign in to continue
            </p>
          </div>

          {/* Form */}
          <div className="px-7 py-6">
            {error && (
              <div className="mb-5 bg-red-950/30 border border-red-700/25 text-red-100 px-4 py-2.5 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full rounded-lg bg-white/8 border border-slate-500/30 px-4 py-2.5 text-white placeholder-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-300/30 focus:outline-none transition text-sm"
                  placeholder="Username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-lg bg-white/8 border border-slate-500/30 px-4 pr-11 py-2.5 text-white placeholder-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-300/30 focus:outline-none transition text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute right-0 top-0 flex h-full w-11 items-center justify-center rounded-r-lg text-slate-400 transition hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/40"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.26 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.74 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      ) : (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div ref={dropdownRef} className="relative">
                <label className="block text-sm font-medium text-slate-200 mb-1.5">
                  Role
                </label>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full rounded-lg bg-white/8 border border-slate-500/30 px-4 py-2.5 text-left flex justify-between items-center text-white focus:border-slate-300 focus:ring-2 focus:ring-slate-300/30 transition text-sm"
                >
                  {selectedLabel}
                  <span className="text-slate-400 text-xs">{isOpen ? "▲" : "▼"}</span>
                </button>

                {isOpen && (
                  <ul className="absolute left-0 right-0 mt-1.5 w-full bg-slate-950/98 border border-slate-700/50 rounded-lg shadow-2xl z-30 max-h-52 overflow-auto backdrop-blur-md">
                    {roleOptions.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => {
                          setFormData({ ...formData, role: option.value });
                          setIsOpen(false);
                        }}
                        className={`px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                          formData.role === option.value
                            ? "bg-slate-700/70 text-white"
                            : "text-slate-200 hover:bg-slate-800/60"
                        }`}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-7">
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                Sign In
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500/80">
              © {new Date().getFullYear()} Viral Ads Media
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;