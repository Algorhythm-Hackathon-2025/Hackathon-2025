// import { useState, useCallback, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Camera,
//   X,
//   MapPin,
//   Send,
// } from "lucide-react";

// interface ImageFile {
//   file: File;
//   preview: string;
// }

// interface Location {
//   lat: number;
//   lng: number;
// }

// interface ContactProps {
//   className?: string;
// }

// export default function Contact({ className = "" }: ContactProps) {
//   const [images, setImages] = useState<ImageFile[]>([]);
//   const [caption, setCaption] = useState<string>("");
//   const [category, setCategory] = useState<string>("pothole");
//   const [location, setLocation] = useState<Location | null>(null);
//   const [difficulty, setDifficulty] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
//   const [isMobile, setIsMobile] = useState<boolean>(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const MAX_FILE_SIZE = 5 * 1024 * 1024;
//   const MAX_FILES = 10;

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setErrorMessage("");

//     const oversizedFiles = acceptedFiles.filter((file) => file.size > MAX_FILE_SIZE);
//     if (oversizedFiles.length > 0) {
//       setErrorMessage(`Some files exceed the 5MB limit and were not added.`);
//       acceptedFiles = acceptedFiles.filter((file) => file.size <= MAX_FILE_SIZE);
//       if (acceptedFiles.length === 0) return;
//     }

//     if (images.length + acceptedFiles.length > MAX_FILES) {
//       setErrorMessage(
//         `You can upload maximum ${MAX_FILES} images. Only the first ${MAX_FILES - images.length} will be added.`
//       );
//       acceptedFiles = acceptedFiles.slice(0, MAX_FILES - images.length);
//       if (acceptedFiles.length === 0) return;
//     }

//     setImages((prevImages) => [
//       ...prevImages,
//       ...acceptedFiles.map((file) => ({
//         file,
//         preview: URL.createObjectURL(file),
//       })),
//     ]);
//   }, [images.length]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
//     },
//   });

//   const removeImage = (index: number) => {
//     setImages((prevImages) => {
//       const newImages = [...prevImages];
//       URL.revokeObjectURL(newImages[index].preview);
//       newImages.splice(index, 1);
//       if (currentImageIndex >= newImages.length && newImages.length > 0) {
//         setCurrentImageIndex(newImages.length - 1);
//       }
//       return newImages;
//     });
//   };

//   const fetchLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//           setErrorMessage("");
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           setErrorMessage("Unable to fetch location. Please try again or enter manually.");
//         }
//       );
//     } else {
//       setErrorMessage("Geolocation is not supported by your browser.");
//     }
//   };

//   const handleSubmit = async () => {
//     if (images.length === 0) {
//       setErrorMessage("Please upload at least one image.");
//       return;
//     }
//     if (!caption.trim()) {
//       setErrorMessage("Please provide a title for the problem.");
//       return;
//     }
//     if (!location) {
//       setErrorMessage("Please add your location.");
//       return;
//     }
//     if (!category) {
//       setErrorMessage("Please select a category.");
//       return;
//     }
//     if (!difficulty) {
//       setErrorMessage("Please select a difficulty level.");
//       return;
//     }

//     setIsSubmitting(true);
//     setErrorMessage("");

//     try {
//       const formData = new FormData();
//       formData.append("title", caption);
//       formData.append("difficulty", difficulty);
//       formData.append("coordinates", JSON.stringify(location));
//       formData.append("category", category);
//       images.forEach((image) => {
//         formData.append("images", image.file);
//       });

//       const response = await fetch("/api/problems/create", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Failed to submit report");
//       }

//       setImages([]);
//       setCaption("");
//       setLocation(null);
//       setErrorMessage("");
//       alert("Your report was submitted successfully. Thank you!");
//     } catch (error: any) {
//       setErrorMessage(error.message || "Failed to submit. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   useEffect(() => {
//     return () => {
//       images.forEach((image) => URL.revokeObjectURL(image.preview));
//     };
//   }, []);

//   return (
//     // JSX part is unchanged
//     // You can keep the JSX return content as-is, since it is already valid for .tsx
//   );
// }
