// src/components/ProjectGallery.jsx
import { useState, useEffect } from "react";

// Real project data with actual images from /public/gallery
const projects = [
  {
    id: 1,
    title: "Kitchen Cabinets Restoration",
    category: "Interior",
    thumbnail: "/gallery/cabinets/cabinetes8.jpeg",
    images: [
      {
        url: "/gallery/cabinets/cabinetes.jpeg",
        caption: "Before - Old cabinet finish",
        type: "before",
      },
      {
        url: "/gallery/cabinets/cabinetes2.jpeg",
        caption: "After - Refinished cabinets",
        type: "before",
      },
      {
        url: "/gallery/cabinets/cabinetes3.jpeg",
        caption: "After - Detail view",
        type: "before",
      },
      {
        url: "/gallery/cabinets/cabinetes4.jpeg",
        caption: "After - Kitchen transformation",
        type: "before",
      },
      {
        url: "/gallery/cabinets/cabinetes5.jpeg",
        caption: "After - Close-up detail",
        type: "before",
      },
      {
        url: "/gallery/cabinets/cabinetes6.jpeg",
        caption: "After - Side angle",
        type: "before",
      },
      {
        url: "/gallery/cabinets/cabinetes7.jpeg",
        caption: "After - Overall view",
        type: "after",
      },
      {
        url: "/gallery/cabinets/cabinetes8.jpeg",
        caption: "After - Final result",
        type: "after",
      },
    ],
  },
  {
    id: 2,
    title: "Accent Wall Design",
    category: "Interior",
    thumbnail: "/gallery/accentWall/accent9.jpeg",
    images: [
      {
        url: "/gallery/accentWall/accent.jpeg",
        caption: "Accent wall design 1",
        type: "before",
      },
      {
        url: "/gallery/accentWall/accent2.jpeg",
        caption: "Accent wall design 2",
        type: "before",
      },
      {
        url: "/gallery/accentWall/accent3.jpeg",
        caption: "Accent wall design 3",
        type: "before",
      },
      {
        url: "/gallery/accentWall/accent4.jpeg",
        caption: "Accent wall design 4",
        type: "before",
      },
      {
        url: "/gallery/accentWall/accent5.jpeg",
        caption: "Accent wall design 5",
        type: "before",
      },
      {
        url: "/gallery/accentWall/accent6.jpeg",
        caption: "Accent wall design 6",
        type: "after",
      },
      {
        url: "/gallery/accentWall/accent7.jpeg",
        caption: "Accent wall design 7",
        type: "after",
      },
      {
        url: "/gallery/accentWall/accent8.jpeg",
        caption: "Accent wall design 8",
        type: "after",
      },
      {
        url: "/gallery/accentWall/accent9.jpeg",
        caption: "Accent wall design 9",
        type: "after",
      },
    ],
  },
  {
    id: 9,
    title: "Interior Room Painting",
    category: "Interior",
    thumbnail: "/gallery/interior/interior13.jpeg",
    images: [
      {
        url: "/gallery/interior/interior.jpeg",
        caption: "Before - Old wall paint",
        type: "before",
      },
      {
        url: "/gallery/interior/interior2.jpeg",
        caption: "After - Fresh paint job",
        type: "before",
      },
      {
        url: "/gallery/interior/interior3.jpeg",
        caption: "After - Wall detail",
        type: "before",
      },
      {
        url: "/gallery/interior/interior4.jpeg",
        caption: "After - Another angle",
        type: "before",
      },
      {
        url: "/gallery/interior/interior5.jpeg",
        caption: "After - Room view",
        type: "before",
      },
      {
        url: "/gallery/interior/interior6.jpeg",
        caption: "After - Side view",
        type: "before",
      },
      {
        url: "/gallery/interior/interior7.jpeg",
        caption: "After - Detail work",
        type: "after",
      },
      {
        url: "/gallery/interior/interior8.jpeg",
        caption: "After - Complete room",
        type: "after",
      },
      {
        url: "/gallery/interior/interior9.jpeg",
        caption: "After - Final touches",
        type: "after",
      },
      {
        url: "/gallery/interior/interior10.jpeg",
        caption: "After - Additional view 1",
        type: "after",
      },
      {
        url: "/gallery/interior/interior11.jpeg",
        caption: "After - Additional view 2",
        type: "after",
      },
      {
        url: "/gallery/interior/interior12.jpeg",
        caption: "After - Additional view 3",
        type: "after",
      },
      {
        url: "/gallery/interior/interior13.jpeg",
        caption: "After - Final result",
        type: "after",
      },
    ],
  },
  {
    id: 3,
    title: "Exterior House Painting",
    category: "Exterior",
    thumbnail: "/gallery/exteriorHouse/exteriortree9.jpeg",
    images: [
      {
        url: "/gallery/exteriorHouse/exteriortree.jpeg",
        caption: "Before - Faded exterior",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse/exteriortree2.jpeg",
        caption: "After - Fresh coat",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse/exteriortree3.jpeg",
        caption: "After - Different angle",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse/exteriortree4.jpeg",
        caption: "After - Side view",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse/exteriortree5.jpeg",
        caption: "After - Front detail",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse/exteriortree6.jpeg",
        caption: "After - Overall look",
        type: "after",
      },
      {
        url: "/gallery/exteriorHouse/exteriortree7.jpeg",
        caption: "After - Another perspective",
        type: "after",
      },
      {
        url: "/gallery/exteriorHouse/exteriortree8.jpeg",
        caption: "After - Close-up",
        type: "after",
      },
      {
        url: "/gallery/exteriorHouse/exteriortree9.jpeg",
        caption: "After - Complete transformation",
        type: "after",
      },
    ],
  },
  {
    id: 4,
    title: "Exterior House Project 2",
    category: "Exterior",
    thumbnail: "/gallery/exteriorHouse2/exteriorttwo6.jpeg",
    images: [
      {
        url: "/gallery/exteriorHouse2/exteriorttwo.jpeg",
        caption: "Before - Old exterior",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse2/exteriorttwo2.jpeg",
        caption: "After - New paint",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse2/exteriorttwo3.jpeg",
        caption: "After - Side angle",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse2/exteriorttwo4.jpeg",
        caption: "After - Detail view",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse2/exteriorttwo5.jpeg",
        caption: "After - Front view",
        type: "after",
      },
      {
        url: "/gallery/exteriorHouse2/exteriorttwo6.jpeg",
        caption: "After - Final result",
        type: "after",
      },
    ],
  },
  {
    id: 5,
    title: "Exterior House Project 3",
    category: "Exterior",
    thumbnail: "/gallery/exteriorHouse3/exterior7.jpeg",
    images: [
      {
        url: "/gallery/exteriorHouse3/exterior.jpeg",
        caption: "Before - Original exterior",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse3/exterior2.jpeg",
        caption: "After - Fresh exterior paint",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse3/exterior3.jpeg",
        caption: "After - Different perspective",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse3/exterior4.jpeg",
        caption: "After - Side detail",
        type: "before",
      },
      {
        url: "/gallery/exteriorHouse3/exterior5.jpeg",
        caption: "After - Front angle",
        type: "after",
      },
      {
        url: "/gallery/exteriorHouse3/exterior6.jpeg",
        caption: "After - Overall view",
        type: "after",
      },
      {
        url: "/gallery/exteriorHouse3/exterior7.jpeg",
        caption: "After - Complete transformation",
        type: "after",
      },
    ],
  },
  {
    id: 7,
    title: "Garage Painting",
    category: "Exterior",
    thumbnail: "/gallery/garage/garage5.jpeg",
    images: [
      {
        url: "/gallery/garage/garage.jpeg",
        caption: "Before - Old garage door",
        type: "before",
      },
      {
        url: "/gallery/garage/garage2.jpeg",
        caption: "After - Fresh paint",
        type: "before",
      },
      {
        url: "/gallery/garage/garage3.jpeg",
        caption: "After - Side view",
        type: "before",
      },
      {
        url: "/gallery/garage/garage4.jpeg",
        caption: "After - Detail work",
        type: "before",
      },
      {
        url: "/gallery/garage/garage5.jpeg",
        caption: "After - Complete transformation",
        type: "after",
      },
    ],
  },
  {
    id: 6,
    title: "Fences & Railing Painting",
    category: "Exterior",
    thumbnail: "/gallery/fencesRailing/fencesRailing7.jpeg",
    images: [
      {
        url: "/gallery/fencesRailing/fencesRailing.jpeg",
        caption: "Before - Old fence",
        type: "before",
      },
      {
        url: "/gallery/fencesRailing/fencesRailing2.jpeg",
        caption: "After - Painted fence",
        type: "before",
      },
      {
        url: "/gallery/fencesRailing/fencesRailing3.jpeg",
        caption: "After - Railing detail",
        type: "before",
      },
      {
        url: "/gallery/fencesRailing/fencesRailing4.jpeg",
        caption: "After - Different section",
        type: "before",
      },
      {
        url: "/gallery/fencesRailing/fencesRailing5.jpeg",
        caption: "After - Another angle",
        type: "before",
      },
      {
        url: "/gallery/fencesRailing/fencesRailing6.jpeg",
        caption: "After - Overall view",
        type: "after",
      },
      {
        url: "/gallery/fencesRailing/fencesRailing7.jpeg",
        caption: "After - Final result",
        type: "after",
      },
    ],
  },
  {
    id: 8,
    title: "Commercial Painting",
    category: "Commercial",
    thumbnail: "/gallery/commercial/commercial8.jpeg",
    images: [
      {
        url: "/gallery/commercial/commercial.jpeg",
        caption: "Commercial project view 1",
        type: "before",
      },
      {
        url: "/gallery/commercial/commercial2.jpeg",
        caption: "Commercial project view 2",
        type: "before",
      },
      {
        url: "/gallery/commercial/commercial3.jpeg",
        caption: "Commercial project view 3",
        type: "before",
      },
      {
        url: "/gallery/commercial/commercial4.jpeg",
        caption: "Commercial project view 4",
        type: "before",
      },
      {
        url: "/gallery/commercial/commercial5.jpeg",
        caption: "Commercial project view 5",
        type: "before",
      },
      {
        url: "/gallery/commercial/commercial6.jpeg",
        caption: "Commercial project view 6",
        type: "after",
      },
      {
        url: "/gallery/commercial/commercial7.jpeg",
        caption: "Commercial project view 7",
        type: "after",
      },
      {
        url: "/gallery/commercial/commercial8.jpeg",
        caption: "Commercial project final result",
        type: "after",
      },
    ],
  },
];

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Open modal with project
  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "auto";
  };

  // Navigate to next image
  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1,
      );
    }
  };

  // Keyboard navigation with useEffect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;

      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const categories = ["all", "Interior", "Exterior", "Commercial"];

  return (
    <section id="gallery" className="py-20 bg-darkest">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Our Work
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Explore our portfolio of completed projects. Click any project to
            see all photos and details.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-accent text-darkest shadow-lg scale-105"
                    : "bg-dark text-slate-300 hover:bg-slate-800"
                }`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl bg-dark">
                {/* Thumbnail Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white text-lg font-bold mb-2">
                        View All Photos
                      </p>
                      <div className="inline-flex items-center gap-2 bg-accent text-darkest px-4 py-2 rounded-full text-sm font-bold">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{project.images.length} Photos</span>
                      </div>
                    </div>
                  </div>

                  {/* Photo count badge */}
                  <div className="absolute top-4 right-4 bg-darkest/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                    {project.images.length} Photos
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <h3 className="font-bold text-slate-100 mb-1 text-lg">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {project.category} Project
                  </p>
                  <div className="mt-3 flex items-center text-accent font-semibold text-sm">
                    <span>Click to view gallery</span>
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-300 mb-6 text-lg">
            Want to see your project featured here? Let's make it happen!
          </p>
          <a
            href="#contact"
            className="inline-block bg-accent text-darkest px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition shadow-lg"
          >
            Start Your Project
          </a>
        </div>
      </div>

      {/* Modal / Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className="relative w-full h-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col max-h-screen overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {selectedProject.title}
                </h3>
                {/* <p className="text-slate-300"> */}
                {/*   {selectedProject.category} Project ·{" "} */}
                {/*   {selectedProject.images.length} Photos */}
                {/* </p> */}
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="text-white hover:text-accent transition p-2 hover:bg-white/10 rounded-full"
                aria-label="Close modal"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Main Image Container */}
            <div className="flex-1 relative flex items-center justify-center mb-4 min-h-0">
              <div className="relative w-full h-full flex items-center justify-center max-h-[70vh]">
                <img
                  src={selectedProject.images[currentImageIndex].url}
                  alt={selectedProject.images[currentImageIndex].caption}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                  style={{ maxHeight: "70vh" }}
                />

                {/* Before/After Badge */}
                <div
                  className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                    selectedProject.images[currentImageIndex].type === "before"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {selectedProject.images[currentImageIndex].type === "before"
                    ? "BEFORE"
                    : "AFTER"}
                </div>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold">
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </div>
              </div>

              {/* Navigation Arrows */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="text-center mb-4">
              <p className="text-slate-300 text-lg">
                {selectedProject.images[currentImageIndex].caption}
              </p>
            </div>

            {/* Thumbnail Strip */}
            {selectedProject.images.length > 1 && (
              <div className="flex gap-2 justify-center overflow-x-auto pb-2 px-4 max-w-full">
                {selectedProject.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
                      index === currentImageIndex
                        ? "ring-4 ring-accent scale-105"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Keyboard Hints */}
            {/* <div className="hidden md:flex justify-center gap-4 mt-4 text-slate-400 text-sm"> */}
            {/*   <span>← → Navigate</span> */}
            {/*   <span>|</span> */}
            {/*   <span>ESC Close</span> */}
            {/* </div> */}
          </div>
        </div>
      )}
    </section>
  );
}
