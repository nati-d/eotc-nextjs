"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { NavbarLogo } from "@/components/navbar-logo";
import { useState, useEffect } from "react";
import Link from "next/link";
import { logout, isAuthenticated as checkAuth } from "@/app/actions/auth";
import { NAVBAR_MENU_ITEMS } from "@/constants/navbar";
import { usePathname } from "next/navigation";

export function NavbarComponent() {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  
  // Check authentication status on mount and when pathname changes
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authStatus = await checkAuth();
        setAuthenticated(authStatus);
      } catch (error) {
        setAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [pathname]);
  
  // If on auth pages, definitely not authenticated
  const isAuthPage = pathname?.startsWith('/auth');
  const isAuthenticated = isAuthPage ? false : (authenticated ?? false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Update auth status immediately (optimistic update)
      setAuthenticated(false);
      await logout();
    } catch (err) {
      // Check if this is a Next.js redirect error (redirect() throws a special error)
      // Redirect errors have a digest property starting with 'NEXT_REDIRECT'
      if (
        err &&
        typeof err === 'object' &&
        'digest' in err &&
        typeof err.digest === 'string' &&
        err.digest.startsWith('NEXT_REDIRECT')
      ) {
        // This is a redirect, not an error - let it happen
        return;
      }
      // If it's a real error, log it and reset auth status
      console.error('Logout error:', err);
      setAuthenticated(false);
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={NAVBAR_MENU_ITEMS} />
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <NavbarButton 
                variant="primary" 
                as="button"
                onClick={handleLogout}
              >
                Logout
              </NavbarButton>
            ) : (
              <>
                <NavbarButton variant="primary" as={Link} href="/auth/login">
                  Login
                </NavbarButton>
                <NavbarButton variant="secondary" as={Link} href="/auth/register" className="border border-foreground/20">
                  Sign Up
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {NAVBAR_MENU_ITEMS.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {isAuthenticated ? (
                <NavbarButton
                  onClick={async () => {
                    setIsMobileMenuOpen(false);
                    await handleLogout();
                  }}
                  variant="primary"
                  className="w-full"
                  as="button"
                >
                  Logout
                </NavbarButton>
              ) : (
                <>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                    as={Link}
                    href="/auth/login"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="secondary"
                    className="w-full border border-foreground/20"
                    as={Link}
                    href="/auth/register"
                  >
                    Sign Up
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}


