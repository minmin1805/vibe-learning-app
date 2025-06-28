import React from "react";
import { lesson } from "../services/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RememberLevel from "../components/MyLessonComp/BloomLevelsContent/RememberLevel";
import UnderstandLevel from "../components/MyLessonComp/BloomLevelsContent/UnderstandLevel";
import ApplyLevel from "../components/MyLessonComp/BloomLevelsContent/ApplyLevel";
import AnalyzeLevel from "../components/MyLessonComp/BloomLevelsContent/AnalyzeLevel";
import EvaluateLevel from "../components/MyLessonComp/BloomLevelsContent/EvaluateLevel";
import CreateLevel from "../components/MyLessonComp/BloomLevelsContent/CreateLevel";
import TopNavBar from "../components/TopNavBar";
import { auth } from "../services/api";

function LessonViewer() {
  const { id } = useParams();
  const [lessonData, setLessonData] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("remember");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await auth.getProfile();
      setUser(res.data.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await lesson.getLessonById(id);
        setLessonData(res.data.lesson);
      } catch (error) {
        console.error("Failed to fetch lesson:", error);
      }
    };

    if (id) {
      fetchLesson();
    }
  }, [id]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedLevel]);

  if (!lessonData) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <TopNavBar user={user} />

    <div className="flex flex-col h-screen items-center mt-10">
      <h1 className="text-2xl font-bold max-w-[80%] text-center mt-3">{lessonData?.title}</h1>

      <div className="flex flex-wrap gap-2 mt-5 items-center justify-center">
        <button
          onClick={() => setSelectedLevel("remember")}
          className={`bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-blue-700 font-bold ${
            selectedLevel == "remember" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Remember
        </button>
        <button
          onClick={() => setSelectedLevel("understand")}
          className={`bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-blue-700 font-bold ${
            selectedLevel == "understand" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Understand
        </button>
        <button
          onClick={() => setSelectedLevel("apply")}
          className={`bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-blue-700 font-bold ${
            selectedLevel == "apply" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Apply
        </button>
        <button
          onClick={() => setSelectedLevel("analyze")}
          className={`bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-blue-700 font-bold ${
            selectedLevel == "analyze" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Analyze
        </button>
        <button
          onClick={() => setSelectedLevel("evaluate")}
          className={`bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-blue-700 font-bold ${
            selectedLevel == "evaluate" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Evaluate
        </button>
        <button
          onClick={() => setSelectedLevel("create")}
          className={`bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded-md text-blue-700 font-bold ${
            selectedLevel == "create" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Create
        </button>
      </div>

      <div className="max-w-[90%]">
        {/* display level content component according to selected level */}
        {selectedLevel === "remember" && <RememberLevel title={lessonData?.sections[0]?.title} content={JSON.parse(lessonData?.sections[0]?.content)} />}
        {selectedLevel === "understand" && <UnderstandLevel title={lessonData?.sections[1]?.title} content={JSON.parse(lessonData?.sections[1]?.content)} />}
        {selectedLevel === "apply" && <ApplyLevel title={lessonData?.sections[2]?.title} content={JSON.parse(lessonData?.sections[2]?.content)} />}
        {selectedLevel === "analyze" && <AnalyzeLevel title={lessonData?.sections[3]?.title} content={JSON.parse(lessonData?.sections[3]?.content)} />}
        {selectedLevel === "evaluate" && <EvaluateLevel title={lessonData?.sections[4]?.title} content={JSON.parse(lessonData?.sections[4]?.content)} />}
        {selectedLevel === "create" && <CreateLevel title={lessonData?.sections[5]?.title} content={JSON.parse(lessonData?.sections[5]?.content)} />}
      </div>
    </div>
    </div>
  );
}

export default LessonViewer;
