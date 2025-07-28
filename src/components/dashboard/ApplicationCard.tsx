import React from "react";
import Badge from "../ui/badge/Badge";
import { Icon, IconProps } from "../common/Icon";

type BadgeColor = "primary" | "success" | "error" | "warning" | "info" | "light";

interface ApplicationCardProps {
  name: string;
  status: string;
  statusType: BadgeColor;
  date: string;
  icon: { set: IconProps["set"]; name: string };
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  name,
  status,
  statusType,
  date,
  icon,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon set={icon.set} name={icon.name} size={18} />
          <span className="font-semibold text-gray-800 text-sm">{name}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Badge color={statusType} size="sm">
          {status}
        </Badge>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
    </div>
  );
};

export default ApplicationCard; 