export interface Media {
  id: number;
  mediaUnique: string;
  url: string;
  caption: string;
  mediaType: "image" | "video";
  order: number;
}

export interface Category {
  id: number;
  categoryUnique: string;
  name: string;
}

export interface Post {
  id: number;
  postUnique: string;
  title?: string;
  subtitle?: string;
  authorTitle?: string;
  aspectRatio?: "1:1" | "9:16" | "16:9";
  content: string;
  authorId: string;
  authorName: string;
  authorProfileImage: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  createdUtc: string;
  modifiedUtc: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  rating: number;
  isLikedByCurrentUser: boolean;
  isSharedByCurrentUser: boolean;
  isRatedByCurrentUser: boolean;
  isSavedByCurrentUser: boolean;
  media: Media[];
  categories?: Category[];
  postType: "Normal" | "Game" | "LiveStream";
  status: number;
  location?: string;
}

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
