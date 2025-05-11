import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Send,
  X,
} from "lucide-react";
import { App, Button, Card, Input, Select, Typography } from "antd";

export default function CreateProblem() {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("pothole");
  const [location, setLocation] = useState<{ lat: number; lng: number }>();
  const [difficulty, setDifficulty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { message } = App.useApp();

  // Max file size: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  // Max number of images: 5
  const MAX_FILES = 10;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setErrorMessage("");

      let validFiles = acceptedFiles.filter(
        (file) => file.size <= MAX_FILE_SIZE
      );
      if (validFiles.length !== acceptedFiles.length) {
        setErrorMessage(`Some files exceed the 5MB limit and were not added.`);
        if (validFiles.length === 0) return;
      }

      // Check max number of files
      if (images.length + validFiles.length > MAX_FILES) {
        setErrorMessage(
          `You can upload maximum ${MAX_FILES} images. Only the first ${
            MAX_FILES - images.length
          } will be added.`
        );
        validFiles = validFiles.slice(0, MAX_FILES - images.length);
        if (validFiles.length === 0) return;
      }

      setImages([
        ...images,
        ...validFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
      ]);
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
  });

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].url);
    setImages(images.filter((_, i) => i !== index));
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      setGeoLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setErrorMessage("");
          setGeoLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setErrorMessage(
            "Unable to fetch location. Please try again or enter manually."
          );
          setGeoLoading(false);
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
      // formData.append("coordinates", JSON.stringify(location)); // Send location as coordinates
      formData.append("latitude", location.lat.toString()); // Send latitude
      formData.append("longitude", location.lng.toString()); // Send longitude
      formData.append("categories", category); // Send category
      images.forEach((image) => {
        formData.append("images", image.file);
      });

      const response = await fetch("/api/problems/create", {
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
      setLocation(undefined);
      setErrorMessage("");
      message.success("Your report was submitted successfully. Thank you!");
    } catch (error) {
      setErrorMessage(
        (error as any).message || "Failed to submit. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  return (
    <div className="flex-grow flex items-center">
      <Card>
        <Typography.Title level={3}>Report a problem</Typography.Title>

        <div className="flex flex-col gap-4">
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
              <p className="text-xs text-gray-400 mt-1">
                Max 5 images, 5MB each
              </p>
            </div>
          </div>

          {/* Image Preview Carousel */}
          {images.length > 0 && (
            <div className="relative">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[currentImageIndex].url}
                  alt={`Preview ${currentImageIndex + 1}`}
                  className="max-w-[400px] w-full h-full object-contain"
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

          <div>
            <label htmlFor="category">Category</label>
            <Select
              id="category"
              className="w-full"
              onChange={setCategory}
              placeholder="Select Category"
              options={[
                { value: "pothole", label: "Pothole" },
                { value: "streetlight", label: "Street Light Issue" },
                { value: "trash", label: "Trash" },
                { value: "sidewalk", label: "Damaged Sidewalk" },
                { value: "other", label: "Others" },
              ]}
            />
          </div>
          <div>
            <label htmlFor="difficulty">Difficulty</label>
            <Select
              id="difficulty"
              className="w-full"
              onChange={setDifficulty}
              placeholder="Select Difficulty"
              options={[
                { value: "easy", label: "Easy" },
                { value: "hard", label: "Hard" },
              ]}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Input.TextArea
              id="description"
              value={caption}
              onChange={(e) => setCaption(e.currentTarget.value)}
              placeholder="Describe the problem..."
              className="w-full p-2"
              rows={3}
            />
          </div>
          {/* Location */}
          <div className="mb-4">
            <Button
              onClick={fetchLocation}
              icon={<MapPin size={20} />}
              loading={geoLoading}
              className="w-full bg-green-500 hover:bg-green-600"
              type="primary"
              size="large"
            >
              {location ? "Location Added" : "Add Current Location"}
            </Button>
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
          <Button
            onClick={handleSubmit}
            loading={isSubmitting}
            className="w-full"
            type="primary"
            size="large"
            icon={<Send size={20} />}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
