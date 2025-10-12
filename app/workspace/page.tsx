"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  Code,
  GitBranch,
  MessageSquare,
  Calendar,
  Star,
  ArrowLeft,
  Plus,
  Eye,
  Share,
  Download,
  FileText,
  ImageIcon,
  ExternalLink,
  Award,
  TrendingUp,
  Target,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  status: "active" | "completed" | "review"
  progress: number
  dueDate: string
  team: TeamMember[]
  technologies: string[]
  lastActivity: string
  type: "individual" | "team"
}

interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
  status: "online" | "offline" | "away"
}

interface PortfolioItem {
  id: string
  title: string
  description: string
  type: "web" | "mobile" | "design" | "data"
  image: string
  technologies: string[]
  completedDate: string
  score: number
  liveUrl?: string
  githubUrl?: string
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Building a full-stack e-commerce platform with React and Node.js",
    status: "active",
    progress: 65,
    dueDate: "2024-02-15",
    team: [
      { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", role: "Frontend", status: "online" },
      { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32", role: "Backend", status: "away" },
      {
        id: "3",
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        role: "Designer",
        status: "offline",
      },
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    lastActivity: "2 hours ago",
    type: "team",
  },
  {
    id: "2",
    title: "Personal Portfolio Website",
    description: "Creating a responsive portfolio website to showcase my work",
    status: "completed",
    progress: 100,
    dueDate: "2024-01-20",
    team: [
      { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", role: "Developer", status: "online" },
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    lastActivity: "1 week ago",
    type: "individual",
  },
  {
    id: "3",
    title: "Mobile Task Manager",
    description: "Developing a cross-platform mobile app for task management",
    status: "review",
    progress: 90,
    dueDate: "2024-02-01",
    team: [
      { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32", role: "Developer", status: "online" },
      { id: "4", name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32", role: "UI/UX", status: "online" },
    ],
    technologies: ["React Native", "Firebase", "Redux"],
    lastActivity: "1 day ago",
    type: "team",
  },
]

const mockPortfolio: PortfolioItem[] = [
  {
    id: "1",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS",
    type: "web",
    image: "/modern-portfolio-website.png",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    completedDate: "2024-01-20",
    score: 92,
    liveUrl: "https://johndoe-portfolio.vercel.app",
    githubUrl: "https://github.com/johndoe/portfolio",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    type: "web",
    image: "/task-management-app.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    completedDate: "2024-01-15",
    score: 88,
    liveUrl: "https://taskmaster-app.vercel.app",
    githubUrl: "https://github.com/johndoe/taskmaster",
  },
  {
    id: "3",
    title: "Mobile Banking UI",
    description: "Modern mobile banking app interface design with smooth animations",
    type: "design",
    image: "/mobile-banking-app-design.jpg",
    technologies: ["Figma", "Principle", "Adobe XD"],
    completedDate: "2024-01-10",
    score: 95,
  },
]

export default function WorkspacePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(mockProjects[0])
  const [activeTab, setActiveTab] = useState("projects")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "review":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "web":
        return <Code className="w-4 h-4" />
      case "mobile":
        return <Users className="w-4 h-4" />
      case "design":
        return <ImageIcon className="w-4 h-4" />
      case "data":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">Workspace</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share Portfolio
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Active Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Projects</CardTitle>
                    <CardDescription>Manage your active and completed projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      <div className="space-y-4">
                        {mockProjects.map((project) => (
                          <Card
                            key={project.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedProject?.id === project.id ? "ring-2 ring-primary" : ""
                            }`}
                            onClick={() => setSelectedProject(project)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold text-sm">{project.title}</h4>
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-1" />
                              </div>
                              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {project.dueDate}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {project.type}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details */}
              <div className="lg:col-span-2 space-y-6">
                {selectedProject && (
                  <>
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{selectedProject.title}</CardTitle>
                            <CardDescription className="mt-2">{selectedProject.description}</CardDescription>
                          </div>
                          <Badge className={`${getStatusColor(selectedProject.status)} text-white`}>
                            {selectedProject.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Project Progress</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Completion</span>
                                <span className="font-medium">{selectedProject.progress}%</span>
                              </div>
                              <Progress value={selectedProject.progress} className="h-2" />
                            </div>
                            <div className="mt-4 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Due Date:</span>
                                <span>{selectedProject.dueDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Last Activity:</span>
                                <span>{selectedProject.lastActivity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Type:</span>
                                <span className="capitalize">{selectedProject.type}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Team Members</h4>
                            <div className="space-y-3">
                              {selectedProject.team.map((member) => (
                                <div key={member.id} className="flex items-center space-x-3">
                                  <div className="relative">
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                      <AvatarFallback>
                                        {member.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div
                                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusIcon(
                                        member.status,
                                      )}`}
                                    ></div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">{member.name}</div>
                                    <div className="text-xs text-muted-foreground">{member.role}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button className="flex-1">
                            <Code className="w-4 h-4 mr-2" />
                            Open in IDE
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <GitBranch className="w-4 h-4 mr-2" />
                            View Repository
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Team Chat
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Your Portfolio</h2>
                <p className="text-muted-foreground">Showcase your completed projects and achievements</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPortfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="mt-1">{item.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{item.score}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Completed: {item.completedDate}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(item.score / 20) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {item.liveUrl && (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Live
                        </Button>
                      )}
                      {item.githubUrl && (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Code className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Your Achievements</h2>
              <p className="text-muted-foreground">Track your progress and celebrate your milestones</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-2">91</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">5</div>
                  <div className="text-sm text-muted-foreground">Certificates Earned</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Full Stack Developer", date: "2024-01-20", type: "Certificate" },
                      { title: "React Specialist", date: "2024-01-15", type: "Badge" },
                      { title: "UI/UX Fundamentals", date: "2024-01-10", type: "Certificate" },
                      { title: "JavaScript Expert", date: "2024-01-05", type: "Badge" },
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-sm text-muted-foreground">{achievement.date}</div>
                        </div>
                        <Badge variant="outline">{achievement.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Progress</CardTitle>
                  <CardDescription>Track your skill development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { skill: "React", progress: 85 },
                      { skill: "Node.js", progress: 78 },
                      { skill: "TypeScript", progress: 72 },
                      { skill: "UI/UX Design", progress: 65 },
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{item.skill}</span>
                          <span className="font-medium">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
