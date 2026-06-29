export type NavLink = {
  label: string;
  href: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: "new" | "sale" | "popular" | "all";
  badge?: string;
  description: string;
};

export const APP_NAME = "Datics.ai Rao";
export const APP_TAGLINE = "Premium Essentials for Modern Living";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const NAV_CTA = {
  label: "Shop Now",
  href: "#products",
};

export const BRAND_ACCENT = "#e63946";