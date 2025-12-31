"use client";

import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Star, Gamepad2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";

const Leaderboard = () => {
    const { userProfile } = useApp();

    // Mock leaderboard data (in a real app, this would come from a backend)
    const leaderboardData = [
        { rank: 1, username: "ProGamer2024", avatar: "👑", score: 15420, gamesPlayed: 87 },
        { rank: 2, username: "GameMaster", avatar: "🎮", score: 14230, gamesPlayed: 75 },
        { rank: 3, username: "ElitePlayer", avatar: "⭐", score: 13890, gamesPlayed: 69 },
        { rank: 4, username: "SpeedRunner", avatar: "⚡", score: 12450, gamesPlayed: 62 },
        { rank: 5, username: "CasualKing", avatar: "🏆", score: 11230, gamesPlayed: 58 },
        { rank: 6, username: "NightGamer", avatar: "🌙", score: 10890, gamesPlayed: 54 },
        { rank: 7, username: "RetroFan", avatar: "🕹️", score: 9870, gamesPlayed: 49 },
        { rank: 8, username: "StrategyPro", avatar: "🧠", score: 8920, gamesPlayed: 45 },
        { rank: 9, username: "ActionHero", avatar: "💪", score: 8340, gamesPlayed: 41 },
        { rank: 10, username: "RPGLover", avatar: "🗡️", score: 7650, gamesPlayed: 38 },
    ];

    // Add current user if they have a profile
    if (userProfile) {
        const userScore = (userProfile.stats.gamesPlayed * 100) +
            (userProfile.stats.favoritesCount * 50) +
            (userProfile.stats.reviewsCount * 200) +
            (userProfile.stats.achievementsCount * 300);

        const userEntry = {
            rank: 0,
            username: userProfile.username,
            avatar: userProfile.avatar,
            score: userScore,
            gamesPlayed: userProfile.stats.gamesPlayed
        };

        // Find user's rank
        const allEntries = [...leaderboardData, userEntry].sort((a, b) => b.score - a.score);
        const userRank = allEntries.findIndex(e => e.username === userProfile.username) + 1;
        userEntry.rank = userRank;
    }

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-6 h-6 text-yellow-500" />;
            case 2:
                return <Medal className="w-6 h-6 text-gray-400" />;
            case 3:
                return <Medal className="w-6 h-6 text-orange-600" />;
            default:
                return <Trophy className="w-6 h-6 text-muted-foreground" />;
        }
    };

    const getRankBadge = (rank: number) => {
        if (rank === 1) return <Badge variant="gaming" className="bg-yellow-500">Champion</Badge>;
        if (rank === 2) return <Badge variant="gaming" className="bg-gray-400">Runner-up</Badge>;
        if (rank === 3) return <Badge variant="gaming" className="bg-orange-600">3rd Place</Badge>;
        if (rank <= 10) return <Badge variant="outline">Top 10</Badge>;
        return null;
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Trophy className="w-12 h-12 text-primary" />
                        <h1 className="text-4xl md:text-6xl font-gaming font-bold gaming-text-gradient">
                            Leaderboard
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Compete with gamers worldwide and climb to the top!
                    </p>
                </motion.div>

                {/* Current User Stats */}
                {userProfile && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8"
                    >
                        <Card variant="glass" className="p-6 border-primary/30 bg-primary/5">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl">{userProfile.avatar}</div>
                                    <div>
                                        <h3 className="text-xl font-gaming font-bold">{userProfile.username}</h3>
                                        <p className="text-sm text-muted-foreground">Your Stats</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-primary">{userProfile.stats.gamesPlayed}</div>
                                        <div className="text-xs text-muted-foreground">Games Played</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-primary">{userProfile.stats.achievementsCount}</div>
                                        <div className="text-xs text-muted-foreground">Achievements</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-primary">{userProfile.stats.reviewsCount}</div>
                                        <div className="text-xs text-muted-foreground">Reviews</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* Leaderboard Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card variant="glass" className="overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-2xl font-gaming font-bold flex items-center gap-2">
                                <Star className="w-6 h-6 text-primary" />
                                Top Players
                            </h2>
                        </div>
                        <div className="divide-y divide-border">
                            {leaderboardData.map((entry, index) => (
                                <motion.div
                                    key={entry.rank}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`p-6 hover:bg-primary/5 transition-colors ${entry.rank <= 3 ? "bg-primary/5" : ""
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="flex items-center gap-3 min-w-[80px]">
                                                {getRankIcon(entry.rank)}
                                                <span className="text-2xl font-gaming font-bold text-muted-foreground">
                                                    #{entry.rank}
                                                </span>
                                            </div>
                                            <div className="text-3xl">{entry.avatar}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-gaming font-bold">{entry.username}</h3>
                                                    {getRankBadge(entry.rank)}
                                                </div>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Gamepad2 className="w-3 h-3" />
                                                    {entry.gamesPlayed} games played
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-gaming font-bold text-primary">
                                                {entry.score.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-muted-foreground">points</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </motion.div>

                {/* How Points Work */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8"
                >
                    <Card variant="glass" className="p-6">
                        <h3 className="text-xl font-gaming font-bold mb-4">How Points Work</h3>
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div className="text-center p-4 rounded-lg bg-primary/5">
                                <div className="text-2xl mb-2">🎮</div>
                                <div className="font-bold">+100</div>
                                <div className="text-muted-foreground">Per Game Played</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-primary/5">
                                <div className="text-2xl mb-2">💜</div>
                                <div className="font-bold">+50</div>
                                <div className="text-muted-foreground">Per Favorite</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-primary/5">
                                <div className="text-2xl mb-2">✍️</div>
                                <div className="font-bold">+200</div>
                                <div className="text-muted-foreground">Per Review</div>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-primary/5">
                                <div className="text-2xl mb-2">🏆</div>
                                <div className="font-bold">+300</div>
                                <div className="text-muted-foreground">Per Achievement</div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Leaderboard;
