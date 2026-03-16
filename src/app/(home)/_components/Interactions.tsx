"use client";

import { Heart, MessageCircle, SendHorizontal, Bookmark, Paperclip, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Post } from "@/lib/types/post";
import { motion } from "motion/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface InteractionsProps {
  post: Post;
  onCommentClick?: () => void;
}

export const Interactions = ({ post, onCommentClick }: InteractionsProps) => {
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);
  const [isSaved, setIsSaved] = useState(post.isSavedByCurrentUser);
  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [commentText, setCommentText] = useState("");
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
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

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? (likeCount || 0) - 1 : (likeCount || 0) + 1);
  };

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log("Comment submitted:", commentText);
      setCommentText("");
    }
  };

  const handleEmojiPick = (emoji: string) => {
    setCommentText((prev) => `${prev}${emoji}`);
    setShowEmojiMenu(false);
  };

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

  return (
    <div className="mt-3 space-y-3">
      <div className="flex items-center gap-6 px-1">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLikeClick}
          className="flex items-center gap-1.5 group"
        >
          <Heart
            className={`w-6 h-6 transition-all duration-200 ${isLiked
              ? "fill-gold text-gold"
              : "text-text-ash group-hover:text-gold group-hover:scale-110"
              }`}
          />
          <span className="text-sm font-medium text-header-blue">
            {likeCount}
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onCommentClick}
          className="flex items-center gap-1.5 group"
        >
          <MessageCircle className="w-6 h-6 text-text-ash group-hover:text-header-blue transition-colors" />
          <span className="text-sm font-medium text-header-blue">
            {post.commentsCount}
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-1.5 group"
        >
          <SendHorizontal className="w-6 h-6 text-text-ash group-hover:text-header-blue transition-colors" />
          <span className="text-sm font-medium text-header-blue">
            {post.sharesCount}
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSaveClick}
          className="flex items-center gap-1.5 group"
        >
          <Bookmark
            className={`w-6 h-6 transition-all duration-200 ${isSaved
              ? "fill-gold text-gold"
              : "text-text-ash group-hover:text-gold group-hover:scale-110"
              }`}
          />
          <span className="text-sm font-medium text-header-blue">876</span>
        </motion.button>
      </div>

      <div className="hidden md:block mt-4 h-px bg-border-ash -mx-4" />

      <div className="flex items-center gap-2 px-1">
        <Avatar className="w-9 h-9 border border-border-ash shrink-0">
          <AvatarImage
            src={post.authorProfileImage || undefined}
            alt="Current user"
          />
          <AvatarFallback className="bg-accent-blue text-header-blue text-xs font-semibold">
            U
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 bg-background border border-border-ash rounded-full px-4 py-1.5">
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
          <SendHorizontal className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </div>
  );
};
