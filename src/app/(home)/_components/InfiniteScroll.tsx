"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import SinglePost from "./SinglePost";
import { Post } from "@/lib/types/post";
import { getPosts } from "@/app/(home)/_helpers/posts";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

const InfiniteScrollFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = useCallback(async (page: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await getPosts(page, 10);
      setPosts((prev) => [...prev, ...response.posts]);
      setHasNextPage(response.hasNextPage);
      setPageNumber(page);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    loadPosts(1);
  }, []);

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isLoading) {
          loadPosts(pageNumber + 1);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isLoading, pageNumber, loadPosts]);

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <Loader2 className="w-8 h-8 text-main-green animate-spin" />
          <p className="text-text-ash text-sm">Loading posts...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {posts.map((post, index) => (
          <SinglePost key={post.postUnique} post={post} index={index} />
        ))}
      </motion.div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-8"
        >
          <Loader2 className="w-6 h-6 text-main-green animate-spin" />
        </motion.div>
      )}

      <div
        ref={sentinelRef}
        className="h-20 flex items-center justify-center"
      >
        {!hasNextPage && posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <p className="text-text-ash font-medium">🎉 You&apos;ve reached the end!</p>
            <p className="text-text-ash-light text-sm mt-1">No more posts to load</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScrollFeed;
