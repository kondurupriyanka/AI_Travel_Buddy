import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Loader2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
}

const Explore = () => {
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/explore-destinations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ query: searchQuery || "popular travel destinations" }),
        }
      );

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setDestinations(data.destinations || []);
    } catch (error) {
      console.error('Error loading destinations:', error);
      toast({
        title: "Error",
        description: "Failed to load destinations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadDestinations();
  };

  const addToItinerary = (destination: Destination) => {
    toast({
      title: "Added to Itinerary! 🎉",
      description: `${destination.name} has been added to your travel plans`,
    });
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              Explore Amazing Places
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover hidden gems and popular destinations around the world
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
              </Button>
            </div>
          </form>

          {/* Destinations Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col bg-card/95 backdrop-blur-sm border border-border/50">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                      />
                      <Badge className="absolute top-4 right-4 bg-white/90 text-foreground">
                        {destination.category}
                      </Badge>
                    </div>
                    <CardContent className="flex-1 p-6">
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {destination.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {destination.description}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{destination.rating}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button
                        onClick={() => addToItinerary(destination)}
                        className="w-full gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Itinerary
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {destinations.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No destinations found. Try a different search!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;
