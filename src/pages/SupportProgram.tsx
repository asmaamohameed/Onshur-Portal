import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import { Icon } from "../components/common/Icon";

// Placeholder data, to be replaced with Firebase integration in the future
const supportPrograms = [
  {
    title: "Launch Program",
    status: "closed",
    statusLabel: "Closed",
    statusIcon: { set: "fa" as const, name: "FaTimesCircle", color: "#e53e3e" },
    statusBg: "bg-gray-100",
    statusText: "text-red-600",
    description: "For Aspiring Publishers In The UAE",
    details:
      "Gain the tools, guidance, and support to launch your publishing journey — from building your first catalog to mastering the basics.",
    buttonDisabled: true,
  },
  {
    title: "Scale Program",
    status: "open",
    statusLabel: "Open",
    statusIcon: { set: "fa" as const, name: "FaCheckCircle", color: "#38a169" },
    statusBg: "bg-green-50",
    statusText: "text-green-700",
    description: "For Established Publishers Looking To Grow",
    details:
      "Access industry tools, mentorship, and proven strategies to expand your publishing house into new markets.",
    buttonDisabled: false,
  },
  {
    title: "Disrupt Program",
    status: "open",
    statusLabel: "Open",
    statusIcon: { set: "fa" as const, name: "FaCheckCircle", color: "#38a169" },
    statusBg: "bg-green-50",
    statusText: "text-green-700",
    description: "For Publishers Driving Innovation",
    details:
      "Support for tech-integrated publishing, creative business models, and bold ideas that transform the industry.",
    buttonDisabled: false,
  },
];

export default function SupportProgram() {
  return (
    <>
      <PageMeta
        title="Support Program | Onshur Portal"
        description="Onshur Scale program support and application management portal for UAE publishers and content creators"
      />
      <PageBreadcrumb pageTitle="Support Programs" />
      <div className="py-6 px-2 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportPrograms.map((program, idx) => (
            <div
              key={program.title}
              className={`rounded-2xl border border-gray-200 ${
                program.status === "closed" ? "bg-violet-50" : program.status === "open" && idx === 1 ? "bg-orange-50" : "bg-green-50"
              } p-6 flex flex-col justify-between min-h-[320px] shadow-sm transition-transform hover:scale-[1.02]`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                    {program.title.toUpperCase()}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${program.statusBg} ${program.statusText}`}
                  >
                    <Icon {...program.statusIcon} size={16} /> {program.statusLabel}
                  </span>
                </div>
                <div className="mb-2 text-base font-semibold text-gray-700">
                  {program.description}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {program.details}
                </div>
              </div>
              <button
                className={`mt-6 w-full py-2 rounded bg-brand-500 text-white font-semibold transition-opacity duration-200 focus:outline-none focus:ring-2  focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed`}
                disabled={program.buttonDisabled}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 