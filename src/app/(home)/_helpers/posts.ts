import { Post, PostsResponse } from "@/lib/types/post";
import postsData from "@/data/posts.json";

export const getPosts = async (pageNumber: number = 1, pageSize: number = 20): Promise<PostsResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const allPosts = postsData.posts as Post[];
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalCount: allPosts.length,
    pageNumber,
    pageSize,
    hasNextPage: endIndex < allPosts.length,
    hasPreviousPage: pageNumber > 1,
  };
};

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export const extractHashtags = (text: string): string[] => {
  const hashtagRegex = /#[\w]+/g;
  return text.match(hashtagRegex) || [];
};

export const formatPostContent = (content: string): { text: string; hashtags: string[] } => {
  const hashtags = extractHashtags(content);
  return {
    text: content,
    hashtags,
  };
};
