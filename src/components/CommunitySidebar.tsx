import { MessageSquare, Share2, Award, Users, TrendingUp, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const CommunitySidebar = () => {
  const communityPosts = [
    {
      user: "Sarah M.",
      avatar: "SM",
      content: "Just experienced the Taj Mahal in AR! The details are incredible 🏛️",
      likes: 24,
      time: "2h ago",
      site: "Taj Mahal"
    },
    {
      user: "Mike R.",
      avatar: "MR", 
      content: "Found hidden chambers in Machu Picchu AR tour! Anyone else discover this?",
      likes: 18,
      time: "4h ago",
      site: "Machu Picchu"
    },
    {
      user: "Elena C.",
      avatar: "EC",
      content: "The Colosseum gladiator experience gave me chills! Must-try AR feature 🏛️",
      likes: 31,
      time: "6h ago",
      site: "Colosseum"
    }
  ];

  const topContributors = [
    { name: "Alex Thompson", points: 2450, badge: "Heritage Master" },
    { name: "Maria Santos", points: 2180, badge: "AR Pioneer" },
    { name: "David Kim", points: 1965, badge: "Culture Guide" }
  ];

  return (
    <div className="w-80 bg-background/50 backdrop-blur border-l border-border/50 p-4 space-y-6">
      {/* Community Stats */}
      <Card className="bg-gradient-community/10 border-community/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center text-community">
            <Users className="w-4 h-4 mr-2" />
            Community Highlights
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-2 bg-background/50 rounded-lg">
              <div className="font-semibold text-community">1.2M</div>
              <div className="text-muted-foreground text-xs">Experiences</div>
            </div>
            <div className="text-center p-2 bg-background/50 rounded-lg">
              <div className="font-semibold text-community">45K</div>
              <div className="text-muted-foreground text-xs">Contributors</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Community Posts */}
      <Card className="bg-card/30 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Community Feed
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          {communityPosts.map((post, index) => (
            <div key={index} className="p-3 bg-background/30 rounded-lg border border-border/30">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-community text-community-foreground text-xs">
                    {post.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">{post.user}</span>
                    <Badge className="text-xs px-1 py-0">
                      {post.site}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {post.likes}
                    </span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="bg-card/30 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {topContributors.map((contributor, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors">
              <div className="w-8 h-8 bg-gradient-heritage rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{contributor.name}</p>
                <div className="flex items-center space-x-2">
                  <Badge className="text-xs px-1 py-0">
                    {contributor.badge}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{contributor.points} pts</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Share Your Experience */}
      <Card className="bg-gradient-scan/10 border-scan/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center text-scan">
            <Camera className="w-4 h-4 mr-2" />
            Share Your AR Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Button className="w-full bg-gradient-scan text-scan-foreground hover:shadow-glow">
            <Share2 className="w-4 h-4 mr-2" />
            Upload Experience
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunitySidebar;