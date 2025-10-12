"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  ArrowLeft,
  Send,
  Calendar,
  Target,
  Lightbulb,
  TrendingUp,
  Code,
} from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed"
  dueDate: string
  estimatedTime: string
  skills: string[]
  difficulty: number
}

interface Message {
  id: string
  sender: "ai" | "user"
  content: string
  timestamp: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Build a Responsive Landing Page",
    description:
      "Create a modern, responsive landing page for a fictional startup. Focus on clean design, mobile optimization, and user experience.",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-15",
    estimatedTime: "8-12 hours",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    difficulty: 3,
  },
  {
    id: "2",
    title: "Implement User Authentication",
    description:
      "Add secure user authentication to your web application using modern authentication patterns and best practices.",
    priority: "medium",
    status: "pending",
    dueDate: "2024-01-20",
    estimatedTime: "6-10 hours",
    skills: ["JavaScript", "Security", "Backend Development"],
    difficulty: 4,
  },
  {
    id: "3",
    title: "Database Design & Implementation",
    description:
      "Design and implement a relational database schema for an e-commerce application with proper relationships and constraints.",
    priority: "medium",
    status: "pending",
    dueDate: "2024-01-25",
    estimatedTime: "10-15 hours",
    skills: ["SQL", "Database Design", "Data Modeling"],
    difficulty: 4,
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "ai",
    content:
      "Hello! I'm Alex, your AI Manager. I'm here to guide you through your virtual internship journey. I've analyzed your profile and prepared some exciting tasks for you. Ready to start building your portfolio?",
    timestamp: "10:00 AM",
  },
  {
    id: "2",
    sender: "ai",
    content:
      "I've assigned you three initial tasks based on your Web Development track. Let's start with the responsive landing page - it's a great foundation project that will showcase your front-end skills.",
    timestamp: "10:01 AM",
  },
]

export default function AIManagerPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content:
          "Great question! I'll help you with that. Based on your current progress, I recommend focusing on the fundamentals first. Would you like me to break down the task into smaller, manageable steps?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1500)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-gray-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
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
                <Brain className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">AI Manager</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Active Session
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/ai-robot-assistant.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Alex - Your AI Manager</CardTitle>
                    <CardDescription>Here to guide your learning journey</CardDescription>
                  </div>
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                            }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground/70"
                              }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex space-x-2 mt-4">
                  <Textarea
                    placeholder="Ask your AI manager anything..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[60px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} size="sm" className="self-end">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Assignment Panel */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-xs text-muted-foreground">Tasks Assigned</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">0</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assigned Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Assigned Tasks
                </CardTitle>
                <CardDescription>Tasks curated by your AI manager</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {mockTasks.map((task) => (
                      <Card
                        key={task.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${selectedTask?.id === task.id ? "ring-2 ring-primary" : ""
                          }`}
                        onClick={() => setSelectedTask(task)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">{task.title}</h4>
                            {getStatusIcon(task.status)}
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                              <span className="text-xs capitalize">{task.priority}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < task.difficulty ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {task.dueDate}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {task.estimatedTime}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {task.skills.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{task.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-accent" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Request New Task
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Review
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Target className="w-4 h-4 mr-2" />
                  Set Learning Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Task Detail Modal/Panel */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedTask.title}</CardTitle>
                    <CardDescription className="mt-2">{selectedTask.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTask(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Task Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <Badge variant="outline" className={`${getPriorityColor(selectedTask.priority)} text-white`}>
                          {selectedTask.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span>{selectedTask.dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated Time:</span>
                        <span>{selectedTask.estimatedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difficulty:</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < selectedTask.difficulty ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills You'll Learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link href="/ide" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full"> <Code className="w-4 h-4 mr-2" />Open IDE</Button>
                  </Link>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Ask AI for Help
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
