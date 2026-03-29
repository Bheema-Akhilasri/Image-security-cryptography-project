import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

type StatusType = "success" | "error" | "warning" | "info";

interface StatusMessageProps {
  type: StatusType;
  message: string;
  className?: string;
}

/**
 * StatusMessage component for displaying status feedback
 * Used for encryption/decryption status updates
 */
const StatusMessage = ({ type, message, className = "" }: StatusMessageProps) => {
  const config = {
    success: {
      icon: CheckCircle,
      bgClass: "bg-success/10 border-success/30",
      textClass: "text-success",
    },
    error: {
      icon: XCircle,
      bgClass: "bg-destructive/10 border-destructive/30",
      textClass: "text-destructive",
    },
    warning: {
      icon: AlertCircle,
      bgClass: "bg-warning/10 border-warning/30",
      textClass: "text-warning",
    },
    info: {
      icon: Info,
      bgClass: "bg-accent/10 border-accent/30",
      textClass: "text-accent",
    },
  };

  const { icon: Icon, bgClass, textClass } = config[type];

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border ${bgClass} ${className}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${textClass}`} />
      <p className={`text-sm font-medium ${textClass}`}>{message}</p>
    </div>
  );
};

export default StatusMessage;
