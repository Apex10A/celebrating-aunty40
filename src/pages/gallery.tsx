import React, { useEffect, useMemo, useState } from "react";
import { Navigation } from "../components/Navigation";
import Head from "next/head";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";
import { FileImageIcon, X } from "lucide-react";
import { deletePicture, getPictures, postPicture } from "@/services/gallery";

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
  const [token, setToken] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [deleteTarget, setDeleteTarget] = useState<Picture | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [])

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
      setIsFetching(true);
      const res = await getPictures();
      if (res) setImages(res.data.gallery);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  const categories = useMemo<string[]>(() => {
    const base = ["all"];
    images.forEach((img) => {
      const category = String(img?.category ?? "").trim();
      if (category && !base.includes(category)) {
        base.push(category);
      }
    });
    return base;
  }, [images]);

  useEffect(function () {
    getAllImages();
  }, []);

  useEffect(() => {
    setLoadingMap((prev) => {
      const next = { ...prev };
      images.forEach((img) => {
        if (img?._id && !(img._id in next)) {
          next[img._id] = true;
        }
      });
      return next;
    });
  }, [images]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "all") {
      return images;
    }
    return images.filter((img) => img.category === selectedCategory);
  }, [images, selectedCategory]);

  const statusMessage = isFetching
    ? "Loading images"
    : filteredImages.length
    ? `${filteredImages.length} images available`
    : "No images available";

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
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleImageLoad = (id: string) => {
    setLoadingMap((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: string) => {
    setLoadingMap((prev) => ({ ...prev, [id]: false }));
  };

  const handleDeletePicture = async () => {
    if (!deleteTarget?._id) return;
    const id = String(deleteTarget._id);
    try {
      setIsDeleting(true);
      const res = await deletePicture(id);
      if (res?.status === 200) {
        setImages((prev) => prev.filter((img) => String(img._id) !== id));
        setLoadingMap((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        if (selectedImage?._id && String(selectedImage._id) === id) {
          setSelectedImage(null);
        }
        setDeleteTarget(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
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
    if (files?.length) {
      setUploadImage(files);
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black">
        <Navigation />
        <div className="pt-44 md:pt-[250px] pb-16 md:pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12">
              <h1 className="font-decorative text-3xl md:text-5xl text-[#FFD700] mb-4">
                Memory Gallery
              </h1>
              <div className="h-px w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-6"></div>
              <p className="text-gray-300 text-sm md:text-lg max-w-[70%] md:max-w-full mx-auto">
                Relive the beautiful moments from our celebration
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => { setSelectedCategory(category); if (category !== "all") setUploadCategory(category); }}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 font-medium text-sm md:text-md ${
                    selectedCategory === category
                      ? "border-[#FFD700] bg-[#FFD700]/10"
                      : "border-[#FFD700]/30 hover:border-[#FFD700]/50"
                  } border text-[#FFD700] uppercase`}>
                  {category}
                </button>
              ))}
            </div>

            {/* Upload Section */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="bg-black/30 backdrop-blur-lg p-8 sm:p-12 rounded-2xl border border-[#FFD700]/10">
                <div className="mb-4 text-[#FFD700]/80 text-sm">
                  Uploading to: <span className="text-[#FFD700] font-semibold">{uploadCategory}</span>
                </div>
                <span className="text-[#FFD700] text-3xl md:text-4xl">📸</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FFD700] mt-4 mb-2">
                  Share Your Memories
                </h3>
                <p className="text-[#FFD700]/70 mb-4 md:mb-6 text-sm md:text-base">
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
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full py-3 md:py-4 border-dashed border block mb-6 rounded-md transition-colors duration-300 ${
                    isDragging
                      ? "border-[#FFD700] bg-[#ffd7001a]"
                      : "border-[#FFD700] bg-[#ddc74c34]"
                  }`}>
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
                  type="button"
                  onClick={handleImageUpload}
                  disabled={isLoading || !(uploadImage?.length ?? 0)}
                  aria-busy={isLoading}
                  className={`inline-block px-6 py-3 rounded-full transition-all duration-300 cursor-pointer ${
                    isLoading || !(uploadImage?.length ?? 0)
                      ? "bg-[#FFD700]/40 text-black/60 cursor-not-allowed"
                      : "bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
                  }`}>
                  {isLoading ? "Uploading" : "Upload image"}
                </button>
              </div>

              <div className="sm:flex flex-row gap-4 md:gap-6 mt-4 items-center">
                <span className="text-xs md:text-sm text-[#FFD700]/70 -mt-2 block w-full mb-2 sm:mb-0 max-w-sm sm:max-w-auto mx-auto sm:mx-0">
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
                  className="px-3 md:px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all text-sm md:text-base"
                >
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
              {isFetching && !images.length
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="relative aspect-square overflow-hidden rounded-xl border border-[#FFD700]/10 bg-black/40"
                    >
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#FFD700]/5" />
                    </div>
                  ))
                : filteredImages.map((image) => {
                    const id = String(image._id);
                    const isLoaded = !loadingMap[id];
                    return (
                      <div
                        key={id}
                        className="group relative aspect-square overflow-hidden rounded-xl"
                      >
                        {token && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget(image);
                            }}
                            className="absolute top-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-red-500"
                          >
                            Delete
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedImage(image)}
                          className="group relative block h-full w-full overflow-hidden"
                        >
                          <div
                            className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
                              isLoaded ? "opacity-0" : "opacity-100"
                            }`}
                            aria-hidden={isLoaded}
                          >
                            <span className="text-[#FFD700] text-sm">Loading image…</span>
                          </div>
                          <img
                            src={image.url}
                            alt={image?.alt || `Memory ${id}`}
                            loading="lazy"
                            onLoad={() => handleImageLoad(id)}
                            onError={() => handleImageError(id)}
                            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                              isLoaded ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                              <p className="text-[#FFD700] font-medium">
                                Memory #{id}
                              </p>
                              <p className="text-[#FFD700]/70 text-sm">
                                A precious moment captured forever
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}

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
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
            <div className="relative max-w-4xl max-h-full">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-[#FFD700] transition-colors"
                aria-label="Close image preview">
                <X size={32} />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage?.alt || "Full size memory"}
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
