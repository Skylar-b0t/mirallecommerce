import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Cpu, Smartphone, Camera, Headphones, Watch, Laptop, Zap, Shield, Truck, User } from 'lucide-react';
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
            <div className="relative animate-slide-in-right lg:block mb-12 lg:mb-0">
              <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 group max-w-lg mx-auto lg:max-w-none">
                {/* Decorative background for the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent z-0" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-full aspect-[16/10] bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl mb-6 lg:mb-8 flex items-center justify-center overflow-hidden inner-shadow relative">
                    <Image
                      src="/images/macbook-pro-m3.png"
                      alt="MacBook Pro M3"
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground">MacBook Pro M3</h3>
                    <p className="text-sm lg:text-base text-neutral-500">Mind-blowing. Head-turning.</p>
                    <p className="font-bold text-lg lg:text-xl text-primary mt-2">Ksh 250,000</p>
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

      {/* Premium Spotlight Section */}
      <section className="py-20 overflow-hidden">
        <div className="container-custom">
          <div className="relative rounded-[2.5rem] bg-neutral-900 border border-white/5 overflow-hidden shadow-2xl">
            {/* Background Image/Aesthetic */}
            <div className="absolute inset-0 z-0 opacity-40">
              <Image
                src="/images/spotlight-headphones.png"
                alt="Spotlight Background"
                fill
                className="object-cover blur-3xl scale-110"
                sizes="100vw"
              />
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 items-center">
              {/* Content */}
              <div className="p-8 lg:p-16 space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase">
                  Premium Spotlight
                </div>
                <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Unmatched Sound. <br />
                  <span className="text-accent">Pure Silence.</span>
                </h2>
                <p className="text-neutral-400 text-lg max-w-md mx-auto lg:mx-0">
                  Discover the next evolution of wireless audio. Experience studio-quality sound with adaptive noise cancellation that tailors itself to your surroundings.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link href="/products" className="btn-accent px-8">
                    Explore Obsidian Series
                  </Link>
                  <div className="flex items-center gap-4 pl-4 border-l border-white/10 hidden sm:flex">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center overflow-hidden">
                          <User className="w-5 h-5 text-neutral-500" />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-neutral-400">
                      <span className="text-white font-bold">12k+</span> Happy Listeners
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] order-1 lg:order-2 p-8 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full max-w-[500px] aspect-square animate-float group/image">
                  <Image
                    src="/images/spotlight-headphones.png"
                    alt="Obsidian Wireless Headphones"
                    fill
                    className="object-contain transform transition-transform duration-700 group-hover/image:scale-110 drop-shadow-[0_20px_50px_rgba(251,191,36,0.3)]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Floating Tech Labels */}
                  <div className="absolute top-1/4 -right-4 lg:-right-8 animate-bounce delay-700">
                    <div className="glass-panel py-2 px-4 rounded-xl border border-white/10 shadow-xl backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-xs font-bold text-white">40h Battery</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-1/4 -left-4 lg:-left-8 animate-bounce delay-300">
                    <div className="glass-panel py-2 px-4 rounded-xl border border-white/10 shadow-xl backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold text-white">Lossless Audio</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
