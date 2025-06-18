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

          <div className="grid grid-cols-3 gap-5 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 p-5">
            <div className="flex flex-col items-center justify-center p-5 rounded-lg bg-white">
              <h2 className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
                📚
              </h2>
              <h2 className="text-2xl font-bold text-black">
                Content Ingestion
              </h2>
              <p>
                Upload URLs, PDFs, or YouTube videos and our AI instantly
                analyzes and structures the content for optimal learning.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 rounded-lg bg-white">
              <h2 className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
                🧠
              </h2>
              <h2 className="text-2xl font-bold text-black">
                AI-Powered Lessons
              </h2>
              <p>
                Automatically generate structured lessons using Bloom's Taxonomy
                with clear learning objectives and key concepts.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 rounded-lg bg-white">
              <h2 className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
                ❓
              </h2>
              <h2 className="text-2xl font-bold text-black">
                Interactive Quizzes
              </h2>
              <p>
                Engage with dynamic quizzes, drag-and-drop exercises, and
                knowledge checks tailored to your learning progress.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-5 rounded-lg bg-white">
              <h2 className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
                📝
              </h2>
              <h2 className="text-2xl font-bold text-black">
                Learning Journal
              </h2>
              <p>
                Reflect on your learning with AI-generated prompts, take notes,
                and track your educational journey over time.
              </p>
            </div>
          </div>
          </div>

          <div className="flex flex-col items-center justify-center p-5 mt-5">
            <h2 className="text-2xl font-bold text-black">
              What Our Users Say
            </h2>
            <p className="mb-5">
              Join thousands of learners who have transformed their education
              with Vibe Learning
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              <div className=" p-5 rounded-lg bg-gray-100 border-2 border-purple-500">
                <p className="text-gray-500 ">
                  "Vibe Learning has revolutionized how I consume educational
                  content. I can turn any article or video into a structured
                  learning experience in minutes!"
                </p>
                <p className="text-purple-500 font-bold text-left">
                  - Sarah M., Graduate Student
                </p>
              </div>

              <div className=" p-5 rounded-lg bg-gray-100 border-2 border-purple-500">
                <p className="text-gray-500 ">
                  "The AI-generated reflection prompts in the learning journal
                  have completely changed how I process and remember new
                  information. It's like having a personal tutor!"
                </p>
                <p className="text-purple-500 font-bold text-left">
                  - Maria L., Self-Directed Learner
                </p>
              </div>

              <div className=" p-5 rounded-lg bg-gray-100 border-2 border-purple-500">
                <p className="text-gray-500 ">
                  "As a busy professional, I love how I can quickly transform
                  industry articles into interactive lessons during my commute.
                  The quizzes help me retain everything I learn." "
                </p>
                <p className="text-purple-500 font-bold text-left">
                  - David K., Marketing Manager
                </p>
              </div>
            </div>
            </div>

            <div className="flex flex-col items-center justify-center p-5 mt-5 bg-gray-700 ">
              <h2 className="text-3xl text-white font-bold">Ready to Transform Your Learning?</h2>

              <p className="text-white text-lg pt-3">
                Join thousands of learners who have discovered the power of
                AI-driven education
              </p>
              <button className="bg-purple-500 text-white rounded-md p-3 text-lg mt-3">
                Start Learning Today
              </button>
              <button className=" text-purple-500 rounded-md p-3 border-2 text-lg border-purple-500 mt-3">
                Try Free Demo
              </button>
            </div>

          <div className="bg-gray-900 grid grid-cols-2 xl:grid-cols-3 p-3">

            <div>
              <h2 className="text-purple-500 font-bold text-xl mb-3">Vibe Learning</h2>
              <p className="text-white">Transform any content into interactive learning experiences with the power of AI.

</p>
            </div>

            <div>
              <h2 className="text-purple-500 font-bold text-xl mb-3">Platform</h2>
              <ul className="text-white">
                <li>Dashboard</li>
                <li>Upload Content</li>
                <li>My Lessons</li>
                <li>Learning Journal</li>
              </ul>
            </div>

            <div>
              <h2 className="text-purple-500 font-bold text-xl mb-3">Support</h2>
              <ul className="text-white">
                <li className="mb-2">FAQ</li>
                <li className="mb-2">Contact Us</li>
                <li className="mb-2">Terms of Service</li>
                <li className="mb-2">Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h2 className="text-purple-500 font-bold text-xl mb-3">Contact</h2>
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
