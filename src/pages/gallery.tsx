import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";
import { Camera, FileImageIcon, Upload, X } from "lucide-react";
import { getPictures, postPicture } from "@/services/gallery";
import { image } from "framer-motion/client";

type Picture = Record<string, any>;
type Category = "others" | "family" | "my-perspective";

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<Picture | null>(null);
  const [images, setImages] = useState<Picture[]>([]);
  const [uploadCategory, setUploadCategory] = useState("others");
  const [uploadImage, setUploadImage] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const possibleCategories = [
    "Celebrants-only",
    "Family",
    "Celebrants with others",
    "My perspective",
    "others",
  ];

  // Ensure the upload category always maps to a visible filter
  useEffect(() => {
    if (uploadCategory && selectedCategory !== uploadCategory) {
      setSelectedCategory(uploadCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadCategory]);

  async function getAllImages() {
    try {
      const res = await getPictures();
      if (res) setImages(res.data.gallery);
    } catch (error) {
      console.error(error);
    }
  }

  const categories: string[] = images
    ? images?.reduce(
        (acc: string[], curr: Picture) => {
          if (!acc?.includes(curr.category)) {
            acc.push(curr.category);
          }
          return acc;
        },
        ["all"]
      )
    : [];

  useEffect(function () {
    getAllImages();
  }, []);

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const handleImageUpload = async () => {
    if (uploadImage) {
      try {
        setIsLoading(true);
        const data = { pictures: uploadImage, category: uploadCategory };
        const res = await postPicture(data);
        if (res?.status === 201) {
          getAllImages();
          setUploadImage(null);
        }
        // else do something
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Append a temporary Picture-like object for local preview
            const tempPicture: Picture = {
              _id: `local-${Date.now()}-${Math.random()}`,
              url: reader.result as string,
              category: uploadCategory,
            };
            setImages((prev) => [...prev, tempPicture]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  return (
    <>
      <Head>
        <title>Gallery - 40 & 15 Years Celebration</title>
        <meta
          name="description"
          content="Memory gallery from Funmbi's 40th Birthday and 15th Wedding Anniversary Celebration"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <div className="pt-32 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12">
              <h1 className="font-decorative text-5xl text-[#FFD700] mb-4">
                Memory Gallery
              </h1>
              <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>
              <p className="text-lg sm:text-xl text-[#FFD700]/80 font-light tracking-wide">
                Relive the beautiful moments from our celebration
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 sm:mb-16">
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); if (category !== "all") setUploadCategory(category); }}
                  className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                    selectedCategory === category
                      ? "border-[#FFD700] bg-[#FFD700]/10"
                      : "border-[#FFD700]/30 hover:border-[#FFD700]/50"
                  } border text-[#FFD700] uppercase`}>
                  {category}
                </button>
              ))}
            </div>

            {/* Upload Section */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="bg-black/30 backdrop-blur-lg p-8 sm:p-12 rounded-2xl border border-[#FFD700]/10">
                <div className="mb-4 text-[#FFD700]/80 text-sm">
                  Uploading to: <span className="text-[#FFD700] font-semibold">{uploadCategory}</span>
                </div>
                <span className="text-[#FFD700] text-4xl">📸</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#FFD700] mt-4 mb-2">
                  Share Your Memories
                </h3>
                <p className="text-[#FFD700]/70 mb-6">
                  Upload photos from the celebration to add to our gallery
                </p>
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={(e) => setUploadImage(e.target.files)}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="w-full py-4 border-dashed border-[#FFD700] border block mb-6 rounded-md bg-[#ddc74c34]">
                  {(uploadImage?.length ?? 0) === 0 ? (
                    <div className="h-full w-full flex items-center justify-center flex-col gap-2">
                      <FileImageIcon className="text-[#FFD700] w-9 h-9" />
                      <div>
                        <p className="text-[#FFD700] text-xl mb-1">
                          Upload your images
                        </p>
                        <p className="text-[#ffffffb7] text-xs">
                          Support only JPG,PNG, No more than 10 pictures
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center px-2 text-white">
                      <span>
                        {uploadImage?.length} <em>files selected</em>
                      </span>
                      <span className="text-[#FFD700]">change</span>
                    </div>
                  )}
                </label>
                <button
                  onClick={handleImageUpload}
                  className="inline-block px-6 py-3 bg-[#FFD700] text-black rounded-full hover:bg-[#FFD700]/90 transition-all duration-300 cursor-pointer">
                  {isLoading ? "loading" : "Upload image"}
                </button>
              </div>

              <div className="flex flex-row gap-6 mt-4 items-center">
                <span className="text-xs md:text-sm text-[#FFD700]/70 -mt-2 block w-full">
                  Tip: The selected filter becomes your upload category, and changing the upload category updates the filter.
                </span>
                <label
                  htmlFor="selectCategory"
                  className="block text-[#FFD700] mb-2 text-sm md:text-base whitespace-nowrap">
                  Upload Category
                </label>
                <select
                  id="selectCategory"
                  value={uploadCategory}
                  onChange={(e) => { const v = e.target.value; setUploadCategory(v); setSelectedCategory(v); }}
                  className="px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-base">
                  {possibleCategories.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredImages.map((image) => (
                <div
                  key={image._id}
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-500"
                  onClick={() => setSelectedImage(image)}>
                  <img
                    src={image.url}
                    alt="image"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[#FFD700] font-medium">
                        Memory #{image._id}
                      </p>
                      <p className="text-[#FFD700]/70 text-sm">
                        A precious moment captured forever
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <h3 className="text-2xl text-[#FFD700] mb-2">
                  The Gallery Awaits Your Memories
                </h3>
                <p className="text-[#FFD700]/70">
                  Be the first to share photos from the celebration!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-[#FFD700] transition-colors">
                <X size={32} />
              </button>
              <img
                src={selectedImage.url}
                alt="Full size"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage;
