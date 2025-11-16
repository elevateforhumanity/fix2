'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import seeds from '@/seeds/elevate/elevate.json';
import { Copy, Check } from 'lucide-react';

export default function SocialMediaDashboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { platforms, viral_cta, hashtags } = seeds.social_media;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Social Media Content</h1>
        <p className="text-muted-foreground">
          Ready-to-use social media posts for all platforms
        </p>
      </div>
      <Tabs defaultValue="facebook" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
        </TabsList>
        <TabsContent value="facebook">
          <Card>
            <CardHeader>
              <CardTitle>Facebook Posts</CardTitle>
              <CardDescription>Long and short format posts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Long Post</h3>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                    {platforms.facebook.long_post}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(platforms.facebook.long_post, 'fb-long')
                    }
                  >
                    {copiedId === 'fb-long' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Short Post</h3>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                    {platforms.facebook.short_post}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(platforms.facebook.short_post, 'fb-short')
                    }
                  >
                    {copiedId === 'fb-short' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="instagram">
          <Card>
            <CardHeader>
              <CardTitle>Instagram Caption</CardTitle>
              <CardDescription>Optimized for Instagram posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                  {platforms.instagram.caption}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() =>
                    copyToClipboard(platforms.instagram.caption, 'ig')
                  }
                >
                  {copiedId === 'ig' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="twitter">
          <Card>
            <CardHeader>
              <CardTitle>Twitter/X Post</CardTitle>
              <CardDescription>Character-optimized for Twitter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                  {platforms.twitter.post}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(platforms.twitter.post, 'tw')}
                >
                  {copiedId === 'tw' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Viral Campaign: 100 Shares</CardTitle>
          <CardDescription>High-engagement call-to-action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
              {viral_cta.content}
            </pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(viral_cta.content, 'viral')}
            >
              {copiedId === 'viral' ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hashtags</CardTitle>
          <CardDescription>
            Use these hashtags for maximum reach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-primary/20"
                onClick={() => copyToClipboard(tag, tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
