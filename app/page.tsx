"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Heart, ChevronRight, Sparkles } from 'lucide-react';
import { APP_NAME } from "@/lib/data";
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products = [
  {
    id: "p1",
    name: "Merino Wool Crewneck",
    price: 128,
    originalPrice: 160 as number | undefined,
    rating: 4.9,
    reviewCount: 214,
    image: "https://picsum.photos/seed/5481ee9847b1/800/600",
    badge: "Sale" as string | undefined,
    category: "sale",
    description: "Ultra-soft 100% merino wool. Naturally temperature-regulating for year-round wear.",
  },
  {
    id: "p2",
    name: "Linen Relaxed Trousers",
    price: 98,
    originalPrice: undefined as number | undefined,
    rating: 4.7,
    reviewCount: 138,
    image: "https://imgproxy.johnhenric.com/preset:sharp/resize:fit:1250/gravity:nowe/quality:80/aHR0cHM6Ly9qb2huaGVucmljLmNlbnRyYWNkbi5uZXQvY2xpZW50L2R5bmFtaWMvaW1hZ2VzLzMyODRfYjNiOWM2NGViOC1hMDMwMDYtMTUzLWluZmx1ZW5jZXItb3JpZ2luYWwuanBn",
    badge: "New" as string | undefined,
    category: "new",
    description: "Breathable stonewashed linen with a tailored-yet-relaxed silhouette.",
  },
  {
    id: "p3",
    name: "Leather Card Wallet",
    price: 64,
    originalPrice: undefined as number | undefined,
    rating: 4.8,
    reviewCount: 302,
    image: "https://picsum.photos/seed/5481ee9847b1/800/600",
    badge: "Popular" as string | undefined,
    category: "popular",
    description: "Full-grain vegetable-tanned leather. Holds 6 cards and slim-folds flat.",
  },
  {
    id: "p4",
    name: "Ceramic Pour-Over Set",
    price: 86,
    originalPrice: 110 as number | undefined,
    rating: 4.9,
    reviewCount: 189,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale" as string | undefined,
    category: "sale",
    description: "Hand-thrown stoneware dripper and carafe. Brews 600 ml in under four minutes.",
  },
  {
    id: "p5",
    name: "Canvas Tote Bag",
    price: 48,
    originalPrice: undefined as number | undefined,
    rating: 4.6,
    reviewCount: 421,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: undefined as string | undefined,
    category: "popular",
    description: "12 oz heavyweight canvas with reinforced handles. Holds up to 20 kg.",
  },
  {
    id: "p6",
    name: "Bamboo Desk Organizer",
    price: 72,
    originalPrice: undefined as number | undefined,
    rating: 4.7,
    reviewCount: 97,
    image: "https://meedenart.com/cdn/shop/files/1-07_a24e45f6-ae9b-4b15-b218-cc80ca127696_1600x.png?v=1732685200",
    badge: "New" as string | undefined,
    category: "new",
    description: "Sustainably sourced bamboo with five compartments and a hidden cable channel.",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Mara Lindqvist",
    location: "Stockholm",
    avatar: "https://migma.ai/images/avatars/mara.png",
    rating: 5,
    text: "The merino crewneck is the best piece of clothing I own. Wears beautifully after a dozen washes and still looks brand new.",
  },
  {
    id: "t2",
    name: "James Okafor",
    location: "London",
    avatar: "https://achiya.org/wp-content/uploads/writers/james-okafor-4d4bc7.webp",
    rating: 5,
    text: "Ordered the pour-over set as a gift. The packaging alone made an impression. Quality is exceptional for the price.",
  },
  {
    id: "t3",
    name: "Yuki Tanaka",
    location: "Tokyo",
    avatar: "https://cdn-test.poetryfoundation.org/cdn-cgi/image/w=2292,h=3438,q=80/content/images/Yuki-Tanaka-c-Ippei-and-Janine-Photography.jpg",
    rating: 5,
    text: "I have bought three canvas totes now. They hold everything, age beautifully, and the stitching has never come loose.",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $75",
    description: "Complimentary tracked delivery on all orders above $75. Express options available at checkout.",
  },
  {
    icon: RefreshCw,
    title: "60-Day Returns",
    description: "Changed your mind? Return any unworn item within 60 days for a full refund, no questions asked.",
  },
  {
    icon: Shield,
    title: "Lifetime Guarantee",
    description: "Every product is backed by our lifetime craftsmanship guarantee. We stand behind what we make.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description: "All materials are traceable to certified suppliers. We publish our full supply chain annually.",
  },
];

const collections = [
  {
    id: "c1",
    title: "The Work Edit",
    subtitle: "Refined pieces for the modern professional",
    image: "https://www.happi.com/wp-content/uploads/2024/04/710_main-28.jpg",
    count: 24,
  },
  {
    id: "c2",
    title: "Home & Living",
    subtitle: "Objects that make everyday rituals feel special",
    image: "https://editthework.com/wp-content/uploads/2015/07/edit-01.png",
    count: 18,
  },
  {
    id: "c3",
    title: "Weekend Essentials",
    subtitle: "Relaxed, versatile pieces built to last",
    image: "https://media.designcafe.com/wp-content/uploads/2020/12/21184029/living-room-furniture-decor-ideas.jpg",
    count: 31,
  },
];

// ─── Sub-components (inline) ─────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.round(rating);
          return (
            <Star
              key={i}
              className={filled ? "w-3.5 h-3.5 fill-[#e63946] text-[#e63946]" : "w-3.5 h-3.5 fill-transparent text-[#d1d5db]"}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      <span className="text-xs text-[#777777]">({count})</span>
    </div>
  );
}

type Product = typeof products[0];

function ProductCard({ product }: { product: Product; index: number }) {
  const [wished, setWished] = useState(false);

  const badgeClass =
    product.badge === "Sale"
      ? "absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#e63946] text-white"
      : product.badge === "New"
      ? "absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#111111] text-white"
      : "absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-[#111111] border border-black/10";

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] flex flex-col"
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-[#f5f4f2]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className={badgeClass}>
            {product.badge}
          </span>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-black/5 transition-colors duration-200"
        >
          <Heart
            className={wished ? "w-4 h-4 fill-[#e63946] text-[#e63946]" : "w-4 h-4 text-[#555555]"}
            strokeWidth={1.75}
          />
        </motion.button>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <StarRating rating={product.rating} count={product.reviewCount} />
        <h3 className="font-semibold text-[#111111] text-sm leading-snug tracking-tight">
          {product.name}
        </h3>
        <p className="text-xs text-[#777777] leading-relaxed flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#111111]">
              {"$"}{product.price}
            </span>
            {product.originalPrice != null && (
              <span className="text-xs text-[#aaaaaa] line-through">
                {"$"}{product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-[#111111] hover:bg-[#e63946] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={2} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "new" | "sale" | "popular">("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filters: { label: string; value: "all" | "new" | "sale" | "popular" }[] = [
    { label: "All", value: "all" },
    { label: "New Arrivals", value: "new" },
    { label: "On Sale", value: "sale" },
    { label: "Popular", value: "popular" },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim().length > 0) {
      setSubscribed(true);
    }
  }

  return (
    <main className="bg-[#fafaf8] overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center pt-16">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(230,57,70,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(17,17,17,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#e63946] bg-[#e63946]/8 px-3 py-1.5 rounded-full border border-[#e63946]/15">
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                  Summer Collection 2025
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] leading-[1.05] text-balance"
              >
                Crafted for
                <br />
                <span className="text-[#e63946]">everyday</span>
                <br />
                excellence.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-[#666666] leading-relaxed max-w-md text-pretty"
              >
                Premium Essentials for Modern Living. Each piece is designed to last, sourced responsibly, and priced fairly.
                <br />
                <span className="text-sm text-[#999999] mt-1 block">Rao Ali</span>
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
                <motion.a
                  href="#products"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-[#e63946] hover:bg-[#c1121f] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 shadow-[0_4px_14px_rgba(230,57,70,0.35)]"
                >
                  Shop the Collection
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </motion.a>
                <motion.a
                  href="#collections"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#f5f4f2] text-[#111111] font-semibold px-6 py-3 rounded-full border border-black/10 transition-colors duration-200"
                >
                  Browse Collections
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap items-center gap-4 pt-4 border-t border-black/8"
              >
                {["Free shipping over $75", "60-day returns", "Lifetime guarantee"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-xs text-[#777777]">
                    <Check className="w-3.5 h-3.5 text-[#e63946]" strokeWidth={2.5} />
                    {badge}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: hero image grid */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative grid grid-cols-2 gap-3 lg:gap-4"
            >
              <div className="flex flex-col gap-3 lg:gap-4 mt-8">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                  <img
                    src="https://picsum.photos/seed/5481ee9847b1/800/600"
                    alt="Merino Wool Crewneck"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                  <img
                    src="https://picsum.photos/seed/5481ee9847b1/800/600"
                    alt="Leather Card Wallet"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:gap-4">
                <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                  <img
                    src="https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg"
                    alt="Ceramic Pour-Over Set"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                  <img
                    src="https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg"
                    alt="Canvas Tote Bag"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-black/5 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-[#e63946]/10 flex items-center justify-center">
                  <Star className="w-4 h-4 fill-[#e63946] text-[#e63946]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#111111]">4.9 / 5.0</p>
                  <p className="text-[11px] text-[#888888]">1,200+ reviews</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-[#111111] py-14 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {valueProps.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e63946]/15 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#e63946]" strokeWidth={1.75} />
              </div>
              <h3 className="text-sm font-semibold text-white leading-snug">{title}</h3>
              <p className="text-xs text-[#888888] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div className="flex flex-col gap-3">
              <motion.span
                variants={fadeInUp}
                className="text-xs font-semibold uppercase tracking-widest text-[#e63946]"
              >
                Featured Products
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111] text-balance"
              >
                Thoughtfully made,
                <br />
                built to last.
              </motion.h2>
            </div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <motion.button
                  key={f.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveFilter(f.value)}
                  className={
                    activeFilter === f.value
                      ? "text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 bg-[#111111] text-white border-[#111111]"
                      : "text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 bg-white text-[#555555] border-black/10 hover:border-black/20"
                  }
                >
                  {f.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-black/15 hover:border-[#e63946] hover:text-[#e63946] text-[#333333] font-semibold px-8 py-3 rounded-full transition-all duration-200"
            >
              View All Products
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-24 md:py-32 bg-[#f5f4f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-3 mb-12"
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold uppercase tracking-widest text-[#e63946]"
            >
              Curated Collections
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111] text-balance"
            >
              Shop by lifestyle.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={i === 0 ? "group relative overflow-hidden rounded-2xl cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.10)]" : "group relative overflow-hidden rounded-2xl cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.10)]"}
                style={{ aspectRatio: i === 1 ? "4/5" : "4/3" }}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                    {col.count} pieces
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">{col.title}</h3>
                  <p className="text-sm text-white/70 leading-snug">{col.subtitle}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#e63946] mt-2">
                    Explore <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                <img
                  src="https://vangogh.atelier-lumieres.com/_astro/experience11_avcmj6_iuR3D.webp"
                  alt="Lumiere atelier"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 24, y: 24 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-6 -right-6 bg-[#e63946] text-white rounded-2xl px-6 py-5 shadow-[0_8px_32px_rgba(230,57,70,0.35)]"
              >
                <p className="text-3xl font-bold">12+</p>
                <p className="text-sm font-medium text-white/80 mt-0.5">Years of craft</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.span
                variants={fadeInUp}
                className="text-xs font-semibold uppercase tracking-widest text-[#e63946]"
              >
                Our Story
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111] text-balance"
              >
                Made with intention. Worn with pride.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[#666666] leading-relaxed text-pretty"
              >
                {APP_NAME} was founded in 2013 with a single conviction: that the objects we use every day should be beautiful, durable, and made without compromise. We work directly with a small network of family-run workshops across Portugal, Japan, and Scandinavia.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-[#666666] leading-relaxed text-pretty"
              >
                Every material is chosen for longevity. Every design is refined over months before it reaches you. We keep our range deliberately small so we can obsess over every detail.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-6 pt-4 border-t border-black/8"
              >
                {[
                  { stat: "48", unit: "products", label: "in our range" },
                  { stat: "12", unit: "workshops", label: "global partners" },
                  { stat: "98%", unit: "satisfaction", label: "from 1,200+ reviews" },
                ].map(({ stat, unit, label }) => (
                  <div key={unit} className="flex flex-col gap-0.5">
                    <span className="text-2xl font-bold text-[#111111]">{stat}</span>
                    <span className="text-xs font-semibold text-[#e63946]">{unit}</span>
                    <span className="text-xs text-[#888888]">{label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.a
                variants={fadeInUp}
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="self-start inline-flex items-center gap-2 bg-[#111111] hover:bg-[#e63946] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-3 mb-14 text-center items-center"
          >
            <motion.span
              variants={fadeInUp}
              className="text-xs font-semibold uppercase tracking-widest text-[#e63946]"
            >
              Customer Stories
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white text-balance max-w-xl"
            >
              Loved by people who care about quality.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#e63946] text-[#e63946]"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="text-[#cccccc] text-sm leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-[#333333] flex-shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-[#777777]">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#111111] rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(230,57,70,0.15) 0%, transparent 70%)",
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col gap-5"
              >
                <motion.span
                  variants={fadeInUp}
                  className="text-xs font-semibold uppercase tracking-widest text-[#e63946]"
                >
                  Stay in the loop
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-bold tracking-tight text-white text-balance"
                >
                  New arrivals, first.
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="text-[#888888] leading-relaxed text-pretty"
                >
                  Join 14,000 subscribers who get early access to new collections, exclusive offers, and behind-the-scenes stories from our workshops.
                </motion.p>
                <motion.ul variants={fadeInUp} className="flex flex-col gap-2">
                  {[
                    "Early access to new collections",
                    "Members-only sale previews",
                    "No spam, unsubscribe anytime",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#aaaaaa]">
                      <Check className="w-4 h-4 text-[#e63946] flex-shrink-0" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                variants={slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#e63946]/15 flex items-center justify-center">
                      <Check className="w-7 h-7 text-[#e63946]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-bold text-white">You&apos;re on the list.</h3>
                    <p className="text-sm text-[#888888]">
                      Welcome to the {APP_NAME} community. Watch your inbox for something special.
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#555555] focus:outline-none focus:border-[#e63946]/50 focus:ring-2 focus:ring-[#e63946]/20 transition-all duration-200"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#e63946] hover:bg-[#c1121f] text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-[0_4px_14px_rgba(230,57,70,0.35)]"
                    >
                      Subscribe for free
                    </motion.button>
                    <p className="text-[11px] text-[#555555] text-center">
                      By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
