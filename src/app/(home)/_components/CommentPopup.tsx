"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Heart, MoreHorizontal, Smile, Paperclip } from "lucide-react";
import { Post } from "@/lib/types/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface CommentPopupProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

// Mock comment type - replace with actual type when API is ready
interface Comment {
  id: string;
  userName: string;
  userProfileImage?: string;
  text: string;
  timestamp: string;
  likesCount: number;
  isLiked: boolean;
  replies?: Comment[];
}

// Mock comments data - will be replaced with API data
const mockComments: Comment[] = [
  {
    id: "1",
    userName: "salvadorx",
    userProfileImage: "https://i.pravatar.cc/150?img=3",
    text: "Server isn't working",
    timestamp: "1d",
    likesCount: 0,
    isLiked: false,
    replies: [
      {
        id: "2",
        userName: "salvadorx",
        userProfileImage: "https://i.pravatar.cc/150?img=3",
        text: "Server isn't working",
        timestamp: "1d",
        likesCount: 0,
        isLiked: false,
      },
      {
        id: "3",
        userName: "salvadorx",
        userProfileImage: "https://i.pravatar.cc/150?img=3",
        text: "Server isn't working",
        timestamp: "1d",
        likesCount: 0,
        isLiked: false,
      },
    ],
  },
  {
    id: "4",
    userName: "salvadorx",
    userProfileImage: "https://i.pravatar.cc/150?img=3",
    text: "Server isn't working",
    timestamp: "1d",
    likesCount: 0,
    isLiked: false,
  },
  {
    id: "5",
    userName: "salvadorx",
    userProfileImage: "https://i.pravatar.cc/150?img=3",
    text: "Server isn't working",
    timestamp: "1d",
    likesCount: 0,
    isLiked: false,
  },
];

const CommentItem = ({
  comment,
  onReply,
  depth = 0,
}: {
  comment: Comment;
  onReply: (comment: Comment) => void;
  depth?: number;
}) => {
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likesCount, setLikesCount] = useState(comment.likesCount);
  const [showReplies, setShowReplies] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <div className="mb-3">
      <div className="flex gap-3 group">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage
            src={comment.userProfileImage || undefined}
            alt={comment.userName}
          />
          <AvatarFallback className="bg-accent-blue text-header-blue text-xs">
            {comment.userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm text-header-blue">
              {comment.userName}
            </span>
            <span className="text-xs text-text-ash">{comment.timestamp}</span>
          </div>

          <p className="text-sm text-header-blue mb-2">{comment.text}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLikeClick}
              className="flex items-center gap-1 text-xs text-text-ash hover:text-gold transition-colors"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isLiked ? "fill-gold text-gold" : ""}`}
              />
              {likesCount > 0 && <span>{likesCount} like</span>}
            </button>

            <button
              onClick={() => onReply(comment)}
              className="text-xs text-text-ash hover:text-header-blue transition-colors font-medium"
            >
              Reply
            </button>
          </div>
        </div>

        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
          <MoreHorizontal className="w-4 h-4 text-text-ash" />
        </button>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-3">
          {!showReplies ? (
            <button
              onClick={() => setShowReplies(true)}
              className="text-xs text-main-green hover:text-main-green/80 font-semibold"
            >
              View {comment.replies.length} replies
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowReplies(false)}
                className="text-xs text-main-green hover:text-main-green/80 font-semibold mb-3"
              >
                Hide replies
              </button>
              <div className="space-y-3 border-l-2 border-border-ash pl-4">
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    depth={depth + 1}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export const CommentPopup = ({ post, isOpen, onClose }: CommentPopupProps) => {
  const [commentText, setCommentText] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const emojiMenuRef = useRef<HTMLDivElement>(null);

  const quickEmojis = [
    "😀",
    "😍",
    "🔥",
    "🎉",
    "👏",
    "👍",
    "💯",
    "❤️",
    "😂",
    "😎",
    "😢",
    "😭",
    "😮",
    "😲",
    "😱",
  ];

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (post.aspectRatio) {
      case "1:1":
        return "aspect-square";
      case "16:9":
        return "aspect-video";
      case "9:16":
        return "aspect-auto";
      default:
        return "aspect-video";
    }
  };

  const handleCarouselApi = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, []);

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log("Comment submitted:", commentText);
      setCommentText("");
      setReplyingTo(null);
    }
  };

  const handleReply = (comment: Comment) => {
    setReplyingTo(comment);
    setCommentText(`@${comment.userName} `);
  };

  const handleEmojiPick = (emoji: string) => {
    setCommentText((prev) => `${prev}${emoji}`);
    setShowEmojiMenu(false);
  };

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Close emoji menu on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        emojiMenuRef.current &&
        !emojiMenuRef.current.contains(event.target as Node)
      ) {
        setShowEmojiMenu(false);
      }
    };

    if (showEmojiMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showEmojiMenu]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        ref={popupRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-xl shadow-2xl w-[90vw] max-h-[90vh] flex overflow-hidden border border-border-ash"
      >
        {/* Left side - Media */}
        <div className="hidden md:flex w-1/2 bg-black items-center justify-center relative">
          {post.media && post.media.length > 0 ? (
            post.media.length === 1 ? (
              <div className={`w-full ${getAspectRatioClass()} flex items-center justify-center bg-black`}>
                {post.media[0].mediaType === "image" ? (
                  <img
                    src={post.media[0].url}
                    alt={post.media[0].caption || post.title || "Post media"}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <video
                    src={post.media[0].url}
                    controls
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Carousel
                  className="w-full"
                  opts={{ align: "start" }}
                  setApi={handleCarouselApi}
                >
                  <CarouselContent className="h-full">
                    {post.media.map((media, index) => (
                      <CarouselItem key={media.id || index} className="h-full">
                        <div className={`w-full ${getAspectRatioClass()} flex items-center justify-center bg-black`}>
                          {media.mediaType === "image" ? (
                            <img
                              src={media.url}
                              alt={media.caption || `Post image ${index + 1}`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <video
                              src={media.url}
                              controls
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white" />
                </Carousel>

                {/* Media counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {currentSlide + 1} / {post.media.length}
                </div>
              </div>
            )
          ) : (
            <div className="text-text-ash-light">No media available</div>
          )}
        </div>

        {/* Right side - Comments */}
        <div className="flex-1 flex flex-col h-[90vh] bg-card">
          {/* Header */}
          <div className="p-4 border-b border-border-ash flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border-2 border-border-ash">
                <AvatarImage
                  src={post.authorProfileImage || undefined}
                  alt={post.authorName || ""}
                />
                <AvatarFallback className="bg-accent-blue text-header-blue font-semibold">
                  {post.authorName?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span
                    className={`font-semibold text-sm ${post.isAdmin ? "text-main-green" : "text-header-blue"}`}
                  >
                    {post.authorName}
                  </span>
                  {post.isVerified && (
                    <RiVerifiedBadgeFill
                      className={`w-4 h-4 ${post.isAdmin ? "text-main-green" : "text-header-blue"}`}
                    />
                  )}
                </div>
                {post.authorTitle && (
                  <span className="text-xs text-text-ash">{post.authorTitle}</span>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-accent-blue transition-colors"
            >
              <X className="w-5 h-5 text-text-ash" />
            </button>
          </div>

          {/* Post content */}
          {post.content && (
            <div className="px-4 py-3 border-b border-border-ash">
              <p className="text-sm text-header-blue">{post.content}</p>
            </div>
          )}

          {/* Comments list */}
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-glassy">
            {mockComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
              />
            ))}
          </div>

          {/* Comment input */}
          <div className="p-4 border-t border-border-ash">
            {replyingTo && (
              <div className="mb-3 flex items-center justify-between bg-accent-blue px-3 py-2 rounded-lg">
                <span className="text-sm text-header-blue">
                  Replying to{" "}
                  <span className="font-semibold">{replyingTo.userName}</span>
                </span>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setCommentText("");
                  }}
                  className="text-text-ash hover:text-header-blue"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Avatar className="w-9 h-9 border border-border-ash shrink-0">
                <AvatarImage
                  src={post.authorProfileImage || undefined}
                  alt="Current user"
                />
                <AvatarFallback className="bg-accent-blue text-header-blue text-xs font-semibold">
                  U
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 bg-background border border-border-ash rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Write your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleCommentSubmit();
                    }
                  }}
                  className="w-full bg-transparent text-sm text-header-blue placeholder:text-text-ash-light outline-none"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                className="w-9 h-9 rounded-full bg-background border border-border-ash hover:bg-accent-blue transition-colors flex items-center justify-center shrink-0 text-text-ash"
                aria-label="Attach file"
              >
                <Paperclip className="w-5 h-5" />
              </motion.button>

              <div className="relative" ref={emojiMenuRef}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowEmojiMenu((prev) => !prev)}
                  className="w-9 h-9 rounded-full bg-background border border-border-ash hover:bg-accent-blue transition-colors flex items-center justify-center shrink-0 text-text-ash"
                  aria-label="Add emoji"
                >
                  <Smile className="w-5 h-5" />
                </motion.button>

                {showEmojiMenu && (
                  <div className="absolute bottom-11 right-0 z-20 w-44 rounded-xl border border-border-ash bg-card p-2 shadow-lg">
                    <div className="grid grid-cols-5 gap-1">
                      {quickEmojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleEmojiPick(emoji)}
                          className="rounded-md p-1 text-lg hover:bg-accent-blue transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={handleCommentSubmit}
                disabled={!commentText.trim()}
                className="w-9 h-9 rounded-full bg-main-green hover:bg-main-green/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                aria-label="Send comment"
              >
                <Send className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CommentPopup;
