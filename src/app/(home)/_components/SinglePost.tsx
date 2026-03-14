"use client";

import React from "react";
import { Post } from "@/lib/types/post";
import { formatTimeAgo } from "@/app/(home)/_helpers/posts";
import { SeeMore } from "./SeeMore";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi,
// } from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ImageGrid from '@/app/(home)/_components/ImageGrid'
import { Interactions } from "./Interactions";
import { motion } from "motion/react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MoreHorizontal } from "lucide-react";
interface SinglePostProps {
  post: Post;
  index: number;
}

const SinglePost: React.FC<SinglePostProps> = ({ post, index }) => {
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const handleCarouselApi = (api: CarouselApi) => {
  //   if (!api) return;

  //   setCurrentSlide(api.selectedScrollSnap());

  //   api.on("select", () => {
  //     setCurrentSlide(api.selectedScrollSnap());
  //   });
  // };

  // If post type is "ad", render ad layout
  if (post.postType === "ad" && post.media && post.media.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="mb-8 bg-card rounded-xl border border-border-ash shadow-sm overflow-hidden"
      >
        <div className="relative">
          <ImageGrid 
            aspectRatio={post.aspectRatio || "16:9"}
            media={post.media.map((media) => ({
              src: media.url,
              alt: media.caption || "Advertisement",
              type: media.mediaType === "video" ? "video" : "image"
            }))} 
          />
          {/* AD Label - Top Right Corner */}
          <div className="absolute top-3 right-3 bg-header-blue border-2 border-border-ash text-white px-3 py-1 rounded-md text-md font-bold backdrop-blur-sm z-40 animate-pulse">
            AD
          </div>
        </div>
      </motion.div>
    );
  }

  // Normal post layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="mb-8 bg-card rounded-xl border border-border-ash shadow-sm overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10 border-2 border-border-ash">
              <AvatarImage
                src={post.authorProfileImage || undefined}
                alt={post.authorName || ""}
              />
              <AvatarFallback className="bg-accent-blue text-header-blue font-semibold">
                {post.authorName?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h3
                  className={`text-base font-semibold ${post.isAdmin ? "text-main-green" : "text-header-blue"
                    }`}
                >
                  {post.authorName}
                </h3>
                {post.isVerified && (
                  <RiVerifiedBadgeFill
                    className={`w-4 h-4 ${post.isAdmin ? "text-main-green" : "text-header-blue"}`}
                    size={16}
                  />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-ash">
                {post.authorTitle && <span>{post.authorTitle}</span>}
                <span>•</span>
                <span>
                  {formatTimeAgo(post.createdUtc)}
                </span>
              </div>
            </div>
          </div>


          <button
            type="button"
            className="ml-2 p-1 rounded-full hover:bg-accent-blue text-icon-ash"
            aria-label="Post actions"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:block mt-4 h-[0.7px] bg-border-ash -mx-4" />

        {post.content && (
          <div className="mt-3">
            <SeeMore username={post.authorName || ""} text={post.content} />
          </div>
        )}
      </div>

      {post.media && post.media.length > 0 && (
        <div className="relative">
          <ImageGrid 
            aspectRatio={post.aspectRatio}
            media={post.media.map((media) => ({
              src: media.url,
              alt: media.caption || "",
              type: media.mediaType === "video" ? "video" : "image"
            }))} 
          />
          {/* <Carousel
            className="w-full"
            opts={{
              align: "start",
            }}
            setApi={handleCarouselApi}
          >
            <CarouselContent>
              {post.media.map((media, idx) => (
                <CarouselItem key={media.id || idx}>
                  {renderMediaContent(media)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white z-20" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white z-20" />
          </Carousel> */}

          {/* <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium z-20">
            {currentSlide + 1} / {post.media.length}
          </div> */}
        </div>
      )}

      <div className="px-4 pb-4">
        <Interactions post={post} />
      </div>
    </motion.div>
  );
};

export default SinglePost;
