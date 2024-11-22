const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// Download endpoint
app.get("/download", async (req, res) => {
  const fileUrl =
    "https://ik.imagekit.io/varshilshah/uploads/ese.zip?updatedAt=1732271822338";

  try {
    // Get the file from the URL
    const response = await axios({
      method: "GET",
      url: fileUrl,
      responseType: "stream",
    });

    // Set headers for file download
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=ese.zip");

    // Pipe the file stream to response
    response.data.pipe(res);
  } catch (error) {
    console.error("Download failed:", error);
    res.status(500).send("Failed to download file");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
