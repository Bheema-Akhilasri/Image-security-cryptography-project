import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

/**
 * FeatureCard component for displaying features with icons
 * Used on home page and throughout the application
 */
const FeatureCard = ({ icon: Icon, title, description, className = "" }: FeatureCardProps) => {
  return (
    <div className={`bg-card rounded-xl p-6 card-hover border border-border ${className}`}>
      <div className="icon-wrapper mb-4">
        <Icon className="w-6 h-6 text-accent-foreground" />
      </div>
      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
