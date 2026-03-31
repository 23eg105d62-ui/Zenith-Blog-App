import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useState } from "react";
import {
    navbarClass,
    navContainerClass,
    navBrandClass,
    navLinkClass,
    navLinkActiveClass,
    primaryBtn,
    secondaryBtn,
} from "../styles/common";

const NAV_LINKS = [
    { label: "Home", to: "/", end: true },
];

function Header() {
    const isAuthenticated = useAuth((state) => state.isAuthenticated);
    const user = useAuth((state) => state.currentUser);
    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setDrawerOpen(false);
        navigate("/login");
    };

    const getProfilePath = () => {
        if (!user) return "/";
        switch (user.role) {
            case "AUTHOR": return "/author-profile";
            case "ADMIN":  return "/admin-profile";
            default:       return "/user-profile";
        }
    };

    const closeDrawer = () => setDrawerOpen(false);

    return (
        <>
            <nav className={navbarClass}>
                <div className={navContainerClass}>
                   
                    <NavLink to="/" className={navBrandClass} style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}>
                        Zenith Blogs
                    </NavLink>

                    <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
                        {NAV_LINKS.map(({ label, to, end }) => (
                            <li key={label}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}

                        {isAuthenticated && (
                            <li>
                                <NavLink
                                    to={getProfilePath()}
                                    className={({ isActive }) => isActive ? navLinkActiveClass : navLinkClass}
                                >
                                    Profile
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <div className="hidden md:flex items-center gap-2">
                        {!isAuthenticated ? (
                            <>
                                <NavLink to="/login">
                                    <button className={secondaryBtn}>Login</button>
                                </NavLink>
                                <NavLink to="/register">
                                    <button className={primaryBtn}>Register</button>
                                </NavLink>
                            </>
                        ) : (
                            <button className={secondaryBtn} onClick={handleLogout}>
                                Logout
                            </button>
                        )}
                    </div>

                    <button
                        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 cursor-pointer"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open menu"
                    >
                        <span
                            className="block h-[1.5px] bg-[#1d1d1f] transition-all duration-200"
                            style={{ width: "22px" }}
                        />
                        <span
                            className="block h-[1.5px] bg-[#1d1d1f] transition-all duration-200"
                            style={{ width: "16px" }}
                        />
                        <span
                            className="block h-[1.5px] bg-[#1d1d1f] transition-all duration-200"
                            style={{ width: "22px" }}
                        />
                    </button>
                </div>
            </nav>

            <div
                onClick={closeDrawer}
                className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden"
                style={{
                    opacity: drawerOpen ? 1 : 0,
                    pointerEvents: drawerOpen ? "auto" : "none",
                }}
            />

            <div
                className="fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col md:hidden"
                style={{
                    transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)",
                    boxShadow: drawerOpen ? "-8px 0 40px rgba(0,0,0,0.08)" : "none",
                }}
            >
                <div className="flex items-center justify-between px-6 h-[52px] border-b border-[#e8e8ed]">
                    <span className={navBrandClass}>MyBlog</span>
                    <button
                        onClick={closeDrawer}
                        aria-label="Close menu"
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f5f7] transition-colors cursor-pointer text-[#6e6e73] hover:text-[#1d1d1f]"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col px-4 pt-4 gap-1 flex-1">
                    {NAV_LINKS.map(({ label, to, end }) => (
                        <NavLink
                            key={label}
                            to={to}
                            end={end}
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#f5f5f7] text-[#0066cc]"
                                        : "text-[#1d1d1f] hover:bg-[#f5f5f7]"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}

                    {isAuthenticated && (
                        <NavLink
                            to={getProfilePath()}
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-[#f5f5f7] text-[#0066cc]"
                                        : "text-[#1d1d1f] hover:bg-[#f5f5f7]"
                                }`
                            }
                        >
                            Profile
                        </NavLink>
                    )}

                    <div className="border-t border-[#e8e8ed] my-3" />

                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" onClick={closeDrawer}>
                                <button className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors cursor-pointer">
                                    Login
                                </button>
                            </NavLink>
                            <NavLink to="/register" onClick={closeDrawer}>
                                <button className="w-full mt-1 bg-[#0066cc] text-white text-sm font-semibold py-2.5 rounded-full hover:bg-[#004499] transition-colors cursor-pointer">
                                    Register
                                </button>
                            </NavLink>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#ff3b30] hover:bg-[#ff3b30]/5 transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </nav>

                <div className="px-6 py-5 border-t border-[#e8e8ed]">
                    <p className="text-[0.72rem] text-[#a1a1a6]">© {new Date().getFullYear()} MyBlog</p>
                </div>
            </div>
        </>
    );
}

export default Header;