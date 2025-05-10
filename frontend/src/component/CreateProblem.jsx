import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  X,
  MapPin,
  Send,
} from "lucide-react";

export default function CreateProblem({ className = "" }) {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("pothole");
  const [location, setLocation] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and when window is resized
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Max file size: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  // Max number of images: 5
  const MAX_FILES = 10;

  const onDrop = useCallback(
    (acceptedFiles) => {
      setErrorMessage("");

      // Check file size
      const oversizedFiles = acceptedFiles.filter(
        (file) => file.size > MAX_FILE_SIZE
      );
      if (oversizedFiles.length > 0) {
        setErrorMessage(`Some files exceed the 5MB limit and were not added.`);
        const validFiles = acceptedFiles.filter(
          (file) => file.size <= MAX_FILE_SIZE
        );
        if (validFiles.length === 0) return;
        acceptedFiles = validFiles;
      }

      // Check max number of files
      if (images.length + acceptedFiles.length > MAX_FILES) {
        setErrorMessage(
          `You can upload maximum ${MAX_FILES} images. Only the first ${
            MAX_FILES - images.length
          } will be added.`
        );
        acceptedFiles = acceptedFiles.slice(0, MAX_FILES - images.length);
        if (acceptedFiles.length === 0) return;
      }

      setImages((prevImages) => {
        const newImages = [...prevImages];

        acceptedFiles.forEach((file) => {
          newImages.push({
            file,
            preview: URL.createObjectURL(file),
          });
        });

        return newImages;
      });
    },
    [images.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
  });

  const removeImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);

      // Update current index if needed
      if (currentImageIndex >= newImages.length && newImages.length > 0) {
        setCurrentImageIndex(newImages.length - 1);
      }

      return newImages;
    });
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setErrorMessage("");
        },
        (error) => {
          console.error("Error fetching location:", error);
          setErrorMessage(
            "Unable to fetch location. Please try again or enter manually."
          );
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (images.length === 0) {
      setErrorMessage("Please upload at least one image.");
      return;
    }

    if (!caption.trim()) {
      setErrorMessage("Please provide a title for the problem.");
      return;
    }

    if (!location) {
      setErrorMessage("Please add your location.");
      return;
    }

    if (!category) {
      setErrorMessage("Please select a category.");
      return;
    }

    if (!difficulty) {
      setErrorMessage("Please select a difficulty level.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("title", caption); // Send caption as title
      formData.append("difficulty", difficulty); // Send difficulty level
      formData.append("coordinates", JSON.stringify(location)); // Send location as coordinates
      formData.append("category", category); // Send category
      images.forEach((image, index) => {
        formData.append("images", image.file);
      });

      const response = await fetch("/api/problems", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit report");
      }

      // Success
      setImages([]);
      setCaption("");
      setLocation(null);
      setErrorMessage("");
      alert("Your report was submitted successfully. Thank you!");
    } catch (error) {
      setErrorMessage(error.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg ${
        isMobile ? "w-full" : "w-96"
      } sticky top-4 right-4 z-10 max-h-[calc(100vh-2rem)] overflow-y-auto flex flex-col h-auto`}
    >
      <div className="p-4 bg-blue-600 text-white rounded-t-lg">
        <h2 className="text-lg font-semibold">Report a Problem</h2>
      </div>

      <div className="p-4 flex-grow">
        {/* Image Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 mb-4 transition-colors cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center text-center">
            <Camera className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              {isDragActive
                ? "Drop the images here..."
                : "Drag & drop images here, or click to select"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Max 5 images, 5MB each</p>
          </div>
        </div>

        {/* Image Preview Carousel */}
        {images.length > 0 && (
          <div className="mb-4 relative">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex].preview}
                alt={`Preview ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(currentImageIndex);
                }}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        currentImageIndex === index
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            <p className="text-xs text-gray-500 mt-1 text-center">
              {currentImageIndex + 1} of {images.length}
            </p>
          </div>
        )}

        {/* Problem Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="pothole">Pothole</option>
            <option value="street_light">Street Light Issue</option>
            <option value="trash">Trash</option>
            <option value="sidewalk">Damaged Sidewalk</option>
            <option value="other">Others</option>
          </select>
        </div>

        {/* Difficulty Level */}
        <div className="mb-4">
          <label
            htmlFor="difficulty"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Difficulty Level
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="title"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Describe the problem..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <button
            onClick={fetchLocation}
            className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <MapPin className="mr-2" size={18} />
            {location ? "Location Added" : "Add Current Location"}
          </button>
          {location && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
            </p>
          )}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-50 text-red-700 text-sm rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-2`}
        >
          <Send className="mr-2" size={18} />
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </div>
  );
}
