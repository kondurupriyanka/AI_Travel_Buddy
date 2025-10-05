# AI Travel Buddy Companion

A web-based **AI-powered travel assistant** that helps users **plan, personalize, and organize trips** efficiently. Designed for travelers, students, and professionals, this project leverages real-time data and AI to create optimized travel itineraries and experiences.

## Features

* **Smart Itinerary Planner**: Generates personalized trip plans with AI.
* **Real-Time Weather Integration**: Live weather updates using OpenWeather API.
* **Interactive Maps & Routes**: Accurate navigation powered by Google Maps and Mapbox.
* **Destination Photos**: Fetches high-quality images from Unsplash API.
* **Local Recommendations**: AI-driven attraction, food, and experience suggestions.
* **Customizable Reports**: Export itineraries as PDF or share with others.
* **User-Friendly Dashboard**: Clean and intuitive interface with smooth navigation.

## Demo link

https://ai-travel-buddy-companion.vercel.app/

## Images
![img](ai-travel-whisperer-51-main/a1.jpg)
![img](ai-travel-whisperer-51-main/a2.jpg)
![img](ai-travel-whisperer-51-main/a3.jpg)
![img](ai-travel-whisperer-51-main/a4.jpg)
![img](ai-travel-whisperer-51-main/a5.jpg)
![img](ai-travel-whisperer-51-main/a6.jpg)
![img](ai-travel-whisperer-51-main/a7.jpg)

## How It Works

1. Enter your **destination and dates** in the web interface.
2. AI generates a **personalized itinerary** tailored to your preferences.
3. Weather, maps, and destination images are fetched from APIs.
4. View, refine, and export your trip plan in the dashboard.

## Technologies Used

* **Frontend**: Vite, React, Tailwind CSS, shadcn-ui
* **Backend**: FastAPI, Supabase
* **AI & NLP**: Gemini AI
* **APIs**: OpenWeather, Google Maps, Mapbox, Unsplash
* **Data Handling**: Pandas, NumPy
* **Deployment**: Vercel, Netlify, Supabase

## Setup Instructions

```bash
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/kondurupriyanka/AI_Travel_Buddy.git

# Step 2: Navigate to the project directory.
cd ai-travel-whisperer-51-main

# Step 3: Install frontend dependencies.
npm install

# Step 4: Start the development server with live reloading.
npm run dev

# Step 5: Configure environment variables in a .env file or directly inside your project.
```

## Environment Variables

```bash
VITE_SUPABASE_PROJECT_ID="lagphrwtdgaqblkboiai"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZ3Bocnd0ZGdhcWJsa2JvaWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1ODgyOTEsImV4cCI6MjA3NTE2NDI5MX0.mZoViiuhuKmkBCLpvTEHLgPlXdrzho7mygnwiHMKmV4"
VITE_SUPABASE_URL="https://lagphrwtdgaqblkboiai.supabase.co"

# API Keys
GEMINI_AI_API_KEY="your_gemini_ai_api_key"
OPENWEATHER_API_KEY="your_openweather_api_key"
GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
MAPBOX_API_KEY="your_mapbox_api_key"
UNSPLASH_API_KEY="your_unsplash_api_key"
```

## Future Enhancements

* Flight and hotel booking integration.
* Offline mode with cached itineraries.
* AR-based travel navigation.
* AI chatbot for real-time travel queries.
