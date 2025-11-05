"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import {
  Search,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Flag,
  MessageSquare,
  Calendar,
  User,
  Shield,
  ArrowLeft,
} from "lucide-react"
import {Link} from "react-router-dom"

// Mock dispute data
const mockDisputes = [
  {
    id: "DSP-001",
    postId: "1",
    postTitle: "Lost iPhone 14 Pro",
    reportedBy: "Anonymous User",
    reportedAt: "2024-01-16T14:30:00Z",
    reason: "Fraudulent claim",
    description:
      "This person is claiming to have found my phone but is asking for money before returning it. This seems like a scam.",
    evidence: "Screenshots of conversation",
    status: "pending",
    priority: "high",
    assignedTo: "Admin Team",
    chatMessages: 12,
    postType: "lost",
    category: "Electronics",
  },
  {
    id: "DSP-002",
    postId: "3",
    postTitle: "Found Water Bottle",
    reportedBy: "Anonymous User",
    reportedAt: "2024-01-16T11:15:00Z",
    reason: "Inappropriate behavior",
    description: "The person is being rude and using inappropriate language in the chat.",
    evidence: "Chat logs available",
    status: "under_review",
    priority: "medium",
    assignedTo: "Moderator 1",
    chatMessages: 8,
    postType: "found",
    category: "Personal Items",
  },
  {
    id: "DSP-003",
    postId: "5",
    postTitle: "Lost Textbook",
    reportedBy: "Anonymous User",
    reportedAt: "2024-01-15T16:45:00Z",
    reason: "Spam or fake post",
    description:
      "This post appears to be fake. The description doesn't match the image and seems to be copied from another website.",
    evidence: "Reverse image search results",
    status: "resolved",
    priority: "low",
    assignedTo: "Moderator 2",
    chatMessages: 3,
    postType: "lost",
    category: "Books",
    resolution: "Post removed and user warned",
    resolvedAt: "2024-01-16T09:30:00Z",
  },
  {
    id: "DSP-004",
    postId: "2",
    postTitle: "Found Wallet",
    reportedBy: "Anonymous User",
    reportedAt: "2024-01-15T13:20:00Z",
    reason: "Scam attempt",
    description: "User is asking for personal information before returning the wallet, which seems suspicious.",
    evidence: "Chat conversation screenshots",
    status: "escalated",
    priority: "high",
    assignedTo: "Senior Admin",
    chatMessages: 15,
    postType: "found",
    category: "Personal Items",
  },
]

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(mockDisputes)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedDispute, setSelectedDispute] = useState<(typeof mockDisputes)[0] | null>(null)

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      dispute.postTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.reason.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || dispute.status === statusFilter
    const matchesPriority = priorityFilter === "all" || dispute.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      under_review: { variant: "default" as const, label: "Under Review" },
      resolved: { variant: "outline" as const, label: "Resolved" },
      escalated: { variant: "destructive" as const, label: "Escalated" },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { variant: "outline" as const, label: "Low", color: "text-green-600" },
      medium: { variant: "secondary" as const, label: "Medium", color: "text-yellow-600" },
      high: { variant: "destructive" as const, label: "High", color: "text-red-600" },
    }
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium
  }

  const handleStatusChange = (disputeId: string, newStatus: string) => {
    setDisputes((prev:any) =>
      prev.map((dispute: any) =>
        dispute.id === disputeId
          ? {
              ...dispute,
              status: newStatus,
              resolvedAt: newStatus === "resolved" ? new Date().toISOString() : undefined,
            }
          : dispute,
      ),
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const stats = {
    total: disputes.length,
    pending: disputes.filter((d) => d.status === "pending").length,
    underReview: disputes.filter((d) => d.status === "under_review").length,
    resolved: disputes.filter((d) => d.status === "resolved").length,
    highPriority: disputes.filter((d) => d.priority === "high").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Admin Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold">Dispute Management</h1>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">NITC Lost & Found</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Disputes</span>
              </div>
              <p className="text-2xl font-bold mt-1">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-yellow-600">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Under Review</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-blue-600">{stats.underReview}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Resolved</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-green-600">{stats.resolved}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium">High Priority</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-red-600">{stats.highPriority}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search disputes by ID, post title, or reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] bg-background">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px] bg-background">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {filteredDisputes.map((dispute) => (
            <Card key={dispute.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{dispute.id}</h3>
                      <Badge {...getStatusBadge(dispute.status)}>{getStatusBadge(dispute.status).label}</Badge>
                      <Badge {...getPriorityBadge(dispute.priority)}>{getPriorityBadge(dispute.priority).label}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-1">
                      <strong>Post:</strong> {dispute.postTitle} ({dispute.postType})
                    </p>
                    <p className="text-muted-foreground mb-1">
                      <strong>Reason:</strong> {dispute.reason}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{dispute.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedDispute(dispute)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Flag className="w-5 h-5" />
                            Dispute Details - {dispute.id}
                          </DialogTitle>
                          <DialogDescription>Review and manage this dispute report</DialogDescription>
                        </DialogHeader>

                        {selectedDispute && (
                          <div className="space-y-6">
                            {/* Status and Priority */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Status:</span>
                                <Badge {...getStatusBadge(selectedDispute.status)}>
                                  {getStatusBadge(selectedDispute.status).label}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Priority:</span>
                                <Badge {...getPriorityBadge(selectedDispute.priority)}>
                                  {getPriorityBadge(selectedDispute.priority).label}
                                </Badge>
                              </div>
                            </div>

                            {/* Post Information */}
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Related Post</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <strong>Title:</strong> {selectedDispute.postTitle}
                                </p>
                                <p>
                                  <strong>Type:</strong> {selectedDispute.postType}
                                </p>
                                <p>
                                  <strong>Category:</strong> {selectedDispute.category}
                                </p>
                                <p>
                                  <strong>Post ID:</strong> {selectedDispute.postId}
                                </p>
                              </div>
                            </div>

                            {/* Dispute Details */}
                            <div>
                              <h4 className="font-medium mb-2">Dispute Information</h4>
                              <div className="space-y-3">
                                <div>
                                  <span className="text-sm font-medium">Reason:</span>
                                  <p className="text-sm mt-1">{selectedDispute.reason}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Description:</span>
                                  <p className="text-sm mt-1">{selectedDispute.description}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium">Evidence:</span>
                                  <p className="text-sm mt-1">{selectedDispute.evidence}</p>
                                </div>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div>
                              <h4 className="font-medium mb-2">Timeline</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>Reported: {formatDate(selectedDispute.reportedAt)}</span>
                                </div>
                                {selectedDispute.resolvedAt && (
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span>Resolved: {formatDate(selectedDispute.resolvedAt)}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  <span>Assigned to: {selectedDispute.assignedTo}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="w-4 h-4" />
                                  <span>Chat messages: {selectedDispute.chatMessages}</span>
                                </div>
                              </div>
                            </div>

                            {selectedDispute.resolution && (
                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-2 text-green-800">Resolution</h4>
                                <p className="text-sm text-green-700">{selectedDispute.resolution}</p>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t">
                              <Select
                                value={selectedDispute.status}
                                onValueChange={(value) => handleStatusChange(selectedDispute.id, value)}
                              >
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="under_review">Under Review</SelectItem>
                                  <SelectItem value="resolved">Resolved</SelectItem>
                                  <SelectItem value="escalated">Escalated</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button variant="outline" size="sm">
                                View Chat
                              </Button>
                              <Button variant="outline" size="sm">
                                View Post
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(dispute.reportedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {dispute.assignedTo}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {dispute.chatMessages} messages
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={dispute.status} onValueChange={(value) => handleStatusChange(dispute.id, value)}>
                      <SelectTrigger className="w-[130px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDisputes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No disputes found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your search criteria or filters."
                : "No disputes have been reported yet."}
            </p>
            {(searchQuery || statusFilter !== "all" || priorityFilter !== "all") && (
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
                  setPriorityFilter("all")
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
