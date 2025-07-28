import React from "react";
import ApplicationCard from "./ApplicationCard";
import { Icon, IconProps } from "../common/Icon";

type BadgeColor = "primary" | "success" | "error" | "warning" | "info" | "light";

interface Application {
  name: string;
  status: string;
  statusType: BadgeColor;
  date: string;
  icon: { set: IconProps["set"]; name: string };
}

interface ApplicationsSectionProps {
  applications: Application[];
  onViewAll?: () => void;
}

const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({
  applications,
  onViewAll,
}) => {
  // Limit to maximum 4 applications
  const displayApplications = applications.slice(0, 4);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold text-brand-500 tracking-tight">
          YOUR LATEST APPLICATIONS
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm text-brand-500 underline font-medium hover:text-brand-700 transition-colors hidden sm:block"
        >
          View All Applications
        </button>
      </div>

      {displayApplications.length === 0 ? (
        // Empty State
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <Icon set="fa" name="FaFileAlt" size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No Applications Yet
          </h3>
          <p className="text-gray-500 mb-4">
            You haven't applied for any programs yet. Start your journey by applying for a program.
          </p>
          <button className="inline-flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors">
            <Icon set="fa" name="FaPlus" size={16} />
            Apply for Your First Program
          </button>
        </div>
      ) : (
        // Applications Display - Grid Layout
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayApplications.map((app, idx) => (
            <ApplicationCard
              key={idx}
              name={app.name}
              status={app.status}
              statusType={app.statusType}
              date={app.date}
              icon={app.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsSection; 