import { Link } from 'react-router-dom';
import { company, navigation } from '../../config/company';
import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-intro">
          <Logo />
          <p>{company.description}</p>
        </div>
        <div>
          <span className="eyebrow">Navigate</span>
          <nav aria-label="Footer navigation">
            {navigation.slice(1).map((item) => <Link key={item.label} to={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <span className="eyebrow">Write to us</span>
          <a href={`mailto:${company.emails.projects}`}>{company.emails.projects}</a>
          <a href={`mailto:${company.emails.general}`}>{company.emails.general}</a>
          <a href={`mailto:${company.emails.support}`}>{company.emails.support}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} HugoLabs</span>
        <span>Independent software studio</span>
      </div>
    </footer>
  );
}
