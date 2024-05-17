export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export type MainNavItem = NavItem;

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
  };
}

export interface MarketingConfig {
  mainNav: MainNavItem[];
}

export interface PasswordResetConfig {
  mainNav: MainNavItem[];
}
