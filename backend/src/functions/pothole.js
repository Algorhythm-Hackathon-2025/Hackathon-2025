import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

// Read the image file
const imagePath = path.resolve("../../uploads/pothole2.jpeg");
const fileStream = fs.createReadStream(imagePath);

// Create FormData and append the image
const form = new FormData();
form.append("file", fileStream);

axios({
  method: "POST",
  url: "https://detect.roboflow.com/kuwait-potholes/1", // Confirm endpoint
  params: {
    api_key: "mH1BvX0HT7G4s41hXKqu",
  },
  data: form,
  headers: {
    ...form.getHeaders(),
  },
})
  .then((response) => {
    console.log("Detection result:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error.response?.data || error.message);
  });
