// Types for wheel templates and components

export interface WheelItem {
  id: string;
  label: string;
  color: string;
  weight?: number;
}

export interface WheelTemplate {
  id: string;
  title: string;
  slug?: string;
  category: string;
  subcategory?: string;
  description: string;
  items: WheelItem[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  usageCount?: number;
  isPopular?: boolean;
  createdAt?: string;
  lastModified?: string;
}

export interface WheelPageProps {
  template: WheelTemplate;
  seoTitle?: string;
  seoDescription?: string;
}