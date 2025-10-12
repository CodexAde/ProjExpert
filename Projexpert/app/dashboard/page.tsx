"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Code,
  Smartphone,
  Database,
  Palette,
  BarChart3,
  Brain,
  ArrowRight,
  Clock,
  CheckCircle,
  Star,
  Upload,
  MessageSquare,
  Users,
  Target,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

const tracks = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Full-stack web development with modern frameworks",
    icon: Code,
    color: "bg-blue-500",
    progress: 90,
    projects: 12,
    duration: "8 weeks",
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    description: "iOS and Android app development",
    icon: Smartphone,
    color: "bg-green-500",
    progress: 82,
    projects: 10,
    duration: "10 weeks",
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Machine learning and data analysis",
    icon: BarChart3,
    color: "bg-purple-500",
    progress: 35,
    projects: 8,
    duration: "12 weeks",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "User interface and experience design",
    icon: Palette,
    color: "bg-pink-500",
    progress: 57,
    projects: 15,
    duration: "6 weeks",
  },
  {
    id: "devops",
    title: "DevOps Engineering",
    description: "Cloud infrastructure and deployment",
    icon: Database,
    color: "bg-orange-500",
    progress: 65,
    projects: 9,
    duration: "8 weeks",
  },
  {
    id: "ai-ml",
    title: "AI/ML Engineering",
    description: "Artificial intelligence and machine learning",
    icon: Brain,
    color: "bg-indigo-500",
    progress: 88,
    projects: 11,
    duration: "14 weeks",
  },
]

export default function DashboardPage() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)

  const handleTrackSelect = (trackId: string) => {
    setSelectedTrack(trackId)
    // Here you would typically navigate to the track-specific dashboard
    // For now, we'll just show a selection state
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">ProjExpert</span>
              </div>
              <Badge variant="secondary">Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/ai-manager">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  AI Manager
                </Button>
              </Link>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, BlackBug!</h1>
          <p className="text-muted-foreground text-lg">
            Ready to continue your virtual internship journey? Choose a track to get started.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Progress</p>
                  <p className="text-2xl font-bold">73%</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Projects Completed</p>
                  <p className="text-2xl font-bold">22</p>
                </div>
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Skills Earned</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Time Invested</p>
                  <p className="text-2xl font-bold">7h</p>
                </div>
                <Clock className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Track Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Choose Your Track</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => {
              const IconComponent = track.icon
              return (
                <Card
                  key={track.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTrack === track.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleTrackSelect(track.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 ${track.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline">{track.duration}</Badge>
                    </div>
                    <CardTitle className="text-xl">{track.title}</CardTitle>
                    <CardDescription>{track.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{track.progress}%</span>
                      </div>
                      <Progress value={track.progress} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{track.projects} projects</span>
                        <Button size="sm" variant={selectedTrack === track.id ? "default" : "outline"}>
                          {selectedTrack === track.id ? "Selected" : "Start Track"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-primary" />
                AI Task Manager
              </CardTitle>
              <CardDescription>Get personalized tasks and guidance from your AI manager</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/ai-manager">
                <Button className="w-full">
                  Meet Your AI Manager
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-accent" />
                File Upload & Review
              </CardTitle>
              <CardDescription>Upload your work for instant AI-powered feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/file-review">
                <Button variant="outline" className="w-full bg-transparent">
                  Upload Files
                  <Upload className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-primary" />
                Collaborative Workspace
              </CardTitle>
              <CardDescription>Work with other students on team projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/workspace">
                <Button variant="outline" className="w-full bg-transparent">
                  Open Workspace
                  <Users className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
