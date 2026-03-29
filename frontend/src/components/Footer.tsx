import { Link } from "react-router-dom";
import { Shield, Github, Mail, ExternalLink } from "lucide-react";

/**
 * Footer component for the Image Security application
 * Contains project information and quick links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="icon-wrapper w-10 h-10">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                ImageSecure
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Improving Image Security While Communication Using Deep Learning Based on Cryptography
            </p>
            <p className="text-xs text-muted-foreground">
              Final Year Engineering Project
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/encrypt" className="text-sm text-muted-foreground hover:text-primary transition-colors animated-underline inline-block w-fit">
                Encrypt Image
              </Link>
              <Link to="/decrypt" className="text-sm text-muted-foreground hover:text-primary transition-colors animated-underline inline-block w-fit">
                Decrypt Image
              </Link>
              <Link to="/model-info" className="text-sm text-muted-foreground hover:text-primary transition-colors animated-underline inline-block w-fit">
                Model Information
              </Link>
              <Link to="/results" className="text-sm text-muted-foreground hover:text-primary transition-colors animated-underline inline-block w-fit">
                Results & Analysis
              </Link>
            </nav>
          </div>

          {/* Contact & Resources */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-foreground">Resources</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" />
                View Source Code
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Documentation
              </a>
              <a href="mailto:contact@example.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ImageSecure - Engineering Project. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Built with React + TypeScript
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
