import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

import {
    pageWrapper,
    headingClass,
    subHeadingClass,
    bodyText,
    mutedText,
    articleGrid,
    articleCardClass,
    articleTitle,
    articleExcerpt,
    tagClass,
    ghostBtn,
    secondaryBtn,
    loadingClass,
    errorClass,
    emptyStateClass,
    timestampClass,
    divider,
} from "../styles/common.js";

function UserProfile() {
    const logout = useAuth((state) => state.logout);
    const currentUser = useAuth((state) => state.currentUser);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getArticles = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:4000/user-api/articles", {
                    withCredentials: true,
                });
                setArticles(res.data.payload);
            } catch (err) {
                setError(err.response?.data?.error || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        getArticles();
    }, []);

    const formatDateIST = (date) =>
        new Date(date).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
        });

    const onLogout = async () => {
        await logout();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const navigateToArticle = (articleObj) => {
        navigate(`/article/${articleObj._id}`, { state: articleObj });
    };

    if (loading) return <p className={loadingClass}>Loading articles...</p>;

    return (
        <div className={pageWrapper}>
            {/* ── Profile Header ───────────────────────────── */}
            <div className="flex items-center justify-between py-10 border-b border-[#e8e8ed] mb-10">
                <div className="flex items-center gap-5">
                    {/* Avatar */}
                    {currentUser?.profileImageUrl ? (
                        <img
                            src={currentUser.profileImageUrl}
                            alt={currentUser.firstName}
                            className="w-16 h-16 rounded-full object-cover border border-[#e8e8ed]"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-[#0066cc]/10 flex items-center justify-center text-[#0066cc] text-2xl font-bold">
                            {currentUser?.firstName?.[0]}
                        </div>
                    )}

                    <div>
                        <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#0066cc] mb-1">
                            Reader
                        </p>
                        <h1 className={headingClass}>
                            Welcome back, {currentUser?.firstName}
                        </h1>
                        <p className={mutedText}>{currentUser?.email}</p>
                    </div>
                </div>

                {/* Logout */}
                <button className={secondaryBtn} onClick={onLogout}>
                    Logout
                </button>
            </div>

            {/* ── Error ────────────────────────────────────── */}
            {error && <p className={errorClass}>{error}</p>}

            {/* ── Section Title ────────────────────────────── */}
            <div className="flex items-center justify-between mb-6">
                <h2 className={headingClass}>All Articles</h2>
                <span className={mutedText}>{articles.length} article{articles.length !== 1 ? "s" : ""}</span>
            </div>

            {/* ── Articles Grid ─────────────────────────────── */}
            {articles.length === 0 ? (
                <p className={emptyStateClass}>No articles available yet.</p>
            ) : (
                <div className={articleGrid}>
                    {articles.map((articleObj) => (
                        <div
                            key={articleObj._id}
                            className={`${articleCardClass} rounded-2xl flex flex-col gap-2`}
                        >
                            {/* Category tag */}
                            <span className={tagClass}>{articleObj.category}</span>

                            {/* Title */}
                            <p className={articleTitle}>{articleObj.title}</p>

                            {/* Excerpt */}
                            <p className={articleExcerpt}>
                                {articleObj.content.slice(0, 80)}...
                            </p>

                            {/* Meta row */}
                            <div className="flex items-center justify-between mt-1">
                                <span className={timestampClass}>
                                    {formatDateIST(articleObj.createdAt)}
                                </span>
                            </div>


                            <button
                                className={`${ghostBtn} mt-auto pt-3`}
                                onClick={() => navigateToArticle(articleObj)}
                            >
                                Read Article →
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserProfile;