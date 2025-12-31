"use client";

import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { GameSection } from "@/components/games/GameSection";
import { motion } from "framer-motion";
import { Gamepad2, Globe, Smartphone, Play, Users, Shield } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const features = [
  {
    icon: Globe,
    title: "Global Library",
    description: "Access games from every corner of the world"
  },
  {
    icon: Smartphone,
    title: "Phone Controller",
    description: "Use your phone as a gamepad for any game"
  },
  {
    icon: Play,
    title: "Instant Play",
    description: "Play select games directly in your browser"
  },
  {
    icon: Users,
    title: "Community",
    description: "Join millions of gamers worldwide"
  }
];

const Index = () => {
  const { allGames } = useAdmin();

  // Filter games dynamically from AdminContext
  const featuredGames = allGames.filter(game => game.isFeatured);
  const newReleases = allGames.filter(game => game.isNew);
  const playableGames = allGames.filter(game => game.isPlayable);
  const popularGames = [...allGames].sort((a, b) => b.rating - a.rating);

  return (
    <>

      <Layout>

        {/* Hero Section */}
        {featuredGames[0] && <HeroSection featuredGame={featuredGames[0]} />}

        {/* Features Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-gaming font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Sections */}
        <div className="container mx-auto px-4">
          <GameSection
            title="🔥 Featured Games"
            games={featuredGames}
            viewAllLink="/games?featured=true"
          />

          <GameSection
            title="🆕 New Releases"
            games={newReleases}
            viewAllLink="/games?new=true"
          />

          <GameSection
            title="🎮 Play Online Free"
            games={playableGames}
            viewAllLink="/play"
          />

          <GameSection
            title="⭐ Popular Games"
            games={popularGames}
            viewAllLink="/games"
          />
        </div>

        {/* Categories Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-gaming font-bold mb-2">Explore by Genre</h2>
                <p className="text-muted-foreground">Find your next obsession in our curated categories</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Action", icon: "⚔️", color: "from-red-500/20 to-orange-500/20", border: "border-red-500/30" },
                { name: "RPG", icon: "🧙‍♂️", color: "from-purple-500/20 to-blue-500/20", border: "border-purple-500/30" },
                { name: "Strategy", icon: "🧠", color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30" },
                { name: "Casual", icon: "🎈", color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30" },
              ].map((category) => (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`p-8 rounded-2xl border ${category.border} bg-gradient-to-br ${category.color} cursor-pointer group transition-all`}
                  onClick={() => window.location.href = `/games?genre=${category.name.toLowerCase()}`}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <h3 className="text-xl font-gaming font-bold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse {category.name} Games
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Index;
