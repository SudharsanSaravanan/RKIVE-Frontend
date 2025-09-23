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
import { 
  Users, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Eye,
  Download,
  MapPin,
  Building,
  DollarSign,
  Calendar,
  Star
} from "lucide-react";

type Candidate = {
  // existing fields used across UI
  id: number; // numeric id for rendering/sorting
  name: string;
  email: string; // not in CSV -> set to "nil"
  experience: string; // not in CSV -> set to "nil"
  status?: string;
  score: number; // not in CSV -> default to 0

  // added fields from candidates.csv
  candidateId: string; // e.g., C001
  dateOfBirth: string; // e.g., 06-01-2003
  gender: string;
  category: string;
  tenthScore: string | number;
  twelfthScore: string | number;
  undergraduateScore: string | number;
  postgraduateScore?: string | number | null;
  skills: string[];
  certifications: string[];
  stream: string;
  ugCourse: string;
  pgCourse?: string | null;
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

// Stats Card Component
const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType 
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change?: string;
  changeType?: 'positive' | 'negative';
}) => (
  <Card className="group relative overflow-hidden border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              <span className={`text-sm font-medium ${
                changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {change}
              </span>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-300" />
          <Icon className="relative w-8 h-8 text-blue-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Job Card Component
const JobCard = ({ 
  job, 
  onViewMore, 
  onViewCandidates 
}: {
  job: Job;
  onViewMore: () => void;
  onViewCandidates: () => void;
}) => (
  <Card className="group border-0 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium text-emerald-600">{job.salary}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="w-4 h-4" />
              <span className="font-medium">{job.candidates?.length || 0}</span>
              <span>applications</span>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onViewMore}
                className="border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
              <Button
                size="sm"
                onClick={onViewCandidates}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <Users className="w-4 h-4 mr-1" />
                View Candidates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Loading Component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-16 space-y-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-slate-200"></div>
      <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
    </div>
    <div className="text-center space-y-1">
      <p className="text-lg font-semibold text-slate-900">Processing candidates...</p>
      <p className="text-sm text-slate-600">Analyzing applications and generating scores</p>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [viewMoreOpen, setViewMoreOpen] = useState(false);
  const [viewCandidatesOpen, setViewCandidatesOpen] = useState(false);
  const [candidatesStep, setCandidatesStep] = useState("initial");
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
      title: "Senior Software Engineer",
      company: "Innovate Solutions Inc.",
      location: "Remote",
      description:
        "Innovate Solutions Inc. is seeking a highly skilled and experienced Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining complex software systems.",
      requirements:
        [
          "Responsibilities: Lead the design and implementation of new features and services; Collaborate with product managers and other engineers to define requirements and specifications; Write clean, maintainable, and efficient code; Perform code reviews and mentor junior engineers; Troubleshoot and debug production issues; Contribute to the improvement of our development processes and tools.",
          "Qualifications: Bachelor's or Master's degree in Computer Science or a related field; 8+ years of experience in software development; Proficiency in Python, Java, or C++; Experience with cloud platforms (AWS, Azure, GCP); Strong understanding of data structures and algorithms; Excellent communication and problem-solving skills.",
          "Preferred Qualifications: Experience with microservices architecture; Familiarity with Agile development methodologies; Contributions to open-source projects; Certifications in cloud computing (e.g., AWS Certified Solutions Architect); Knowledge of additional languages like Spanish or French."
        ].join(" \n\n"),
      salary: "nil",
      candidates: [
        // C001 - Shrikant Chandra
        {
          id: 1,
          candidateId: "C001",
          name: "Shrikant Chandra",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "06-01-2003",
          gender: "Female",
          category: "ST",
          tenthScore: "44.37",
          twelfthScore: "nil",
          undergraduateScore: "nil",
          postgraduateScore: "nil",
          skills: ["Open Source", "Leadership", "Teamwork", "Spanish"],
          certifications: [
            "Certificate in Public Health",
            "Nursing Assistant Certificate",
          ],
          stream: "nil",
          ugCourse: "nil",
          pgCourse: "nil",
        },
        // C038 - Drupad Ketkar
        {
          id: 2,
          candidateId: "C038",
          name: "Drupad Ketkar",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "07-05-2004",
          gender: "Male",
          category: "GEN/UR",
          tenthScore: "52.81",
          twelfthScore: "nil",
          undergraduateScore: "nil",
          postgraduateScore: "nil",
          skills: [
            "Azure",
            "Java",
            "Mentoring",
            "Open Source",
            "Leadership",
          ],
          certifications: [],
          stream: "nil",
          ugCourse: "nil",
          pgCourse: "nil",
        },
        // C111 - Kedar Chopra
        {
          id: 3,
          candidateId: "C111",
          name: "Kedar Chopra",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "26-04-2002",
          gender: "Female",
          category: "SC",
          tenthScore: "67.99",
          twelfthScore: "62.83",
          undergraduateScore: "nil",
          postgraduateScore: "nil",
          skills: [
            "Python",
            "Teamwork",
            "MS Excel",
            "Critical Thinking",
            "Debugging",
            "Java",
          ],
          certifications: ["Basic Life Support (BLS)"],
          stream: "Arts (Commerce)",
          ugCourse: "nil",
          pgCourse: "nil",
        },
        // C022 - Govardhan Keshari
        {
          id: 4,
          candidateId: "C022",
          name: "Govardhan Keshari",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "21-05-2003",
          gender: "Male",
          category: "GEN/UR",
          tenthScore: "57.63",
          twelfthScore: "43.63",
          undergraduateScore: "nil",
          postgraduateScore: "nil",
          skills: [
            "Spanish",
            "C++",
            "Azure",
            "Data Analysis",
            "Communication",
            "Critical Thinking",
            "Leadership",
          ],
          certifications: ["Nursing Assistant Certificate"],
          stream: "Science (Bio+Math)",
          ugCourse: "nil",
          pgCourse: "nil",
        },
        // C789 - Sanskriti Vyas
        {
          id: 5,
          candidateId: "C789",
          name: "Sanskriti Vyas",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "21-06-2003",
          gender: "Male",
          category: "SC",
          tenthScore: "38.84",
          twelfthScore: "36.2",
          undergraduateScore: "5.53",
          postgraduateScore: "6.31",
          skills: [
            "GST Practitioner Certificate",
            "Accounting",
            "Business Communication",
            "Excel",
          ],
          certifications: ["Diploma in Nutrition & Dietetics"],
          stream: "Arts (Commerce)",
          ugCourse: "BFIA",
          pgCourse: "M.Com",
        },
        // C999 - Rampyare Govil
        {
          id: 6,
          candidateId: "C999",
          name: "Rampyare Govil",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "22-08-2004",
          gender: "Male",
          category: "OBC",
          tenthScore: "88.14",
          twelfthScore: "51.07",
          undergraduateScore: "8.36",
          postgraduateScore: "4.71",
          skills: [
            "Tally ERP",
            "Accounting",
            "Finance",
            "GST Practitioner Certificate",
            "MS Excel",
            "Excel",
            "Business Communication",
          ],
          certifications: ["Basic Life Support (BLS)"],
          stream: "Arts (Commerce)",
          ugCourse: "BBI",
          pgCourse: "MBA",
        },
        // C931 - Lata Dutt
        {
          id: 7,
          candidateId: "C931",
          name: "Lata Dutt",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "29-02-2004",
          gender: "Female",
          category: "ST",
          tenthScore: "42.78",
          twelfthScore: "97.59",
          undergraduateScore: "9.33",
          postgraduateScore: "6.98",
          skills: [
            "Agile",
            "Data Analysis",
            "MS Excel",
            "Python",
            "Communication",
          ],
          certifications: [
            "Nursing Assistant Certificate",
            "Excel Advanced",
            "Medical Lab Technician Certificate",
          ],
          stream: "Science (CS+Math)",
          ugCourse: "BCA",
          pgCourse: "M.Sc. Computer Science",
        },
        // C004 - Khushboo Priyadarshini
        {
          id: 8,
          candidateId: "C004",
          name: "Khushboo Priyadarshini",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "19-11-2003",
          gender: "Male",
          category: "ST",
          tenthScore: "32.17",
          twelfthScore: "47.75",
          undergraduateScore: "5.31",
          postgraduateScore: "8.11",
          skills: [
            "Debugging",
            "Agile",
            "Data Analysis",
            "Communication",
            "Leadership",
            "MS Excel",
            "Python",
          ],
          certifications: ["GST Practitioner Certificate"],
          stream: "Science (CS+Math)",
          ugCourse: "BCA",
          pgCourse: "M.Sc. Data Science",
        },
        // C054 - Sulekha Dave
        {
          id: 9,
          candidateId: "C054",
          name: "Sulekha Dave",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "05-02-2003",
          gender: "Male",
          category: "ST",
          tenthScore: "72.94",
          twelfthScore: "87.45",
          undergraduateScore: "8.23",
          postgraduateScore: "6.83",
          skills: ["Java", "SQL", "Debugging", "Agile"],
          certifications: [
            "AWS Certified Solutions Architect",
            "Tally",
          ],
          stream: "Science (CS+Math)",
          ugCourse: "B.Sc. Data Science",
          pgCourse: "M.Sc. Computer Science",
        },
        // C026 - Awantika Banerjee
        {
          id: 10,
          candidateId: "C026",
          name: "Awantika Banerjee",
          email: "nil",
          experience: "nil",
          status: "nil",
          score: 0,
          dateOfBirth: "04-10-2001",
          gender: "Male",
          category: "GEN/UR",
          tenthScore: "35.24",
          twelfthScore: "81.94",
          undergraduateScore: "5.76",
          postgraduateScore: "7.15",
          skills: [
            "Python",
            "Java",
            "C++",
            "AWS",
            "Azure",
            "GCP",
            "Debugging",
            "Mentoring",
            "Agile",
            "Communication",
            "Data Structures and algorithms",
            "Microservices",
          ],
          certifications: [
            "AWS Certified Solutions Architect",
            "Azure",
          ],
          stream: "Science (CS+Math)",
          ugCourse: "B.Tech CSE",
          pgCourse: "M.Tech CSE",
        },
      ],
    },
  ];

  // Chart data with improved styling
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

  const jobStatus = [
    { name: "Active", value: 65, color: "#3B82F6" },
    { name: "Closed", value: 35, color: "#94A3B8" },
  ];

  // Stats data
  const stats = [
    {
      title: "Total Jobs",
      value: "142",
      icon: Briefcase,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Active Candidates",
      value: "1,248",
      icon: Users,
      change: "+18%",
      changeType: "positive" as const,
    },
    {
      title: "Applications This Week",
      value: "89",
      icon: FileText,
      change: "+5%",
      changeType: "positive" as const,
    },
    {
      title: "Placement Rate",
      value: "78%",
      icon: TrendingUp,
      change: "+2%",
      changeType: "positive" as const,
    },
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

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (score >= 80) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const DashboardView = () => (
    <div className="space-y-8">
      {/* Enhanced Profile Section */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                  <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                    {adminProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">
                  Welcome back, {adminProfile.name}
                </h2>
                <div className="flex items-center space-x-4 text-slate-600">
                  <span className="font-medium">{adminProfile.role}</span>
                  <span>•</span>
                  <span>{adminProfile.department}</span>
                </div>
                <p className="text-sm text-slate-500">{adminProfile.email}</p>
              </div>
            </div>
            <Button
              onClick={() => setEditProfileOpen(true)}
              className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
            >
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className="animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              New Jobs Posted Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={jobsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="jobs"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Applications per Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={applicationsPerWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="applications" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Job Status Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={jobStatus}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {jobStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const JobsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Job Listings</h2>
          <p className="text-slate-600 mt-1">Manage and review all posted positions</p>
        </div>
      </div>
      
      <div className="grid gap-6">
        {joblists.map((job, index) => (
          <div key={job.id} className="animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
            <JobCard
              job={job}
              onViewMore={() => {
                setSelectedJob(job);
                setViewMoreOpen(true);
              }}
              onViewCandidates={() => handleViewCandidates(job)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {currentView === "dashboard" && "Dashboard"}
              {currentView === "companies" && "Companies"}
              {currentView === "jobs" && "Jobs"}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          </div>

          {currentView === "dashboard" && <DashboardView />}
          {currentView === "companies" && (
            <div className="text-center py-16">
              <Building className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Companies Section</h3>
              <p className="text-slate-500">This section is coming soon.</p>
            </div>
          )}
          {currentView === "jobs" && <JobsView />}
        </div>
      </main>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">Name</Label>
              <Input
                id="name"
                value={profileName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProfileName(e.target.value)
                }
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setProfileEmail(e.target.value)
                }
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => setEditProfileOpen(false)}
                disabled={profileSaving}
                className="border-slate-200 hover:border-slate-300"
              >
                Cancel
              </Button>
              <Button
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
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
              >
                {profileSaving ? (
                  <span className="inline-flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Job Details Dialog */}
      <Dialog open={viewMoreOpen} onOpenChange={setViewMoreOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Company
                    </h4>
                    <p className="text-slate-600">{selectedJob.company}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </h4>
                    <p className="text-slate-600">{selectedJob.location}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Salary
                    </h4>
                    <p className="text-emerald-600 font-semibold">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Applications
                    </h4>
                    <p className="text-slate-600">
                      {selectedJob.candidates?.length || 0} candidates
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Job Description</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Requirements</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedJob.requirements}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Candidates Dialog */}
      <Dialog open={viewCandidatesOpen} onOpenChange={setViewCandidatesOpen}>
        <DialogContent className="max-w-fit max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Candidates for {selectedJob?.title}
              </div>
              <div className="flex justify-end pt-6">
                <Button
                  onClick={handleSubmitCandidates}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  Process Applications
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {candidatesStep === "initial" && (
            <div className="space-y-6 pt-4">
              <div className="bg-slate-50 rounded-lg p-1">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-4 font-semibold text-slate-900">Name</th>
                      <th className="text-left p-4 font-semibold text-slate-900">Gender</th>
                      <th className="text-left p-4 font-semibold text-slate-900">Category</th>
                      <th className="text-left p-4 font-semibold text-slate-900">10th Score</th>
                      <th className="text-left p-4 font-semibold text-slate-900">12th Score</th>
                      <th className="text-left p-4 font-semibold text-slate-900">Undergraduate Score</th>
                      <th className="text-left p-4 font-semibold text-slate-900">Postgraduate Score</th>
                      <th className="text-left p-4 font-semibold text-slate-900">Skills</th>
                      <th className="text-left p-4 font-semibold text-slate-900">Certifications</th>
                      <th className="text-left p-4 font-semibold text-slate-900">Stream</th>
                      <th className="text-left p-4 font-semibold text-slate-900">UG Course</th>
                      <th className="text-left p-4 font-semibold text-slate-900">PG Course</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white rounded-lg">
                    {selectedJob?.candidates?.map((candidate, index) => (
                      <tr
                        key={candidate.id}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                          index === 0 ? 'rounded-t-lg' : ''
                        } ${
                          index === selectedJob.candidates!.length - 1 ? 'rounded-b-lg border-b-0' : ''
                        }`}
                      >
                        <td className="p-4 font-medium text-slate-900">{candidate.name}</td>
                        <td className="p-4 text-slate-600">{candidate.gender}</td>
                        <td className="p-4 text-slate-600">{candidate.category}</td>
                        <td className="p-4 text-slate-600">{candidate.tenthScore}</td>
                        <td className="p-4 text-slate-600">{candidate.twelfthScore}</td>
                        <td className="p-4 text-slate-600">{candidate.undergraduateScore}</td>
                        <td className="p-4 text-slate-600">{candidate.postgraduateScore || 'N/A'}</td>
                        <td className="p-4 text-slate-600">{candidate.skills.join(", ")}</td>
                        <td className="p-4 text-slate-600">{candidate.certifications.join(", ") || 'N/A'}</td>
                        <td className="p-4 text-slate-600">{candidate.stream}</td>
                        <td className="p-4 text-slate-600">{candidate.ugCourse}</td>
                        <td className="p-4 text-slate-600">{candidate.pgCourse || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {candidatesStep === "loading" && <LoadingSpinner />}

          {candidatesStep === "results" && (
            <div className="space-y-6 pt-4">
              {/* Enhanced Tab Navigation */}
              <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "all"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    All Candidates
                  </button>
                  <button
                    onClick={() => setActiveTab("shortlisted")}
                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "shortlisted"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    Shortlisted
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                      {getTopCandidates(selectedJob?.candidates || []).length}
                    </span>
                  </button>
                </nav>
              </div>

              {activeTab === "all" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-900">
                      All Candidates with AI Scores
                    </h3>
                    <Button
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left p-4 font-semibold text-slate-900">Name</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Email</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Experience</th>
                          <th className="text-left p-4 font-semibold text-slate-900">AI Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedJob?.candidates
                          ?.sort((a, b) => b.score - a.score)
                          ?.map((candidate, index) => (
                            <tr
                              key={candidate.id}
                              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-slate-200 text-slate-700 text-sm">
                                      {candidate.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium text-slate-900">
                                    {candidate.name}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 text-slate-600">{candidate.email}</td>
                              <td className="p-4 text-slate-600">{candidate.experience}</td>
                              <td className="p-4">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold`}>
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
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Top Shortlisted Candidates
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Based on AI analysis and scoring
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Shortlist
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {getTopCandidates(selectedJob?.candidates || []).map(
                      (candidate, index) => (
                        <Card 
                          key={candidate.id} 
                          className="border-0 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <Avatar className="w-12 h-12">
                                    <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                                      {candidate.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                    index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-400' : 'bg-amber-600'
                                  }`}>
                                    {index + 1}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                                    {candidate.name}
                                    {index === 0 && (
                                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                                        Top Pick
                                      </span>
                                    )}
                                  </h4>
                                  <p className="text-sm text-slate-600">{candidate.email}</p>
                                  <p className="text-sm text-slate-500">
                                    {candidate.experience} experience
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 ${getScoreBadgeColor(candidate.score)}`}>
                                  {candidate.score}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    )}
                  </div>

                  {/* Action Buttons for Shortlisted */}
                  <div className="flex justify-center gap-4 pt-6 border-t border-slate-200">
                    <Button
                      variant="outline"
                      className="border-slate-200 hover:border-slate-300"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Interviews
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Users className="w-4 h-4 mr-2" />
                      Proceed with Selection
                    </Button>
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