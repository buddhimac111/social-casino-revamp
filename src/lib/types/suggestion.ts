export interface SuggestionGame {
  id: number;
  name: string;
  imageUrl: string;
}

export interface SuggestionFollower {
  id: string;
  imageUrl: string;
  name: string;
}

export interface FriendSuggestion {
  id: string;
  displayName: string;
  handle: string;
  profileImageUrl: string;
  bannerImageUrl: string;
  loyaltyPoints: number;
  tierBadge: "Gold" | "Silver" | "Bronze";
  isOnline: boolean;
  recentGames: SuggestionGame[];
  followedBy: SuggestionFollower[];
  followedByCount: number;
}
