import logoUrl from '../../../assets/logo.png';

interface LogoProps {
  readonly compact?: boolean;
}

export function Logo({ compact = false }: LogoProps) {
  return (
    <span className="brand-mark">
      <img src={logoUrl} alt="" width="48" height="48" />
      {!compact && <span>HugoLabs</span>}
    </span>
  );
}
