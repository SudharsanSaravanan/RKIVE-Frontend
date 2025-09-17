"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/Dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sidebar } from "@/components/custom/Sidebar";

type Candidate = {
  id: number;
  name: string;
  email: string;
  experience: string;
  status?: string;
  score: number;
};

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
  candidates?: Candidate[];
};

const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [viewMoreOpen, setViewMoreOpen] = useState(false);
  const [viewCandidatesOpen, setViewCandidatesOpen] = useState(false);
  const [candidatesStep, setCandidatesStep] = useState("initial"); // 'initial', 'loading', 'results'
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const adminProfile = {
    name: "Emily Johnson",
    email: "johnson@pmscheme.gov.in",
    role: "Administrator",
    department: "Ministry of Corporate Affairs",
  };

  const [profileName, setProfileName] = useState(() => adminProfile.name);
  const [profileEmail, setProfileEmail] = useState(() => adminProfile.email);
  const [profileRole, setProfileRole] = useState(() => adminProfile.role);
  const [profileSaving, setProfileSaving] = useState(false);

  const joblists: Job[] = [
    {
      id: 1,
      title: "AI Research Intern",
      company: "Ministry of Electronics & IT",
      location: "New Delhi",
      description:
        "Join our AI research team to work on cutting-edge machine learning projects that will shape the future of government digital services.",
      requirements:
        "Bachelor's in Computer Science, Python programming, Machine Learning fundamentals",
      salary: "₹25,000/month",
      candidates: [
        {
          id: 1,
          name: "Rahul Sharma",
          email: "rahul@example.com",
          experience: "2 years",
          status: "Applied",
          score: 85,
        },
        {
          id: 2,
          name: "Priya Singh",
          email: "priya@example.com",
          experience: "1 year",
          status: "Reviewed",
          score: 92,
        },
        {
          id: 3,
          name: "Arjun Patel",
          email: "arjun@example.com",
          experience: "3 years",
          status: "Applied",
          score: 78,
        },
        {
          id: 4,
          name: "Sneha Kumar",
          email: "sneha@example.com",
          experience: "1.5 years",
          status: "Applied",
          score: 88,
        },
        {
          id: 5,
          name: "Vikash Das",
          email: "vikash@example.com",
          experience: "2.5 years",
          status: "Reviewed",
          score: 90,
        },
      ],
    },
  ];

  // Chart data
  const jobsOverTime = [
    { name: "Jan", jobs: 15 },
    { name: "Feb", jobs: 22 },
    { name: "Mar", jobs: 18 },
    { name: "Apr", jobs: 28 },
    { name: "May", jobs: 35 },
    { name: "Jun", jobs: 42 },
  ];

  const applicationsPerWeek = [
    { name: "Week 1", applications: 120 },
    { name: "Week 2", applications: 98 },
    { name: "Week 3", applications: 156 },
    { name: "Week 4", applications: 134 },
  ];

  const jobStatus: { name: string; value: number; color: string }[] = [
    { name: "Active", value: 65, color: "var(--blue-600)" },
    { name: "Closed", value: 35, color: "var(--text-secondary)" },
  ];

  const getTopCandidates = (candidates?: Candidate[] | null): Candidate[] => {
    if (!candidates || candidates.length === 0) return [];
    return [...candidates].sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const handleViewCandidates = (job: Job) => {
    setSelectedJob(job);
    setViewCandidatesOpen(true);
    setCandidatesStep("initial");
    setActiveTab("all");
  };

  const handleSubmitCandidates = () => {
    setCandidatesStep("loading");
    setTimeout(() => {
      setCandidatesStep("results");
    }, 2500);
  };

  const DashboardView = () => (
    <div className="space-y-8">
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar
                className="w-16 h-16"
                style={{ backgroundColor: "var(--blue-600)" }}
              >
                <AvatarFallback className="text-white text-xl font-semibold">
                  {adminProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-primary">
                  {adminProfile.name}
                </h3>
                <p className="text-secondary">{adminProfile.email}</p>
                <p className="text-sm text-secondary">
                  {adminProfile.role} • {adminProfile.department}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setEditProfileOpen(true)}
              className="btn-primary"
            >
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              New Jobs Posted Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={jobsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="jobs"
                  stroke="var(--blue-500)"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Candidate Applications per Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={applicationsPerWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--divider)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip />
                <Bar dataKey="applications" fill="var(--blue-500)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Active vs. Closed Job Listings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobStatus}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {jobStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const JobsView = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        {joblists.map((job) => (
          <Card
            key={job.id}
            className="border-0 shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold text-primary mb-2">
                    {job.title}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-secondary font-medium">{job.company}</p>
                    <p className="text-secondary">📍 {job.location}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedJob(job);
                      setViewMoreOpen(true);
                    }}
                  >
                    View More
                  </Button>
                  <Button
                    className="btn-primary"
                    onClick={() => handleViewCandidates(job)}
                  >
                    View Candidates
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-page">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {currentView === "dashboard" && "Dashboard"}
              {currentView === "companies" && "Companies"}
              {currentView === "jobs" && "Jobs"}
            </h1>
          </div>

          {currentView === "dashboard" && <DashboardView />}
          {currentView === "companies" && (
            <div></div>
          )}
          {currentView === "jobs" && <JobsView />}
        </div>
      </main>

      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 m-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProfileName(e.target.value)
                }
              />
            </div>
            <div className="space-y-2 m-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProfileEmail(e.target.value)
                }
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setEditProfileOpen(false)}
                className="border-divider"
                disabled={profileSaving}
              >
                Cancel
              </Button>
              <Button
                className="btn-primary"
                onClick={() => {
                  setProfileSaving(true);
                  const payload = {
                    name: profileName,
                    email: profileEmail,
                    role: profileRole,
                  };
                  console.log("Saving profile:", payload);
                  setTimeout(() => {
                    setProfileSaving(false);
                    setEditProfileOpen(false);
                  }, 1200);
                }}
                disabled={profileSaving}
              >
                {profileSaving ? (
                  <span className="inline-flex items-center space-x-2">
                    <span
                      className="animate-spin h-4 w-4 border-2 rounded-full"
                      style={{
                        borderTopColor: "var(--white-100)",
                        borderRightColor: "transparent",
                        borderBottomColor: "transparent",
                        borderLeftColor: "transparent",
                      }}
                    />
                    <span>Saving...</span>
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={viewMoreOpen} onOpenChange={setViewMoreOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedJob?.title}</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Company</h4>
                  <p className="text-secondary">{selectedJob.company}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Location</h4>
                  <p className="text-secondary">{selectedJob.location}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Salary</h4>
                  <p className="text-secondary">{selectedJob.salary}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">
                    Applications
                  </h4>
                  <p className="text-secondary">
                    {selectedJob.candidates?.length || 0} candidates
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Description</h4>
                <p className="text-secondary">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">
                  Requirements
                </h4>
                <p className="text-secondary">{selectedJob.requirements}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={viewCandidatesOpen} onOpenChange={setViewCandidatesOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Candidates for {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>

          {candidatesStep === "initial" && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Email
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Experience
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedJob?.candidates?.map((candidate) => (
                      <tr
                        key={candidate.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-3 font-medium text-gray-900">
                          {candidate.name}
                        </td>
                        <td className="p-3 text-gray-600">{candidate.email}</td>
                        <td className="p-3 text-gray-600">
                          {candidate.experience}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className="flex justify-end pt-4 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Button
                  className="btn-primary px-8"
                  onClick={handleSubmitCandidates}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}

          {candidatesStep === "loading" && (
            <div className="flex flex-col items-center justify-center py-16">
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
                style={{ borderBottomColor: "var(--color-info)" }}
              ></div>
              <p className="text-lg font-medium text-primary">
                Processing candidates...
              </p>
              <p className="text-secondary mt-2">
                Analyzing applications and generating scores
              </p>
            </div>
          )}

          {candidatesStep === "results" && (
            <div className="space-y-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "all"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    All Candidates
                  </button>
                  <button
                    onClick={() => setActiveTab("shortlisted")}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "shortlisted"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Shortlisted
                  </button>
                </nav>
              </div>

              {activeTab === "all" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      All Candidates with Scores
                    </h3>
                    <Button
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-green-100"
                    >
                      Download Report
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 font-semibold text-gray-900">
                            Name
                          </th>
                          <th className="text-left p-3 font-semibold text-gray-900">
                            Email
                          </th>
                          <th className="text-left p-3 font-semibold text-gray-900">
                            Experience
                          </th>
                          <th className="text-left p-3 font-semibold text-gray-900">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedJob?.candidates?.map((candidate) => (
                          <tr
                            key={candidate.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="p-3 font-medium text-gray-900">
                              {candidate.name}
                            </td>
                            <td className="p-3 text-gray-600">
                              {candidate.email}
                            </td>
                            <td className="p-3 text-gray-600">
                              {candidate.experience}
                            </td>
                            <td className="p-3">
                              <div
                                className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${
                                  candidate.score >= 90
                                    ? "bg-green-100 text-green-800"
                                    : candidate.score >= 80
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {candidate.score}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "shortlisted" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      Shortlisted Candidates
                    </h3>
                    <Button
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-green-100"
                    >
                      Download Shortlist
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 font-semibold text-gray-900">
                            Name
                          </th>
                          <th className="text-left p-3 font-semibold text-gray-900">
                            Email
                          </th>
                          <th className="text-left p-3 font-semibold text-gray-900">
                            Experience
                          </th>
                          <th className="text-left p-3 font-semibold text-gray-900">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getTopCandidates(selectedJob?.candidates || []).map(
                          (candidate, index) => (
                            <tr
                              key={candidate.id}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="p-3 font-medium text-gray-900">
                                {candidate.name}
                              </td>
                              <td className="p-3 text-gray-600">
                                {candidate.email}
                              </td>
                              <td className="p-3 text-gray-600">
                                {candidate.experience}
                              </td>
                              <td className="p-3">
                                <div
                                  className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${
                                    candidate.score >= 90
                                      ? "bg-green-100 text-green-800"
                                      : candidate.score >= 80
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {candidate.score}
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
