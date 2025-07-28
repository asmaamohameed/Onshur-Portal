import React from "react";
import Alert from "../ui/alert/Alert";

interface NewsItem {
  type: "article" | "news";
  title: string;
  variant: "info" | "success" | "warning" | "error";
  message: string;
}

interface NewsUpdatesSectionProps {
  news: NewsItem[];
}

const NewsUpdatesSection: React.FC<NewsUpdatesSectionProps> = ({ news }) => {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold text-brand-500 mb-4 tracking-tight">
        NEWS & UPDATES
      </h2>
      
      {news.length === 0 ? (
        // Empty State
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-500">No news or updates available at the moment.</p>
        </div>
      ) : (
        // News Display
        <div className="flex flex-col gap-3">
          {news.map((item, idx) => (
            <Alert
              key={idx}
              variant={item.variant}
              title={item.type === 'news' ? 'News' : 'Article'}
              message={item.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsUpdatesSection; 