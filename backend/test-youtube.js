import TranscriptClient from "youtube-transcript-api"; // both CJS and ESM are supported

const client = new TranscriptClient();

(async () => {
  await client.ready; // wait for client initialization
  const transcriptObj = await client.getTranscript("https://youtu.be/5MuIMqhT8DM");

  // Find the English transcript (manual or auto-generated)
  const englishTrack = transcriptObj.tracks.find(
    t => t.language === "English" || t.language === "English (auto-generated)"
  );

  if (englishTrack && englishTrack.transcript) {
    // This is an array of transcript segments

    // If you want the full transcript as a string:
    const fullTranscript = englishTrack.transcript.map(seg => seg.text).join(" ");
    console.log(fullTranscript);
  } else {
    console.log("No English transcript found.");
  }
})();