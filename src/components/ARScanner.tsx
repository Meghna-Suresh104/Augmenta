import { Camera, Scan, QrCode, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ARScanner = () => {
  return (
    <Card className="bg-gradient-scan/10 border-scan/30 shadow-elevated">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-scan rounded-full flex items-center justify-center mb-4 shadow-glow">
          <Camera className="w-8 h-8 text-scan-foreground" />
        </div>
        <CardTitle className="text-scan">AR Heritage Scanner</CardTitle>
        <p className="text-sm text-muted-foreground">
          Point your camera at any heritage site to unlock immersive AR experiences
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Scan Button */}
        <Button 
          className="w-full bg-gradient-scan hover:shadow-glow transition-all duration-300 text-scan-foreground"
        >
          <Scan className="w-5 h-5 mr-2" />
          Start AR Scan
        </Button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="border-scan/30 hover:bg-scan/10">
            <QrCode className="w-4 h-4 mr-2" />
            QR Code
          </Button>
          <Button className="border-scan/30 hover:bg-scan/10">
            <Zap className="w-4 h-4 mr-2" />
            Quick Scan
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-background/50 rounded-lg p-3 text-sm">
          <h4 className="font-medium mb-2 text-scan">How to use:</h4>
          <ol className="space-y-1 text-muted-foreground">
            <li>1. Point your camera at a heritage site</li>
            <li>2. Wait for the AR overlay to appear</li>
            <li>3. Explore interactive 3D content</li>
            <li>4. Share your experience with the community</li>
          </ol>
        </div>

        {/* Recent Scans */}
        <div>
          <h4 className="font-medium mb-2 text-sm">Recent Scans</h4>
          <div className="space-y-2">
            {['Taj Mahal', 'Red Fort', 'Qutub Minar'].map((site, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-background/30 rounded">
                <span className="text-sm">{site}</span>
                <Button className="h-6 px-2 text-xs bg-transparent hover:bg-muted-foreground/10">
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ARScanner;