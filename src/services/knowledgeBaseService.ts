// Types for knowledge base data
export interface QAItem {
  id: string;
  type?: 'steps' | 'text';
  title: string;
  content?: string;
  steps?: ApplicationStep[];
  icon?: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApplicationStep {
  step: number;
  title: string;
  description: string;
}

export interface FilterCategory {
  id: string;
  label: string;
  checked: boolean;
}

// Sample data - this will be replaced with Firebase/API calls later
export const filterCategories: FilterCategory[] = [
  { id: 'all', label: 'All', checked: false },
  { id: 'general', label: 'General', checked: false },
  { id: 'scale', label: 'Scale', checked: true },
  { id: 'launch', label: 'Launch', checked: true },
  { id: 'disrupt', label: 'Disrupt', checked: false },
];

export const applicationSteps: ApplicationStep[] = [
  {
    step: 1,
    title: "Create An Account",
    description: "Sign Up With Your Name, Email, Job Title, Company, And Nationality. Verify Your Email To Activate The Account."
  },
  {
    step: 2,
    title: "Start Your Application",
    description: "Log In, Go To Your Dashboard, And Click \"Apply For Scale Program.\""
  },
  {
    step: 3,
    title: "Fill In The Form",
    description: "Provide Your Business Info: Model, Team, Growth Stage, Funding, Etc."
  },
  {
    step: 4,
    title: "Upload Documents",
    description: "Attach Required Files (Pitch Deck, Business License, Financials) In PDF Or DOCX."
  },
  {
    step: 5,
    title: "Submit Or Save As Draft",
    description: "You Can Submit Directly Or Save As Draft And Return Later."
  }
];

export const qaData: Record<string, QAItem[]> = {
  all: [
    {
      id: 'all-1',
      title: 'What is the Onshur Portal?',
      content: 'The Onshur Portal is a comprehensive platform designed to support publishers and content creators in the UAE. It provides access to various programs, resources, and support services to help grow your publishing business.',
      icon: 'FaFileAlt',
      category: 'all',
    },
    {
      id: 'all-2',
      title: 'How do I contact support?',
      content: 'You can contact our support team through the Support Center tab in the sidebar, or by opening a ticket through the support system. Our team typically responds within 24 hours.',
      icon: 'FaFileAlt',
      category: 'all',
    }
  ],
  general: [
    {
      id: 'general-1',
      title: 'What are the eligibility requirements?',
      content: 'Eligibility requirements vary by program. Generally, you need to be a registered business in the UAE, have a valid business license, and meet the specific criteria for each program track.',
      icon: 'FaFileAlt',
      category: 'general',
    },
    {
      id: 'general-2',
      title: 'How long does the application process take?',
      content: 'The application process typically takes 2-4 weeks from submission to approval. This includes review of your application, document verification, and final decision notification.',
      icon: 'FaFileAlt',
      category: 'general',
    }
  ],
  scale: [
    {
      id: 'scale-1',
      type: 'steps',
      title: 'How To Apply For The Scale Program?',
      icon: 'FaFileAlt',
      steps: applicationSteps,
      category: 'all',
    },
    {
      id: 'scale-2',
      title: 'What is the Scale Program?',
      content: 'The Scale Program is designed for established publishers looking to grow their business. It provides access to industry tools, mentorship, and proven strategies to expand your publishing house into new markets.',
      icon: 'FaFileAlt',
      category: 'scale',
    },
    {
      id: 'scale-3',
      title: 'What documents are required for Scale Program?',
      content: 'Required documents include: Business license, Financial statements (last 2 years), Pitch deck, Team overview, Growth strategy document, and Market analysis.',
      icon: 'FaFileAlt',
      category: 'scale',
    },
    {
      id: 'scale-4',
      title: 'What support do I get in the Scale Program?',
      content: 'Scale Program participants receive: 1-on-1 mentorship, access to industry tools and resources, networking opportunities, marketing support, and funding guidance.',
      icon: 'FaFileAlt',
      category: 'scale',
    },
  ],
  launch: [
    {
      id: 'launch-1',
      title: 'What is the Launch Program?',
      content: 'The Launch Program is for aspiring publishers in the UAE. It provides the tools, guidance, and support to launch your publishing journey from building your first catalog to mastering the basics.',
      icon: 'FaFileAlt',
      category: 'launch',
    },
    {
      id: 'launch-2',
      title: 'Is the Launch Program currently open?',
      content: 'The Launch Program is currently closed for new applications. Please check back later or contact support for updates on when applications will reopen.',
      icon: 'FaFileAlt',
      category: 'launch',
    }
  ],
  disrupt: [
    {
      id: 'disrupt-1',
      title: 'What is the Disrupt Program?',
      content: 'The Disrupt Program supports publishers driving innovation in the industry. It focuses on tech-integrated publishing, creative business models, and bold ideas that transform the industry.',
      icon: 'FaQuestionCircle',
      category: 'disrupt',
    },
    {
      id: 'disrupt-2',
      title: 'What makes a project eligible for Disrupt?',
      content: 'Disrupt Program projects should demonstrate innovative use of technology, creative business models, or novel approaches to publishing that could transform the industry.',
      icon: 'FaQuestionCircle',
      category: 'disrupt',
    }
  ]
};

// Service functions for future admin integration
export class KnowledgeBaseService {
  // Get all QA items for a specific category
  static getQAItemsByCategory(category: string): QAItem[] {
    return qaData[category] || [];
  }

  // Get all QA items for multiple categories
  static getQAItemsByCategories(categories: string[]): QAItem[] {
    const items: QAItem[] = [];
    categories.forEach(category => {
      if (qaData[category]) {
        items.push(...qaData[category]);
      }
    });
    return items;
  }

  // Get all application steps
  static getApplicationSteps(): ApplicationStep[] {
    return applicationSteps;
  }

  // Get filter categories
  static getFilterCategories(): FilterCategory[] {
    return filterCategories;
  }

  // // Future admin functions (to be implemented)
  // static async addQAItem(_: Omit<QAItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<QAItem> {
  //   // TODO: Implement Firebase/API call
  //   throw new Error('Not implemented yet');
  // }

  // static async updateQAItem(id: string, updates: Partial<QAItem>): Promise<QAItem> {
  //   // TODO: Implement Firebase/API call
  //   throw new Error('Not implemented yet');
  // }

  // static async deleteQAItem(id: string): Promise<void> {
  //   // TODO: Implement Firebase/API call
  //   throw new Error('Not implemented yet');
  // }

  // static async updateApplicationSteps(steps: ApplicationStep[]): Promise<ApplicationStep[]> {
  //   // TODO: Implement Firebase/API call
  //   throw new Error('Not implemented yet');
  // }
}