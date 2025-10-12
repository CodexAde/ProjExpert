"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  Code,
  ImageIcon,
  File,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Download,
  Eye,
  Trash2,
  Brain,
  Star,
  Clock,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  status: "analyzing" | "reviewed" | "pending"
  score?: number
  feedback?: {
    overall: string
    strengths: string[]
    improvements: string[]
    suggestions: string[]
  }
}

interface ReviewResult {
  score: number
  category: string
  feedback: string
  type: "success" | "warning" | "info"
}

const mockFiles: UploadedFile[] = [
  {
    id: "1",
    name: "landing-page.html",
    type: "text/html",
    size: 15420,
    uploadDate: "2024-01-10",
    status: "reviewed",
    score: 85,
    feedback: {
      overall:
        "Great work on the landing page! Your HTML structure is semantic and well-organized. The responsive design implementation is solid, and you've followed modern best practices.",
      strengths: [
        "Semantic HTML structure with proper heading hierarchy",
        "Clean and organized CSS with good use of flexbox",
        "Responsive design that works well on mobile devices",
        "Good accessibility practices with alt text and ARIA labels",
      ],
      improvements: [
        "Consider optimizing images for better performance",
        "Add more interactive elements to improve user engagement",
        "Implement lazy loading for images below the fold",
      ],
      suggestions: [
        "Try using CSS Grid for more complex layouts",
        "Consider adding animations for better user experience",
        "Implement a dark mode toggle for modern appeal",
      ],
    },
  },
  {
    id: "2",
    name: "user-auth.js",
    type: "application/javascript",
    size: 8750,
    uploadDate: "2024-01-12",
    status: "reviewed",
    score: 78,
    feedback: {
      overall:
        "Your authentication implementation shows good understanding of security principles. The code is readable and follows JavaScript best practices.",
      strengths: [
        "Proper password hashing implementation",
        "Good error handling throughout the code",
        "Clean function structure and naming conventions",
      ],
      improvements: [
        "Add input validation for edge cases",
        "Implement rate limiting for login attempts",
        "Consider using JWT tokens for session management",
      ],
      suggestions: [
        "Add two-factor authentication support",
        "Implement password strength requirements",
        "Consider using OAuth for social login options",
      ],
    },
  },
  {
    id: "3",
    name: "database-schema.sql",
    type: "application/sql",
    size: 3200,
    uploadDate: "2024-01-14",
    status: "analyzing",
  },
]

const reviewResults: ReviewResult[] = [
  { score: 85, category: "Code Quality", feedback: "Well-structured and readable code", type: "success" },
  { score: 78, category: "Performance", feedback: "Good performance with room for optimization", type: "info" },
  { score: 92, category: "Security", feedback: "Excellent security practices implemented", type: "success" },
  { score: 65, category: "Accessibility", feedback: "Basic accessibility, needs improvement", type: "warning" },
]

export default function FileReviewPage() {
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles)
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "analyzing" as const,
    }))

    setFiles((prev) => [...prev, ...newFiles])
    simulateUpload()
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <ImageIcon className="w-5 h-5" />
    if (type.includes("javascript") || type.includes("typescript")) return <Code className="w-5 h-5" />
    if (type.includes("html") || type.includes("css")) return <FileText className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reviewed":
        return "text-green-500"
      case "analyzing":
        return "text-yellow-500"
      case "pending":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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
            </div>
            <Badge variant="secondary" className="bg-accent/10 text-accent">
              AI-Powered Analysis
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area & File List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Work</CardTitle>
                <CardDescription>
                  Upload your code, designs, or documents for instant AI-powered feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
                  <p className="text-muted-foreground mb-4">Supports HTML, CSS, JavaScript, Python, images, and more</p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                  <label htmlFor="file-upload">
                    <Button className="cursor-pointer">Choose Files</Button>
                  </label>
                </div>

                {isUploading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Files</CardTitle>
                <CardDescription>Manage and review your uploaded files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedFile?.id === file.id ? "bg-primary/5 border-primary" : ""
                      }`}
                      onClick={() => setSelectedFile(file)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-muted-foreground">{getFileIcon(file.type)}</div>
                        <div>
                          <h4 className="font-medium">{file.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)} • {file.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {file.score && <div className={`font-bold ${getScoreColor(file.score)}`}>{file.score}/100</div>}
                        <Badge variant="outline" className={`${getStatusColor(file.status)} border-current`}>
                          {file.status === "analyzing" && <Clock className="w-3 h-3 mr-1" />}
                          {file.status === "reviewed" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {file.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Panel */}
          <div className="space-y-6">
            {/* AI Analysis Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary" />
                  AI Analysis
                </CardTitle>
                <CardDescription>Instant feedback on your work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {result.type === "success" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {result.type === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                        {result.type === "info" && <Info className="w-4 h-4 text-blue-500" />}
                        <span className="text-sm">{result.category}</span>
                      </div>
                      <div className={`font-bold ${getScoreColor(result.score)}`}>{result.score}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            {selectedFile && selectedFile.feedback && (
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Feedback</CardTitle>
                  <CardDescription>{selectedFile.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="strengths">Strengths</TabsTrigger>
                      <TabsTrigger value="improvements">Improve</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Overall Score</span>
                        <div className="flex items-center space-x-2">
                          <div className={`text-2xl font-bold ${getScoreColor(selectedFile.score!)}`}>
                            {selectedFile.score}
                          </div>
                          <div className="text-sm text-muted-foreground">/100</div>
                        </div>
                      </div>
                      <Progress value={selectedFile.score} className="h-2" />
                      <p className="text-sm text-muted-foreground">{selectedFile.feedback.overall}</p>
                    </TabsContent>

                    <TabsContent value="strengths" className="space-y-3">
                      {selectedFile.feedback.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{strength}</p>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="improvements" className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Areas for Improvement</h4>
                        {selectedFile.feedback.improvements.map((improvement, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{improvement}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Suggestions</h4>
                        {selectedFile.feedback.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Zap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Brain className="w-4 h-4 mr-2" />
                  Request Detailed Review
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Star className="w-4 h-4 mr-2" />
                  Compare with Best Practices
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Version
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
