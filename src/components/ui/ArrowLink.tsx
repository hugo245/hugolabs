import { ArrowUpRight } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface ArrowLinkProps extends PropsWithChildren {
  readonly to: string;
  readonly variant?: 'solid' | 'ghost';
}

export function ArrowLink({ to, children, variant = 'solid' }: ArrowLinkProps) {
  return (
    <Link className={`button button--${variant}`} to={to}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={17} />
    </Link>
  );
}
