"use client";

import React, { useState } from "react";
import { Post } from "@/lib/types/post";
import { formatTimeAgo } from "@/app/(home)/_helpers/posts";
import { SeeMore } from "./SeeMore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Interactions } from "./Interactions";
import { motion } from "motion/react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MoreHorizontal } from "lucide-react";

interface SinglePostProps {
  post: Post;
  index: number;
}

const SinglePost: React.FC<SinglePostProps> = ({ post, index }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCarouselApi = (api: CarouselApi) => {
    if (!api) return;

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  };

  const shouldUseBlurredBackground = () => {
    return post.aspectRatio === "1:1" || post.aspectRatio === "9:16";
  };

  const renderMediaContent = (media: Post["media"][0]) => {
    const content =
      media.mediaType === "image" ? (
        <img
          src={media.url}
          alt={media.caption || "Post image"}
          className="w-full h-full object-contain relative z-10"
        />
      ) : (
        <video
          src={media.url}
          controls
          controlsList="nodownload"
          className="w-full h-full object-contain relative z-10"
          preload="metadata"
          playsInline
        />
      );

    if (shouldUseBlurredBackground()) {
      return (
        <div className="relative w-full aspect-video overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-60 scale-110"
            style={{ backgroundImage: `url(${media.url})` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {content}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full aspect-video">
        {content}
      </div>
    );
  };

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
        <div className="hidden md:block mt-4 h-px bg-border-ash -mx-4" />

        {post.content && (
          <div className="mt-3">
            <SeeMore username={post.authorName || ""} text={post.content} />
          </div>
        )}
      </div>

      {post.media && post.media.length > 0 && (
        <div className="relative">
          {post.media.length === 1 ? (
            renderMediaContent(post.media[0])
          ) : (
            <div className="relative">
              <Carousel
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
              </Carousel>

              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium z-20">
                {currentSlide + 1} / {post.media.length}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="px-4 pb-4">
        <Interactions post={post} />
      </div>
    </motion.div>
  );
};

export default SinglePost;
