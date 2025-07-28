import React from "react";
import ComponentCard from "../common/ComponentCard";
import { Icon, IconProps } from "../common/Icon";

interface Article {
  icon: { set: IconProps["set"]; name: string };
  title: string;
  desc: string;
  link: string;
  linkText: string;
}

interface HelpfulArticlesSectionProps {
  articles: Article[];
}

const HelpfulArticlesSection: React.FC<HelpfulArticlesSectionProps> = ({ articles }) => {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold text-brand-500 mb-4 tracking-tight">
        HELPFUL ARTICLES
      </h2>
      
      {articles.length === 0 ? (
        // Empty State
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <p className="text-gray-500">No helpful articles available at the moment.</p>
        </div>
      ) : (
        // Articles Display
        <div className="flex flex-col gap-4">
          {articles.map((article, idx) => (
            <ComponentCard key={idx} title={article.title} className="!p-0">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Icon set={article.icon.set} name={article.icon.name} size={22} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">{article.desc}</div>
                  <a 
                    href={article.link} 
                    className="text-xs text-brand-500 underline font-medium hover:text-brand-700 transition-colors"
                  >
                    {article.linkText}
                  </a>
                </div>
              </div>
            </ComponentCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpfulArticlesSection; 