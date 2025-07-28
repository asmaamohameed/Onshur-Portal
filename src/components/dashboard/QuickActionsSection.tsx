import React from "react";
import Button from "../ui/button/Button";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface QuickActionsSectionProps {
  actions: QuickAction[];
  className?: string;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({ actions, className }) => {
  return (
    <div className={`flex flex-col h-full ${className || ""}`}>
      <h2 className="text-lg md:text-xl font-bold text-brand-500 mb-4 tracking-tight">
        QUICK ACTIONS
      </h2>
      {actions.length === 0 ? (
        // Empty State
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center flex-1 flex items-center justify-center">
          <p className="text-gray-500">No quick actions available at the moment.</p>
        </div>
      ) : (
        // Actions Display
        <div className="flex flex-col gap-4 flex-1 justify-center">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              variant="primary"
              size="md"
              startIcon={action.icon}
              onClick={action.onClick}
              className="w-full justify-start font-semibold flex-1 min-h-[48px]"
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickActionsSection; 