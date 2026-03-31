import React, { useState } from "react";
import {
  pageWrapper,
  headingClass,
  bodyText,
  primaryBtn,
  tagClass,
} from "../styles/common";

const TOPICS = [
  "Artificial Intelligence",
  "Product Design",
  "Web Development",
  "Philosophy",
  "Climate",
  "Space",
  "Health",
  "Economics",
];

function Hero({ onBrowseTopics }) {
  return (
    <div className="pt-16 pb-14 border-b border-[#e8e8ed]">
      <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#0066cc] mb-4">
        Welcome to Zenith Blogs
      </p>
      <h1
        className="text-5xl font-bold text-[#1d1d1f] tracking-tight"
        style={{ maxWidth: "720px", lineHeight: "1.08" }}
      >
        Ideas worth
        <br />
        <span style={{ color: "#0066cc" }}>thinking about.</span>
      </h1>
      <p className={`${bodyText} mt-5 max-w-xl text-[1.05rem]`}>
        In-depth writing on design, technology, science, and culture — for
        curious minds who value clarity over noise.
      </p>
      <div className="flex gap-3 mt-8">
        <button
          className={primaryBtn}
          style={{ fontSize: "0.875rem", padding: "10px 22px" }}
          onClick={onBrowseTopics}
        >
          Browse Topics
        </button>
      </div>
    </div>
  );
}

function TopicsRail() {
  return (
    <div id="topics-rail" className="py-12 border-t border-[#e8e8ed]">
      <h2 className={`${headingClass} mb-6`}>Explore by Topic</h2>
      <div className="flex gap-3 flex-wrap">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            className="text-sm font-medium px-5 py-2 rounded-full border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] hover:border-[#0066cc] hover:text-[#0066cc] transition-all cursor-pointer"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) setSubmitted(true);
  };

  return (
    <div className="rounded-2xl bg-[#f5f5f7] px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8 my-14">
      <div className="flex flex-col gap-2 max-w-sm">
        <span className={tagClass}>Newsletter</span>
        <h3 className={headingClass}>Every week, something worth reading.</h3>
        <p className={bodyText} style={{ fontSize: "0.9rem" }}>
          Curated essays and ideas delivered to your inbox. No noise, no filler.
        </p>
      </div>
      {submitted ? (
        <div className="text-sm text-[#248a3d] font-medium bg-[#34c759]/10 border border-[#34c759]/20 rounded-xl px-6 py-4">
          ✓ You're on the list. Check your inbox.
        </div>
      ) : (
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[#1d1d1f] text-sm placeholder:text-[#a1a1a6] focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition w-64"
          />
          <button className={primaryBtn} onClick={handleSubmit}>
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}

function Home() {
  const handleBrowseTopics = () => {
    document.getElementById("topics-rail")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={pageWrapper}>
      <Hero onBrowseTopics={handleBrowseTopics} />
      <TopicsRail />
      <NewsletterBanner />
    </div>
  );
}

export default Home;