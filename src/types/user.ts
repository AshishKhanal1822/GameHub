export interface UserProfile {
    id: string;
    username: string;
    avatar: string;
    createdAt: string;
    stats: {
        gamesPlayed: number;
        favoritesCount: number;
        reviewsCount: number;
        achievementsCount: number;
    };
    achievements: Achievement[];
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
    progress?: number;
    maxProgress?: number;
}

export interface GameReview {
    id: string;
    gameId: string;
    userId: string;
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
    helpful: number;
}

export interface LeaderboardEntry {
    userId: string;
    username: string;
    avatar: string;
    score: number;
    gamesPlayed: number;
    rank: number;
}
