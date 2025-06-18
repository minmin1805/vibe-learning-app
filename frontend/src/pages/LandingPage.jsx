import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div>
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-purple-500">Vibe Learning</h2>

          <div className="flex items-center gap-3">
            <a href="#Features" className="text-gray-400">
              Features
            </a>
            <a href="#Demo" className="text-gray-400">
              Demo
            </a>
            <a href="#Testimonials" className="text-gray-400">
              Testimonials
            </a>
            <a href="#Contact" className="text-gray-400">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="rounded-md p-3 border-2 border-blue-500">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-purple-500 text-white rounded-md p-3 border-2">
                Signup
              </button>
            </Link>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center p-5 bg-blue-500 text-center">
          <h1 className="text-4xl font-bold text-white">
            Transform Any Content Into Interactive Learning
          </h1>
          <p className="text-white text-lg">
            Turn URLs, PDFs, and YouTube videos into structured lessons with
            AI-powered quizzes and journaling tools. Perfect for self-directed
            learners, busy professionals, and students.
          </p>
          <a href="#Demo" className="bg-purple-500 p-5 text-white rounded-md">
            Try Free Demo
          </a>

          <Link to="/signup">
            <button className=" text-purple-500 rounded-md p-5 border-2">
              Signup
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center p-5">
          <h2>See Vibe Learning in Action</h2>
          <p>
            Watch how we transform any online content into engaging, interactive
            learning experiences
          </p>

          <div className="flex flex-col items-center justify-center p-5 mt-5 bg-gray-400">
            <h2>Demo Video</h2>
            <p>URL to AI-Powered Lesson Transformation</p>
            <button className="bg-purple-500 text-white rounded-md p-3 border-2">
              Watch Demo
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-black">
            Powerful Features for Enhanced Learning
          </h2>
          <p>
            Our AI-driven platform creates personalized learning experiences
            from any content source
          </p>

          <div className="grid grid-cols-3 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center justify-center p-5 bg-gray-400 rounded-lg">
              <h2 className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">📚</h2>
              <h2>Content Ingestion</h2>
              <p>
                Upload URLs, PDFs, or YouTube videos and our AI instantly
                analyzes and structures the content for optimal learning.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 bg-gray-400 rounded-lg">
              <h2 className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">🧠</h2>
              <h2>AI-Powered Lessons
              </h2>
              <p>
              Automatically generate structured lessons using Bloom's Taxonomy with clear learning objectives and key concepts.


              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 bg-gray-400 rounded-lg">
              <h2 className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">❓</h2>
              <h2>Interactive Quizzes
              </h2>
              <p>
              Engage with dynamic quizzes, drag-and-drop exercises, and knowledge checks tailored to your learning progress.


              </p>
            </div>
            
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
