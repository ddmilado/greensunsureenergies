// Shared TypeScript types for the store domain.
export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  short_desc: string | null;
  description: string | null;
  category_id: string | null;
  price_kobo: number;
  compare_at_kobo: number | null;
  currency: string;
  stock: number;
  active: boolean;
  wattage_w: number | null;
  capacity_ah: number | null;
  voltage_v: number | null;
  warranty_yrs: number | null;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  position: number;
  created_at: string;
};

export type ProductWithImages = Product & {
  images: ProductImage[];
  category: Category | null;
};

export type CartItem = {
  product_id: string;
  quantity: number;
  // hydrated client-side:
  product?: Pick<
    Product,
    | "id"
    | "slug"
    | "name"
    | "brand"
    | "price_kobo"
    | "currency"
    | "stock"
  > & { image?: string };
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "failed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type Order = {
  id: string;
  user_id: string | null;
  email: string;
  status: OrderStatus;
  subtotal_kobo: number;
  shipping_kobo: number;
  total_kobo: number;
  currency: string;
  ship_full_name: string | null;
  ship_phone: string | null;
  ship_address_line1: string | null;
  ship_address_line2: string | null;
  ship_city: string | null;
  ship_state: string | null;
  ship_postal_code: string | null;
  ship_country: string | null;
  paystack_reference: string | null;
  paystack_authorization_url: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  name: string;
  unit_kobo: number;
  quantity: number;
  line_kobo: number;
  created_at: string;
};

// ---------- projects ----------
export type ProjectGalleryItem = { url: string; alt?: string | null; position?: number };

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  client_type: string | null;
  location: string | null;
  system_size: string | null;
  panels: string | null;
  batteries: string | null;
  inverter: string | null;
  installation: string | null;
  outcome: string | null;
  excerpt: string | null;
  body: string | null;
  cover_image: string | null;
  gallery: ProjectGalleryItem[];
  active: boolean;
  featured: boolean;
  position: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

// ---------- posts ----------
export type Post = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  body: string | null;
  cover_image: string | null;
  author_name: string | null;
  reading_minutes: number | null;
  active: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
};

// ---------- leads ----------
export type LeadKind = "quote" | "contact" | "support";
export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type Lead = {
  id: string;
  kind: LeadKind;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  page_path: string | null;
  meta: Record<string, unknown>;
  status: LeadStatus;
  user_id: string | null;
  created_at: string;
  updated_at: string;
};
