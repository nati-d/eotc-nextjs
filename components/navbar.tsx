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
import { useState } from "react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { NAVBAR_MENU_ITEMS } from "@/constants/navbar";
import { usePathname } from "next/navigation";

export function NavbarComponent() {
  const pathname = usePathname();
  // If not on auth pages, user is authenticated (middleware protects routes)
  const isAuthenticated = !pathname?.startsWith('/auth');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
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
              <NavbarButton variant="secondary" as={Link} href="/auth/login">
                Login
              </NavbarButton>
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
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                  as={Link}
                  href="/auth/login"
                >
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* Navbar */}
    </div>
  );
}


