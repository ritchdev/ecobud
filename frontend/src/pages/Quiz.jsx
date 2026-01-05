import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/NavBar";
import { quizzes } from "../assets/quizzes.js";
import { auth } from "../auth/firebase.auth.js";

const CERTIFICATE_MAP = {
    "recycling-basics" : "RECYCLING_BASICS",
    "plastic-and-e-waste" : "PLASTIC_&_EWASTE",
    "sustainable-living" : "SUSTAINABLE_LIVING"
}

export default function Quiz() {
    const { section } = useParams();
    const navigate = useNavigate();
    const decodedSection = decodeURIComponent(section);

    const quiz = quizzes[decodedSection];

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState(Array(10).fill(null));
    const [submitted, setSubmitted] = useState(false);

    if (!quiz) {
        return <p className="p-10">Quiz not found.</p>;
    }

    function selectAnswer(index) {
        const next = [...answers];
        next[current] = index;
        setAnswers(next);
    }

    async function submitQuiz() {
        const score = answers.reduce(
            (s, ans, i) => ans === quiz[i].correctIndex ? s + 1 : s,
            0
        );

        setSubmitted(true);

        // ✅ Award certificate ONLY if passed
        if (score >= 7) {
            const certificate = CERTIFICATE_MAP[decodedSection];

            if (!certificate) {
                console.error("No certificate mapped for section:", decodedSection);
                return;
            }

            const token = await auth.currentUser.getIdToken();

            await fetch("/api/user/certificates/award", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ certificate })
            });
        }
    }

    // ---------------- RESULT SCREEN ----------------
    if (submitted) {
        const score = answers.reduce(
            (s, ans, i) => ans === quiz[i].correctIndex ? s + 1 : s,
            0
        );

        return (
            <div className="min-h-screen bg-emerald-50">
                <Navbar />

                <div className="max-w-xl mx-auto mt-20 text-center bg-white
                        border border-emerald-300 rounded-xl p-10">
                    <h1 className="text-2xl font-semibold text-emerald-700">
                        Quiz Completed
                    </h1>

                    <p className="text-gray-700 mt-4">
                        You scored <span className="font-semibold">{score} / 10</span>
                    </p>

                    {score >= 7 ? (
                        <p className="mt-3 text-emerald-700">
                            🎉 Congratulations! You’ve earned your certificate.
                        </p>
                    ) : (
                        <p className="mt-3 text-red-600">
                            ❌ You need at least 7 correct answers to pass.
                        </p>
                    )}

                    <button
                        onClick={() => navigate("/learn")}
                        className="mt-6 px-6 py-2 rounded-lg bg-emerald-600
                       text-white hover:bg-emerald-700"
                    >
                        Back to Learn Page
                    </button>
                </div>
            </div>
        );
    }

    const q = quiz[current];

    // ---------------- QUIZ UI ----------------
    return (
        <div className="min-h-screen w-screen bg-emerald-50">
            <div className="max-w-3xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-emerald-700">
                        {decodedSection === "recycling-basics" ? "Recycling Basics" : decodedSection === "sustainable-living" ? "Sustainable Living" : "Plastic & E-Waste"} Quiz
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Answer all questions to complete the quiz
                    </p>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-600">
                        Question {current + 1} of 10
                    </span>

                    <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-6 rounded-full ${i <= current ? "bg-emerald-600" : "bg-emerald-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Question Card */}
                <div className="border border-emerald-300 rounded-xl bg-white p-8">

                    <h2 className="text-lg font-medium text-gray-800 mb-6">
                        {q.question}
                    </h2>

                    <div className="space-y-3">
                        {q.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => selectAnswer(i)}
                                className={`w-full text-left text-neutral-800 px-4 py-3 rounded-lg border transition
                  ${answers[current] === i
                                        ? "border-emerald-600 bg-emerald-100"
                                        : "border-gray-300 hover:border-emerald-500 hover:bg-emerald-50"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        disabled={current === 0}
                        onClick={() => setCurrent(c => c - 1)}
                        className="px-5 py-2 rounded-lg border border-gray-300
                       text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                    >
                        Previous
                    </button>

                    {current === 9 ? (
                        <button
                            disabled={answers.includes(null)}
                            onClick={submitQuiz}
                            className="px-6 py-2 rounded-lg bg-emerald-600 text-white
                         hover:bg-emerald-700 disabled:opacity-40"
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            disabled={answers[current] === null}
                            onClick={() => setCurrent(c => c + 1)}
                            className="px-6 py-2 rounded-lg bg-emerald-600 text-white
                         hover:bg-emerald-700 disabled:opacity-40"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
