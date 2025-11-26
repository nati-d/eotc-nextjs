import Link from "next/link";
import Image from "next/image";

interface NavbarLogoProps {
  href?: string;
  className?: string;
  showLink?: boolean;
}

export function NavbarLogo({ 
  href = "/", 
  className = "",
  showLink = true 
}: NavbarLogoProps) {
  const logoContent = (
    <Image
      src="/eocrh-logo.png"
      alt="EOTC Resource Hub Logo"
      width={120}
      height={40}
      className={`h-8 w-auto object-contain block ${className}`}
      priority
      unoptimized
      style={{ 
        display: 'block',
        maxHeight: '32px',
        width: 'auto',
        height: 'auto',
        filter: 'contrast(1.2) brightness(0.9)'
      }}
    />
  );

  if (showLink) {
    return (
      <Link
        href={href}
        className={`relative z-[70] mr-4 flex items-center justify-center px-2 py-1 shrink-0 ${className}`}
      >
        {logoContent}
      </Link>
    );
  }

  return (
    <div className={`flex items-center justify-center shrink-0 ${className}`}>
      {logoContent}
    </div>
  );
}

