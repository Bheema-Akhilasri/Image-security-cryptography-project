import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

/**
 * PageHeader component for consistent page titles
 * Used at the top of each page
 */
const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  return (
    <div className="hero-gradient py-8 sm:py-10">
      <div className="section-container">
        <div className="text-center space-y-4">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-foreground fade-in">
            {title}
          </h1>
          {subtitle && (
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto fade-in" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
