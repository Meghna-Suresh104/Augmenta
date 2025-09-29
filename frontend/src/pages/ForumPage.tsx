import { useState } from "react";
import Header from "@/components/Header";
import BottomNavbar from "@/components/BottomNavbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Thread {
  id: string;
  title: string;
  author: string;
  votes: number;
  answers: number;
  tags: string[];
  location: string;
}

const ForumPage = () => {
  const [searchValue, setSearchValue] = useState(""); // Added for Header
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: "1",
      title: "What is the history of Taj Mahal?",
      author: "Amit Sharma",
      votes: 12,
      answers: 4,
      tags: ["Monuments", "History"],
      location: "Agra",
    },
    {
      id: "2",
      title: "Best time to visit Hampi?",
      author: "Priya Singh",
      votes: 8,
      answers: 2,
      tags: ["Travel", "Tips"],
      location: "Hampi",
    },
    {
      id: "3",
      title: "Are there guided tours in Mysore Palace?",
      author: "Rohan Verma",
      votes: 15,
      answers: 6,
      tags: ["Palaces", "Tourism"],
      location: "Mysore",
    },
    {
      id: "4",
      title: "Is photography allowed in Taj Mahal?",
      author: "Neha Kapoor",
      votes: 5,
      answers: 1,
      tags: ["Monuments", "Photography"],
      location: "Agra",
    },
  ]);

  const [selectedLocation, setSelectedLocation] = useState<string>("All");

  // Get unique locations for filter buttons
  const locations = ["All", ...Array.from(new Set(threads.map((t) => t.location)))];

  // Filter threads by selected location
  const filteredThreads =
    selectedLocation === "All"
      ? threads
      : threads.filter((thread) => thread.location === selectedLocation);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Header with search */}
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />

      <main className="max-w-4xl mx-auto px-6 py-6 pb-32">
        {/* Header & Post Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Discussion Forum</h1>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Post Question
          </Button>
        </div>

        {/* Location Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {locations.map((loc) => (
            <Badge
              key={loc}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                selectedLocation === loc
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedLocation(loc)}
            >
              {loc}
            </Badge>
          ))}
        </div>

        {/* Threads */}
        <div className="space-y-4">
          {filteredThreads.map((thread) => (
            <div
              key={thread.id}
              className="bg-white text-black rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h2 className="font-semibold text-lg">{thread.title}</h2>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                <span>by {thread.author}</span>
                <div className="flex space-x-4">
                  <span>⬆ {thread.votes}</span>
                  <span>💬 {thread.answers} answers</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {thread.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-gray-200 text-black px-2 py-0.5 rounded-full text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">Location: {thread.location}</div>
            </div>
          ))}

          {filteredThreads.length === 0 && (
            <div className="text-gray-400 text-center mt-6">
              No questions found for "{selectedLocation}"
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
};

export default ForumPage;
