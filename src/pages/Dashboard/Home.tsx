import PageMeta from "../../components/common/PageMeta";
import { Icon } from "../../components/common/Icon";
import ApplicationsSection from "../../components/dashboard/ApplicationsSection";
import NewsUpdatesSection from "../../components/dashboard/NewsUpdatesSection";
import HelpfulArticlesSection from "../../components/dashboard/HelpfulArticlesSection";
import QuickActionsSection from "../../components/dashboard/QuickActionsSection";
import React from "react";

// Types
type BadgeColor = "primary" | "success" | "error" | "warning" | "info" | "light";

interface Application {
  name: string;
  status: string;
  statusType: BadgeColor;
  date: string;
  icon: { set: "fa" | "md" | "ai" | "io" | "bs" | "gi" | "fi" | "ri" | "hi" | "go" | "cg" | "tb"; name: string };
}

interface NewsItem {
  type: "article" | "news";
  title: string;
  variant: "info" | "success" | "warning" | "error";
  message: string;
}

interface Article {
  icon: { set: "fa" | "md" | "ai" | "io" | "bs" | "gi" | "fi" | "ri" | "hi" | "go" | "cg" | "tb"; name: string };
  title: string;
  desc: string;
  link: string;
  linkText: string;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export default function Home() {
  // Sample data - replace with real data from API/context
  const applications: Application[] = [
    {
      name: "Scale Track",
      status: "In Review",
      statusType: "info",
      date: "May 15, 2025",
      icon: { set: "fa", name: "FaSearch" },
    },
    {
      name: "Launch Track",
      status: "Draft",
      statusType: "warning",
      date: "June 5, 2025",
      icon: { set: "fa", name: "FaRegEdit" },
    },
    {
      name: "Disrupt Track",
      status: "Accepted",
      statusType: "success",
      date: "April 20, 2025",
      icon: { set: "fa", name: "FaCheckCircle" },
    },
    {
      name: "Disrupt Track",
      status: "Rejected",
      statusType: "error",
      date: "April 20, 2025",
      icon: { set: "fa", name: "FaTimesCircle" },
    },
  ];

  const news: NewsItem[] = [
    {
      type: "article",
      title: '"Tips for Successful Publishing in the UAE Market"',
      variant: "info",
      message: "Article: 'Tips for Successful Publishing in the UAE Market'",
    },
    {
      type: "news",
      title: '2nd Cycle of "Unshur – Scale" Program is Now Open',
      variant: "info",
      message: "News: 2nd Cycle of 'Unshur – Scale' Program is Now Open",
    },
    {
      type: "article",
      title: '"Tips for Successful Publishing in the UAE Market"',
      variant: "info",
      message: "Article: 'Tips for Successful Publishing in the UAE Market'",
    },
  ];

  const articles: Article[] = [
    {
      icon: { set: "fa", name: "FaFileAlt" },
      title: "How To Apply For The Scale Program?",
      desc:
        "Learn the step-by-step process of applying to the Scale program – from logging in to uploading the required documents.",
      link: "#",
      linkText: "View Full Article",
    },
    {
      icon: { set: "fa", name: "FaClipboardList" },
      title: "What Documents Are Required?",
      desc:
        "This article provides a full checklist of all required documents for any program and how to prepare them properly.",
      link: "#",
      linkText: "View Full Article",
    },
    {
      icon: { set: "fa", name: "FaQuestionCircle" },
      title: "How To Submit A Support Ticket?",
      desc:
        "A quick guide on how to open a support ticket, contact the team, and track responses easily.",
      link: "#",
      linkText: "View Full Article",
    },
  ];

  const quickActions: QuickAction[] = [
    {
      icon: <Icon set="fa" name="FaPlusCircle" size={18} />,
      label: "Apply For A New Program",
      onClick: () => console.log("Apply for new program clicked"),
    },
    {
      icon: <Icon set="fa" name="FaTicketAlt" size={18} />,
      label: "Submit New Support Ticket",
      onClick: () => console.log("Submit support ticket clicked"),
    },
    {
      icon: <Icon set="fa" name="FaLightbulb" size={18} />,
      label: "Explore Knowledge Base",
      onClick: () => console.log("Explore knowledge base clicked"),
    },
  ];

  // Event handlers
  const handleViewAllApplications = () => {
    console.log("View all applications clicked");
    // Navigate to applications page
  };

  return (
    <>
      <PageMeta
        title="Dashboard | Onshur Portal"
        description="Main dashboard overview for Onshur Portal - View applications, news updates, and quick actions"
      />
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-6">
        <div className="space-y-8">
          {/* Applications Section - Full Width */}
          <ApplicationsSection
            applications={applications}
            onViewAll={handleViewAllApplications}
          />
          
          {/* News & Updates + Quick Actions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* News & Updates - Takes 2/3 of the space */}
            <div className="lg:col-span-2 flex flex-col h-full min-h-[260px]">
              <NewsUpdatesSection news={news} />
            </div>
            
            {/* Quick Actions - Takes 1/3 of the space, stretch to match height */}
            <div className="lg:col-span-1 flex flex-col h-full min-h-[260px]">
              <QuickActionsSection actions={quickActions} />
            </div>
          </div>
          
          {/* Helpful Articles Section - Full Width */}
          <HelpfulArticlesSection articles={articles} />
        </div>
      </div>
    </>
  );
}
