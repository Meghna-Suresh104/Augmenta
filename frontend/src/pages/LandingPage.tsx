import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import HeritageSiteCard from "@/components/HeritageSiteCard";
import HandicraftCard from "@/components/HandicraftCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImg from "@/assets/hero.jpg";
import bgImg from "/bg.png";
import { Camera, Store, MessageCircle, Star, ChevronDown, TrendingUp } from "lucide-react";

interface LandingPageProps {
  onEnterSite: () => void; // prop for navigation
}

const LandingPage = ({ onEnterSite }: LandingPageProps) => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const features = [
    { icon: Camera, title: "AR Scanner", description: "Bring monuments to life with immersive Augmented Reality scans." },
    { icon: Store, title: "Marketplace", description: "Explore and buy authentic heritage-inspired products." },
    { icon: MessageCircle, title: "Forum", description: "Join the community, discuss heritage, and share experiences." },
    { icon: Star, title: "Reviews", description: "Read and share reviews of heritage sites across India." },
  ];

  const mostVisited = [
    { id: "1", name: "Taj Mahal", location: "Agra, India", image: "/src/assets/taj-mahal.jpg", rating: 4.8, reviews: 12000, arAvailable: true, category: "Monuments" },
    { id: "2", name: "Red Fort", location: "Delhi, India", image: "/src/assets/fort.jpg", rating: 4.6, reviews: 8500, arAvailable: true, category: "Archaeological Sites" },
  ];

  const testimonials = [
    { name: "Rohan Mehta", message: "Amazing AR experience! It felt like I was actually at the Taj Mahal.", avatar: "https://i.pravatar.cc/150?img=12" },
    { name: "Priya Singh", message: "The marketplace has unique heritage products. Totally loved it!", avatar: "https://i.pravatar.cc/150?img=32" },
    { name: "Ankit Sharma", message: "The forum helped me discover hidden monuments in my city.", avatar: "https://i.pravatar.cc/150?img=48" },
  ];
  const faqs = [
    { question: "How do I start an AR scan?", answer: "Click on the AR Scanner feature and allow camera permissions." },
    { question: "Can I purchase items from multiple sellers?", answer: "Yes, our Marketplace supports multiple sellers and secure payments." },
    { question: "Is my data safe?", answer: "Absolutely. We follow strict privacy policies for user data protection." },
    { question: "Can I join the community forum anonymously?", answer: "You can browse anonymously, but posting requires registration." },
  ];
  const bestsellerHandicrafts = [
    { id: "1", name: "Rajasthani Necklace", location: "Jaipur, India", image: "/src/assets/necklace.jpeg", rating: 4.8, reviews: 234, category: "Jewelry", artisan: "Ramesh Kumar" },
    { id: "2", name: "Handwoven Pashmina Shawl", location: "Kashmir, India", image: "/src/assets/shawl.jpg", rating: 4.9, reviews: 456, category: "Textiles", artisan: "Mohammad Ali" },
  ];

  return (
    <div 
      className="min-h-screen relative flex flex-col"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      <Header searchValue="" setSearchValue={() => {}} />

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex flex-col items-center justify-center overflow-hidden text-center text-white px-6">
        <img src={heroImg} alt="Heritage AR Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Explore Heritage in AR
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-lg md:text-xl max-w-2xl drop-shadow-md mb-6">
            Discover monuments, history, and culture like never before — powered by Augmented Reality.
          </motion.p>
          <button onClick={onEnterSite} className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition">
            Enter Site
          </button>
        </div>
      </section>

      {/* Features Section */}
      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto text-center text-white">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-3xl font-semibold mb-10">
          What We Offer
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: index * 0.2 }} viewport={{ once: true }} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-transform flex flex-col items-center text-center border border-white/20">
              <feature.icon className="h-12 w-12 text-yellow-300 mb-4 drop-shadow" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>


{/* Testimonials */}
        <section className="text-white max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold mb-10 text-center">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.2 }} className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-3" />
                <p className="text-gray-200 mb-2">"{t.message}"</p>
                <h4 className="font-semibold">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Most Visited Section */}
        <Card className="mb-6 bg-card/70 border-border/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-white">
              <TrendingUp className="w-5 h-5 mr-2 text-white" /> Most Visited Places
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-left">
            {mostVisited.map(site => (
              <HeritageSiteCard key={site.id} {...site} />
            ))}
          </CardContent>
        </Card>

        {/* Bestseller Handicrafts Section */}
        <Card className="mb-6 bg-card/70 border-border/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center text-lg text-white">
              <Star className="w-5 h-5 mr-2 text-white" /> Bestseller Handicrafts
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {bestsellerHandicrafts.map(item => (
              <HandicraftCard key={item.id} {...item} />
            ))}
          </CardContent>
        </Card>

         {/* FAQ */}
        <section className="text-left text-white max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 cursor-pointer" onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 transition-transform ${faqOpen === index ? "rotate-180" : ""}`} />
                </div>
                {faqOpen === index && <p className="mt-2 text-gray-200">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
