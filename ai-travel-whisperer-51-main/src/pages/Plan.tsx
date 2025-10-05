import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, MapPin, DollarSign, Loader2, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Plan = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    currentLocation: "",
    destination: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    budget: [100],
    interests: [] as string[],
    activityType: "walking",
  });

  const interests = [
    "Food & Dining",
    "Nature & Parks",
    "Nightlife",
    "Adventure Sports",
    "Museums & Culture",
    "Shopping",
    "Photography",
    "Local Experiences",
  ];

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.destination || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Call the AI itinerary generation edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-itinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          destination: formData.destination,
          startDate: formData.startDate,
          endDate: formData.endDate,
          budget: formData.budget[0],
          interests: formData.interests,
          activityType: formData.activityType,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setItinerary(data.itinerary);
      
      toast({
        title: "Itinerary Generated! ✈️",
        description: "Your personalized travel plan is ready",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
              Plan Your Perfect Trip
            </h1>
            <p className="text-xl text-muted-foreground">
              Let AI create a personalized itinerary just for you
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/95 backdrop-blur-sm rounded-2xl border border-border/50 p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Destination *
                </Label>
                <Input
                  id="destination"
                  placeholder="e.g., Bali, Indonesia"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                />
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => setFormData({ ...formData, startDate: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => setFormData({ ...formData, endDate: date })}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  Daily Budget: ${formData.budget[0]}
                </Label>
                <Slider
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  min={10}
                  max={500}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <Label>Interests</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {interests.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={() => toggleInterest(interest)}
                      />
                      <Label
                        htmlFor={interest}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Itinerary...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Itinerary
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Itinerary Display */}
          {itinerary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 bg-card/95 backdrop-blur-sm rounded-2xl border border-border/50 p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Your Personalized Itinerary
              </h2>
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-foreground">{itinerary}</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Plan;
