import { useState } from 'react';
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import { Icon } from "../components/common/Icon";
import Accordion from "../components/ui/accordion";
import { 
  filterCategories, 
  qaData 
} from "../services/knowledgeBaseService";

function StepsContent({ steps }: { steps: any[] }) {
  return (
    <div className="space-y-4">
      {steps.map((step) => (
        <div key={step.step} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {step.step}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FaqContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-gray-700 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function KnowledgeBase() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(['all'])
  );

  const handleFilterChange = (filterId: string) => {
    const newFilters = new Set(activeFilters);
    if (filterId === 'all') {
      if (newFilters.has('all')) {
        newFilters.clear();
      } else {
        newFilters.clear();
        newFilters.add('all');
      }
    } else {
      if (newFilters.has('all')) {
        newFilters.delete('all');
      }
      if (newFilters.has(filterId)) {
        newFilters.delete(filterId);
      } else {
        newFilters.add(filterId);
      }
    }
    setActiveFilters(newFilters);
  };

  // Get filtered Q&A items
  const getFilteredQA = () => {
    if (activeFilters.has('all')) {
      // Combine all arrays in qaData into one big array, remove duplicates by id
      const allItems = Object.values(qaData).flat();
      const unique = new Map();
      allItems.forEach(item => unique.set(item.id, item));
      return Array.from(unique.values());
    }
    
    const filteredItems: typeof qaData.all = [];
    activeFilters.forEach(filter => {
      if (qaData[filter as keyof typeof qaData]) {
        filteredItems.push(...qaData[filter as keyof typeof qaData]);
      }
    });
    return filteredItems;
  };

  const filteredQA = getFilteredQA();
  const accordionItems = filteredQA.map((item) => ({
    id: item.id,
    title: (
      <span className="flex items-center gap-2">
        <Icon set="fa" name={item.icon || 'FaQuestionCircle'} className="text-brand-500" size={20} />
        <span className="font-semibold text-gray-800">{item.title}</span>
      </span>
    ),
    content:
      item.type === 'steps' && item.steps ? (
        <StepsContent steps={item.steps} />
      ) : (
        <FaqContent>
          {Array.isArray(item.content) ? (
            <ul className="list-disc pl-6">
              {item.content.map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          ) : (
            <p>{item.content}</p>
          )}
        </FaqContent>
      ),
  }));

  return (
    <>
      <PageMeta
        title="Knowledge Base | Onshur Portal"
        description="Comprehensive knowledge base and FAQ for Onshur Portal users"
      />
      <PageBreadcrumb pageTitle="Knowledge Base" />
      
      <div className="py-6 px-2 md:px-0">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            {filterCategories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.has(category.id)}
                  onChange={() => handleFilterChange(category.id)}
                  className="peer sr-only"
                />
                <span className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center
                  peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-colors duration-200">
                  <svg
                    className={`w-3 h-3 text-white ${activeFilters.has(category.id) ? 'block' : 'hidden'}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Q&A Section */}
        {accordionItems.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <Accordion items={accordionItems} />
          </div>
        )}

        {/* No Results Message */}
        {accordionItems.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm">
            <Icon set="fa" name="FaSearch" className="text-gray-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No questions found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or contact support for assistance.
            </p>
          </div>
        )}

        {/* Notes and Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Note Section */}
          <div className="bg-brand-800 border border-brand-600 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon set="fa" name="FaStickyNote" className="text-brand-500" size={20} />
              <h3 className="font-semibold text-gray-800">Note:</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Once Submitted, The Application Can't Be Edited.
            </p>
          </div>

          {/* Help Section */}
          <div className="bg-brand-800 border border-brand-600 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon set="fa" name="FaQuestionCircle" className="text-brand-500" size={20} />
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
            </div>
            <p className="text-gray-700 text-sm">
              Go To <span className="font-bold underline cursor-pointer hover:text-brand-600">Support</span> To Open A Ticket.
            </p>
          </div>
        </div>

      </div>
    </>
  );
}