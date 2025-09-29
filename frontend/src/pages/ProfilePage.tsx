import { useState } from "react";
import Header from "@/components/Header";
import BottomNavbar from "@/components/BottomNavbar";
import HeritageSiteCard from "@/components/HeritageSiteCard";
import HandicraftCard from "@/components/HandicraftCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import userAvatar from "@/assets/user-avatar.jpg"; // replace with your default avatar

const ProfilePage = () => {
  const [user] = useState({
    name: "Person",
    email: "Person@example.com",
    avatar: userAvatar
  });

  const visitedSites = [
    { id: "1", name: "Taj Mahal", location: "Agra, India", image: "/src/assets/taj-mahal.jpg", rating: 4.8, reviews: 1200, arAvailable: true, category: "Monuments" },
    { id: "2", name: "Red Fort", location: "Delhi, India", image: "/src/assets/fort.jpg", rating: 4.6, reviews: 900, arAvailable: true, category: "Archaeological Sites" }
  ];

  const purchasedHandicrafts = [
    { id: "1", name: "Handwoven Shawl", location: "Kashmir, India", image: "/src/assets/shawl.jpg", category: "Textiles", artisan: "Mohammad Ali", rating: 4.9, reviews: 150 },
    { id: "2", name: "Rajasthani Necklace", location: "Jaipur, India", image: "/src/assets/necklace.jpeg", category: "Jewelry", artisan: "Ramesh Kumar", rating: 4.8, reviews: 200 }
  ];

  const reviews = [
    { id: "1", site: "Taj Mahal", message: "Loved the AR experience!", rating: 5 },
    { id: "2", site: "Red Fort", message: "Very informative and immersive.", rating: 4.5 }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.png')" }}>
      <Header searchValue="" setSearchValue={() => {}} />

      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto pb-32">
        {/* pb-32 added to prevent content being hidden behind BottomNavbar */}

        {/* User Info */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border border-white/20 p-6 flex items-center space-x-6">
          <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-2 border-yellow-400" />
          <div className="flex-1 text-white">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-300">{user.email}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </Card>

        {/* Visited Sites */}
        <Card className="mb-6 bg-card/70 border-border/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg text-white">Visited Sites</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-left">
            {visitedSites.map(site => (
              <HeritageSiteCard key={site.id} {...site} />
            ))}
          </CardContent>
        </Card>

        {/* Purchased Handicrafts */}
        <Card className="mb-6 bg-card/70 border-border/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg text-white">Purchased Handicrafts</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {purchasedHandicrafts.map(item => (
              <HandicraftCard key={item.id} {...item} />
            ))}
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="mb-6 bg-card/70 border-border/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg text-white">Your Reviews</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-left">
            {reviews.map(r => (
              <div key={r.id} className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20">
                <p className="text-gray-200 font-medium">{r.site}</p>
                <p className="text-gray-300">{r.message}</p>
                <p className="text-yellow-400 font-semibold">Rating: {r.rating} ⭐</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default ProfilePage;
