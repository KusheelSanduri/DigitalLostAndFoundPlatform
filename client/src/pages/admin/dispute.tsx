"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Checkbox } from "../../components/ui/checkbox"
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
  Flag,
  MessageSquare,
  Calendar,
  User,
  ArrowLeft,
} from "lucide-react"
import {Link} from "react-router-dom"

import { disputeApi } from "../../api/disputeApi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"


export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDispute, setSelectedDispute] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    disputeApi.getAll()
      .then(res => setDisputes(res.data))
      .finally(() => setLoading(false))
  }, [])

  const filteredDisputes = disputes.filter((dispute) => {
    const matchesSearch =
      (dispute.postTitle?.toLowerCase().includes(searchQuery.toLowerCase()) || "") ||
      (dispute._id?.toLowerCase().includes(searchQuery.toLowerCase()) || "") ||
      (dispute.reason?.toLowerCase().includes(searchQuery.toLowerCase()) || "")
    const matchesStatus = statusFilter === "all" || dispute.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      resolved: { variant: "outline" as const, label: "Resolved", className: "bg-green-100 text-green-700 border-green-400" },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  // const getPriorityBadge = (priority: string) => {}

  const handleStatusChange = async (disputeId: string, checked: boolean) => {
    const newStatus = checked ? "resolved" : "pending"
    try {
      await disputeApi.updateStatus(disputeId, newStatus)
      setDisputes((prev: any) =>
        prev.map((dispute: any) =>
          (dispute._id === disputeId || dispute.id === disputeId)
            ? { ...dispute, status: newStatus, resolvedAt: checked ? new Date().toISOString() : undefined }
            : dispute
        )
      )
    } catch (e) {
      // handle error
    }
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
    resolved: disputes.filter((d) => d.status === "resolved").length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Admin Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
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
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
          {/* Under Review card removed */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Resolved</span>
              </div>
              <p className="text-2xl font-bold mt-1 text-green-600">{stats.resolved}</p>
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
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Disputes List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading disputes...</div>
          ) : filteredDisputes.map((dispute) => (
            <Card key={dispute._id || dispute.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{dispute._id || dispute.id}</h3>
                      <Badge {...getStatusBadge(dispute.status)} className={dispute.status === "resolved" ? "bg-green-100 text-green-700 border-green-400" : ""}>{getStatusBadge(dispute.status).label}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-1">
                      <strong>Post:</strong> {dispute.postTitle || dispute.itemId?.title} ({dispute.postType})
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
                            Dispute Details - {dispute._id || dispute.id}
                          </DialogTitle>
                          <DialogDescription>Review and manage this dispute report</DialogDescription>
                        </DialogHeader>

                        {selectedDispute && (
                          <div className="space-y-6">
                            {/* Status */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Status:</span>
                                <Badge {...getStatusBadge(selectedDispute.status)} className={selectedDispute.status === "resolved" ? "bg-green-100 text-green-700 border-green-400" : ""}>
                                  {getStatusBadge(selectedDispute.status).label}
                                </Badge>
                              </div>
                            </div>

                            {/* Post Information */}
                            <div className="bg-muted/50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Related Post</h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <strong>Title:</strong> {selectedDispute.postTitle || selectedDispute.itemId?.title}
                                </p>
                                <p>
                                  <strong>Type:</strong> {selectedDispute.postType}
                                </p>
                                <p>
                                  <strong>Category:</strong> {selectedDispute.category}
                                </p>
                                <p>
                                  <strong>Post ID:</strong> {selectedDispute.postId || selectedDispute.itemId?._id}
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
                    <Checkbox
                      checked={dispute.status === "resolved"}
                      onCheckedChange={(checked) => handleStatusChange(dispute._id || dispute.id, !!checked)}
                      aria-label={dispute.status === "resolved" ? "Resolved" : "Pending"}
                    />
                    <span>{dispute.status === "resolved" ? "Resolved" : "Pending"}</span>
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
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search criteria or filters."
                : "No disputes have been reported yet."}
            </p>
            {(searchQuery || statusFilter !== "all") && (
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
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
