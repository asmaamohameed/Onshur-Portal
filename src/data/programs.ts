export interface Program {
  id: string;
  title: string;
  programType: string;
  status: 'open' | 'closed';
  statusLabel: string;
  statusIcon: { set: 'fa'; name: string; color: string };
  statusBg: string;
  statusText: string;
  description: string;
  details: string;
  buttonDisabled: boolean;
}

export const programs: Program[] = [
  {
    id: 'launch',
    title: 'Launch Program',
    programType: 'launch',
    status: 'closed',
    statusLabel: 'Closed',
    statusIcon: { set: 'fa', name: 'FaTimesCircle', color: '#e53e3e' },
    statusBg: 'bg-gray-100',
    statusText: 'text-red-600',
    description: 'For Aspiring Publishers In The UAE',
    details: 'Gain the tools, guidance, and support to launch your publishing journey — from building your first catalog to mastering the basics.',
    buttonDisabled: true,
  },
  {
    id: 'scale',
    title: 'Scale Program',
    programType: 'scale',
    status: 'open',
    statusLabel: 'Open',
    statusIcon: { set: 'fa', name: 'FaCheckCircle', color: '#38a169' },
    statusBg: 'bg-green-50',
    statusText: 'text-green-700',
    description: 'For Established Publishers Looking To Grow',
    details: 'Access industry tools, mentorship, and proven strategies to expand your publishing house into new markets.',
    buttonDisabled: false,
  },
  {
    id: 'disrupt',
    title: 'Disrupt Program',
    programType: 'disrupt',
    status: 'open',
    statusLabel: 'Open',
    statusIcon: { set: 'fa', name: 'FaCheckCircle', color: '#38a169' },
    statusBg: 'bg-green-50',
    statusText: 'text-green-700',
    description: 'For Publishers Driving Innovation',
    details: 'Support for tech-integrated publishing, creative business models, and bold ideas that transform the industry.',
    buttonDisabled: false,
  },
];

// Helper function to get program by type
export const getProgramByType = (programType: string): Program | undefined => {
  return programs.find(program => program.programType === programType);
};

// Helper function to get all programs
export const getAllPrograms = (): Program[] => {
  return programs;
}; 