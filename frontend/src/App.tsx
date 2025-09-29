import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Index from "./pages/Index";
import ProfilePage from "./pages/ProfilePage";
import MarketplacePage from "./pages/MarketplacePage";
import NotFound from "./pages/NotFound";
import CameraPage from "./pages/CameraPage";
import ForumPage from "./pages/ForumPage";
import LandingPage from "./pages/LandingPage";
import BottomNavbar from "./components/BottomNavbar";

const queryClient = new QueryClient();

// Wrapper to conditionally show BottomNavbar
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/camera"]; // paths where navbar should be hidden
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {children}
      {showNavbar && <BottomNavbar />}
    </>
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();

  const handleEnterSite = () => {
    navigate("/profile"); // navigate to ProfilePage when entering site
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onEnterSite={handleEnterSite} />} />
      <Route path="/scan" element={<Index />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/forum" element={<ForumPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
