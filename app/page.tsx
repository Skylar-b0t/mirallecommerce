import Link from 'next/link';
import { ArrowRight, Cpu, Smartphone, Camera, Headphones, Watch, Laptop, Zap, Shield, Truck } from 'lucide-react';
import dbConnect from '@/lib/db/mongodb';
import Product from '@/models/Product';
import ProductCard from '@/components/products/ProductCard';

export default async function HomePage() {
  await dbConnect();
  const trendingProducts = await Product.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  const featuredCategories = [
    {
      icon: Laptop,
      title: 'Laptops',
      description: 'Power & Portability',
      count: '120+',
      href: '/products?category=Laptops',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Smartphone,
      title: 'Smartphones',
      description: 'Flagship Devices',
      count: '85+',
      href: '/products?category=Smartphones',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      icon: Headphones,
      title: 'Audio',
      description: 'Immersive Sound',
      count: '60+',
      href: '/products?category=Audio',
      color: 'text-pink-500',
      bg: 'bg-pink-500/10'
    },
    {
      icon: Camera,
      title: 'Cameras',
      description: 'Capture Moments',
      count: '45+',
      href: '/products?category=Cameras',
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      icon: Watch,
      title: 'Wearables',
      description: 'Stay Connected',
      count: '30+',
      href: '/products?category=Wearables',
      color: 'text-teal-500',
      bg: 'bg-teal-500/10'
    },
    {
      icon: Cpu,
      title: 'Components',
      description: 'Upgrade Your Rig',
      count: '200+',
      href: '/products?category=Accessories',
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
        {/* Simple Background */}
        <div className="absolute inset-0 bg-background z-0" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-neutral-200 dark:border-white/10 rounded-full shadow-sm mx-auto lg:mx-0">
                <span className="w-2 h-2 bg-secondary rounded-full animate-ping" />
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  New Series 7 Available Now
                </span>
              </div>

              <h1 className="leading-tight">
                <span className="block text-neutral-900 dark:text-neutral-100">Future Tech,</span>
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Delivered Today.
                </span>
              </h1>

              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience the next generation of premium electronics.
                Curated for performance, designed for you.
                Authorized reseller for Apple, Samsung, Sony, and more.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link href="/products" className="btn-accent flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/about" className="btn-secondary">
                  Learn More
                </Link>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" /> 2-Year Warranty
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Free Shipping
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" /> Same-Day Delivery
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="relative animate-slide-in-right hidden lg:block">
              <div className="glass-panel rounded-3xl p-8 relative overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 group">
                {/* Decorative background for the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent z-0" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-full aspect-[16/10] bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl mb-8 flex items-center justify-center overflow-hidden inner-shadow">
                    <Laptop className="w-48 h-48 text-primary opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">MacBook Pro M3</h3>
                    <p className="text-neutral-500">Mind-blowing. Head-turning.</p>
                    <p className="font-bold text-xl text-primary mt-2">Ksh 250,000</p>
                  </div>
                </div>
              </div>

              {/* Floaties */}
              <div className="absolute -top-6 -right-6 glass-panel p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">Performance</p>
                    <p className="text-sm font-bold text-foreground">+40% Faster</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-surface/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">Browse Categories</h2>
            <Link href="/products" className="text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((cat, i) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="glass-panel p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 group flex flex-col items-center text-center gap-4 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-full ${cat.bg} flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{cat.title}</h3>
                  <p className="text-xs text-neutral-500 mt-1">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">Trending Now</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              The hottest tech that everyone is talking about. Grab them before they're gone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {trendingProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/products" className="btn-secondary inline-flex items-center gap-2">
              Load More Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 bg-primary/5 dark:bg-primary/5 border-t border-primary/10">
        <div className="container-custom">
          <div className="glass-panel rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="text-3xl font-bold text-foreground">Stay Ahead of the Curve</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Subscribe to our newsletter for exclusive deals, new arrivals, and tech news.
              </p>

              <form className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-neutral-500">We respect your privacy. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
