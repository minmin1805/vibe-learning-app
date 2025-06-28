import React from "react";
import { Link } from "react-router-dom";
import webLogo from "../assets/webLogo.png";
function LandingPage() {
  {
    /*Scroll to each section with smooth scrolling*/
  }
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };



  return (
    <div className="bg-white p-2" style={{ height: "100vh" }}>
      <div className="bg-gray-100 rounded-2xl p-2 shadow-lg">
        <header className="flex items-center justify-between">
          <img
            src={webLogo}
            alt="Vibe Learning Logo"
            className="w-50 h-10 rounded-full mb-2"
          />

          <div className="flex items-center gap-3 mb-3">
            <a
              href="#Demo"
              className="text-gray-400 hover:text-[#02C6B3] transition-all"
              onClick={() => scrollToSection("Demo")}
            >
              Demo
            </a>
            <a
              href="#Features"
              className="text-gray-400 hover:text-[#02C6B3] transition-all"
              onClick={() => scrollToSection("Features")}
            >
              Features
            </a>
            <a
              href="#Testimonials"
              className="text-gray-400 hover:text-[#02C6B3] transition-all"
            >
              Testimonials
            </a>
            <a
              href="#Contact"
              className="text-gray-400 hover:text-[#02C6B3] transition-all"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="mb-1 rounded-md py-1 px-3 border-2 border-[#02C6B3] font-semibold hover:bg-blue-100 transition-all hover:cursor-pointer">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="mb-1 bg-[#02C6B3] text-white rounded-md py-1 px-3 border-2 font-semibold hover:bg-[#3e746e] transition-all hover:cursor-pointer">
                Signup
              </button>
            </Link>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center p-8 bg-[#02C6B3] text-center gap-4 w-full">
          <h1 className="text-4xl font-bold text-white mb-4">
            Transform Any Content Into Interactive Learning
          </h1>
          <p className="text-white text-lg mb-6 max-w-2xl">
            Turn URLs, PDFs, and YouTube videos into structured lessons with
            AI-powered quizzes and journaling tools. Perfect for self-directed
            learners, busy professionals, and students.
          </p>
          <a
            href="#Demo"
            className="bg-[#2D2F4A] p-4 text-white rounded-md font-semibold shadow-md hover:bg-[#3e746e] transition-all"
          >
            Try Free Demo
          </a>

          <Link to="/signup">
            <button className="text-[#2D2F4A] rounded-md p-4 border-2 border-[#2D2F4A] font-semibold hover:bg-blue-50 transition-all">
              Signup
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center p-5 mt-15">
          <h2 className="text-3xl font-bold text-black mb-2">
            See Vibe Learning in Action
          </h2>
          <p className="text-gray-500">
            Watch how we transform any online content into engaging, interactive
            learning experiences
          </p>

          <div
            id="Demo"
            className="flex flex-col items-center justify-center mt-5 bg-gray-400 rounded-lg shadow-md p-30"
          >
            <h2 className="text-2xl font-bold text-black mb-2">
              🎥 Demo Video
            </h2>
            <p className="text-gray-500 mb-2">
              URL to AI-Powered Lesson Transformation
            </p>
            <button className="bg-[#02C6B3] text-white rounded-md p-3 border-2 font-semibold hover:bg-[#3e746e] transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="bg-gray-100 mt-5 flex flex-col items-center justify-center pt-10">
          <h2 className="text-3xl font-bold text-black mb-2 mt-5 ">
            Powerful Features for Enhanced Learning
          </h2>
          <p className="mb-3">
            Our AI-driven platform creates personalized learning experiences
            from any content source
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            <div
              id="Features"
              className="flex flex-col items-center justify-center p-6 rounded-lg bg-white shadow-md gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-[#02C6B3] flex items-center justify-center text-white text-xl mb-2">
                📚
              </div>
              <h2 className="text-2xl font-bold text-[#02C6B3]">
                Content Ingestion
              </h2>
              <p>
                Upload URLs, PDFs, or YouTube videos and our AI instantly
                analyzes and structures the content for optimal learning.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white shadow-md gap-2">
              <div className="w-12 h-12 rounded-full bg-[#02C6B3] flex items-center justify-center text-white text-xl mb-2">
                🧠
              </div>
              <h2 className="text-2xl font-bold text-[#02C6B3]">
                AI-Powered Lessons
              </h2>
              <p>
                Automatically generate structured lessons using Bloom's Taxonomy
                with clear learning objectives and key concepts.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white shadow-md gap-2">
              <div className="w-12 h-12 rounded-full bg-[#02C6B3] flex items-center justify-center text-white text-xl mb-2">
                ❓
              </div>
              <h2 className="text-2xl font-bold text-[#02C6B3]">
                Interactive Quizzes
              </h2>
              <p>
                Engage with dynamic quizzes, drag-and-drop exercises, and
                knowledge checks tailored to your learning progress.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-white shadow-md gap-2">
              <div className="w-12 h-12 rounded-full bg-[#02C6B3] flex items-center justify-center text-white text-xl mb-2">
                📝
              </div>
              <h2 className="text-2xl font-bold text-[#02C6B3]">
                Learning Journal
              </h2>
              <p>
                Reflect on your learning with AI-generated prompts, take notes,
                and track your educational journey over time.
              </p>
            </div>
          </div>
        </div>

        <div
          id="Testimonials"
          className="flex flex-col items-center justify-center p-8 mt-8 gap-2"
        >
          <h2 className="text-3xl font-bold text-black">What Our Users Say</h2>
          <p className="mb-5">
            Join thousands of learners who have transformed their education with
            Vibe Learning
          </p>

          <div className="p-6 rounded-lg bg-gray-100 border-2 border-[#02C6B3] shadow-md mb-4">
            <p className="text-[#02C6B3] font-bold text-left">
              "Vibe Learning has revolutionized how I consume educational
              content. I can turn any article or video into a structured
              learning experience in minutes!"
            </p>
            <p className="text-[#2D2F4A] font-bold text-left">
              - Sarah M., Graduate Student
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-100 border-2 border-[#02C6B3] shadow-md mb-4">
            <p className="text-[#02C6B3] font-bold text-left">
              "The AI-generated reflection prompts in the learning journal have
              completely changed how I process and remember new information.
              It's like having a personal tutor!"
            </p>
            <p className="text-[#2D2F4A] font-bold text-left">
              - Maria L., Self-Directed Learner
            </p>
          </div>

          <div className="p-6 rounded-lg bg-gray-100 border-2 border-[#02C6B3] shadow-md mb-4">
            <p className="text-[#02C6B3] font-bold text-left">
              "As a busy professional, I love how I can quickly transform
              industry articles into interactive lessons during my commute. The
              quizzes help me retain everything I learn." "
            </p>
            <p className="text-[#2D2F4A] font-bold text-left">
              - David K., Marketing Manager
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 mt-8 bg-[#02C6B3] gap-2 rounded-lg shadow-md">
          <h2 className="text-3xl text-white font-bold mb-2">
            Ready to Transform Your Learning?
          </h2>

          <p className="text-white text-lg pt-3">
            Join thousands of learners who have discovered the power of
            AI-driven education
          </p>
          <button className="bg-[#2D2F4A] text-white rounded-md p-3 text-lg mt-3 font-semibold hover:bg-[#3e746e] transition-all">
            Start Learning Today
          </button>
          <button className="text-[#2D2F4A] rounded-md p-3 border-2 text-lg border-[#2D2F4A] mt-3 font-semibold hover:bg-blue-50 transition-all">
            Try Free Demo
          </button>
        </div>

        <div
          id="Contact"
          className="bg-[#2D2F4A] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-6 gap-6 rounded-lg mt-8"
        >
          <div>
            <h2 className="text-[#02C6B3] font-bold text-xl mb-3">
              Vibe Learning
            </h2>
            <p className="text-white">
              Transform any content into interactive learning experiences with
              the power of AI.
            </p>
          </div>

          <div>
            <h2 className="text-[#02C6B3] font-bold text-xl mb-3">Platform</h2>
            <ul className="text-white">
              <li>Dashboard</li>
              <li>Upload Content</li>
              <li>My Lessons</li>
              <li>Learning Journal</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#02C6B3] font-bold text-xl mb-3">Support</h2>
            <ul className="text-white">
              <li className="mb-2">FAQ</li>
              <li className="mb-2">Contact Us</li>
              <li className="mb-2">Terms of Service</li>
              <li className="mb-2">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#02C6B3] font-bold text-xl mb-3">Contact</h2>
            <p className="text-white mb-2">info@vibelearning.com</p>
            <p className="text-white mb-2">+1 (123) 456-7890</p>
            <p className="text-white mb-2">123 Main St, Anytown, USA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
