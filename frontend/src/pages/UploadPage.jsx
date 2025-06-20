import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TopNavBar from "../components/TopNavBar";
import { auth } from "../services/api";
import { content } from "../services/api";
import { lesson } from "../services/api";

function UploadPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [selectedUploadType, setSelectedUploadType] = useState(null);

  const [url, setUrl] = useState("");
  const [pdf, setPdf] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await auth.getProfile();
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        alert("Error fetching profile");
        navigate("/login");
      }
    }
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    try {
      if (selectedUploadType === "URL") {
        console.log("URL:", url);
        const res = await content.processUrl(url);
        console.log("URL response:", res);

        const contentId = res.data.content?._id || res.data.contentId;
        
        if (contentId) {
          console.log("Content ID:", contentId);
          setMessage("Upload successful, please go to the lessons page to view your lesson!");
          setMessageType("success");
          await lesson.generateLessons(contentId);

          setUrl("");

        } else {
          throw new Error("Content ID not found in response.");
        }

      } else if (selectedUploadType === "PDF") {
        console.log("PDF:", pdf);
        const res = await content.processPdf(pdf);
        console.log("PDF response:", res);
        
        const contentId = res.data.content?._id || res.data.contentId;
        console.log("Content ID:", contentId);
        if (contentId) {
          console.log("Content ID:", contentId);
          setMessage("Upload successful, please go to the lessons page to view your lesson!");
          setMessageType("success");
          await lesson.generateLessons(contentId);

          setPdf(null);

        } else {
          throw new Error("Content ID not found in response.");
        }

      } else if (selectedUploadType === "Youtube") {
        console.log("Youtube URL:", youtubeUrl);
        const res = await content.processYoutube(youtubeUrl);
        console.log("Youtube response:", res);

        const contentId = res.data.content?._id || res.data.contentId;

        if (contentId) {
          console.log("Content ID:", contentId);
          setMessage("Upload successful, please go to the lessons page to view your lesson!");
          setMessageType("success");
          await lesson.generateLessons(contentId);

          setYoutubeUrl("");

        } else {
          throw new Error("Content ID not found in response.");
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div>
      <TopNavBar user={user} />

      <div
        className="bg-blue-50 flex flex-col items-center justify-center"
        style={{ height: "100vh" }}
      >
        <div>
          <h1 className="text-2xl font-bold text-black">Upload Page</h1>
          <div className="inline-block mt-3">
            <button
              onClick={() => setSelectedUploadType("URL")}
              className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all mr-2 ${selectedUploadType == "URL" ? "bg-blue-800" : ""}`}
            >
              URL
            </button>
            <button
              onClick={() => setSelectedUploadType("PDF")}
              className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all mr-2 ${selectedUploadType == "PDF" ? "bg-blue-800" : ""}`}
            >
              PDF
            </button>
            <button
              onClick={() => setSelectedUploadType("Youtube")}
              className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all ${selectedUploadType == "Youtube" ? "bg-blue-800" : ""}`}
            >
              Youtube
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center mt-5 bg-white p-5 rounded-lg shadow-md min-w-[400px]"
          >
            {/* Show message if present */}
            {message && (
              <div className={`mb-3 text-center font-semibold ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
                {message}
              </div>
            )}
            {selectedUploadType == "URL" && (
              <div>
                <label className="text-sm font-bold text-gray-500">
                  Paste a URL
                </label>
                <input
                  onChange={(e) => setUrl(e.target.value)}
                  type="url"
                  placeholder="Enter URL"
                  className="w-full p-2 border border-gray-300 rounded-md mb-3 mt-2"
                ></input>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 transition-all w-full font-semibold text-md shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
                >
                  Upload & Process
                </button>
              </div>
            )}
            {selectedUploadType == "PDF" && (
              <div>
                <label className="text-sm font-bold text-gray-500">
                  Upload a PDF
                </label>
                <div className="w-full p-2 border border-gray-300 rounded-md mb-3 mt-2 border-dashed bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                  <input
                    onChange={(e) => setPdf(e.target.files[0])}
                    type="file"
                    id="pdf-upload"
                    accept=".pdf"
                
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 transition-all w-full font-semibold text-md shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
                >
                  Upload & Process
                </button>
              </div>
            )}
            {selectedUploadType == "Youtube" && (
              <div>
                <label className="text-sm font-bold text-gray-500">
                  Paste a Youtube URL
                </label>
                <input
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  type="url"
                  placeholder="Enter Youtube URL"
                  className="w-full p-2 border border-gray-300 rounded-md mb-3 mt-2"
                ></input>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 transition-all w-full font-semibold text-md shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
                >
                  Upload & Process
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
