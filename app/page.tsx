import Link from 'next/link';
import { ArrowRight, Cpu, Smartphone, Camera, Headphones, Watch, Laptop } from 'lucide-react';
import dbConnect from '@/lib/db/mongodb';
import Product, { IProduct } from '@/models/Product';
import Image from 'next/image';

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
      description: 'Professional workstations',
      count: '120+ models',
      href: '/products?category=Laptops',
    },
    {
      icon: Smartphone,
      title: 'Smartphones',
      description: 'Latest flagship devices',
      count: '85+ models',
      href: '/products?category=Smartphones',
    },
    {
      icon: Headphones,
      title: 'Audio',
      description: 'Premium sound systems',
      count: '60+ products',
      href: '/products?category=Audio',
    },
    {
      icon: Camera,
      title: 'Cameras',
      description: 'Professional imaging',
      count: '45+ models',
      href: '/products?category=Cameras',
    },
    {
      icon: Watch,
      title: 'Wearables',
      description: 'Smart accessories',
      count: '30+ devices',
      href: '/products?category=Wearables',
    },
    {
      icon: Cpu,
      title: 'Components',
      description: 'Build your system',
      count: '200+ parts',
      href: '/products?category=Accessories',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)]">
        <div className="container-premium py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-light)] border border-white/10 rounded-full">
                <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
                <span className="text-sm text-[var(--color-neutral-300)]">
                  New arrivals • Free shipping on orders $100+
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Premium Electronics
                <br />
                <span className="text-gradient-accent">Built to Last</span>
              </h1>

              <p className="text-lg text-[var(--color-neutral-400)] leading-relaxed max-w-xl">
                Discover carefully curated electronics from leading brands.
                Authorized reseller with expert support and 30-day returns.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
                  Why Mirall
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-[var(--color-neutral-50)]">500+</div>
                  <div className="text-sm text-[var(--color-neutral-500)]">Premium Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--color-neutral-50)]">50K+</div>
                  <div className="text-sm text-[var(--color-neutral-500)]">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--color-neutral-50)]">98%</div>
                  <div className="text-sm text-[var(--color-neutral-500)]">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative lg:h-[600px] animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent rounded-3xl blur-3xl" />
              <div className="relative surface-elevated-hover rounded-2xl p-8 lg:p-12 h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[var(--color-accent)] to-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-[0_20px_60px_rgba(37,99,235,0.3)]">
                    <Laptop className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--color-neutral-50)]">
                    Framework Laptop 16
                  </h3>
                  <p className="text-[var(--color-neutral-400)]">
                    Modular. Repairable. Upgradeable.
                  </p>
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <span className="badge badge-success">In Stock</span>
                    <span className="badge badge-neutral">Energy Star</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 lg:py-32">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-[var(--color-neutral-400)] max-w-2xl mx-auto">
              Explore our carefully curated selection of premium electronics
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.title}
                href={category.href}
                className="surface-elevated-hover rounded-2xl p-8 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-primary-light)] border border-white/10 flex items-center justify-center group-hover:border-[var(--color-accent)]/30 transition-all">
                    <category.icon className="w-7 h-7 text-[var(--color-accent)]" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--color-neutral-500)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-xl font-semibold text-[var(--color-neutral-50)] mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-[var(--color-neutral-400)] mb-4">
                  {category.description}
                </p>
                <div className="text-xs text-[var(--color-neutral-500)] font-medium">
                  {category.count}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 lg:py-32 bg-[var(--color-surface)]">
        <div className="container-premium">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Trending Now
              </h2>
              <p className="text-lg text-[var(--color-neutral-400)]">
                Most popular products this month
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-[var(--color-accent)] hover:gap-3 transition-all"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trending Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {trendingProducts.map((product: any, index: number) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="surface-elevated-hover rounded-2xl p-4 group flex flex-col h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square bg-white rounded-xl mb-4 relative overflow-hidden flex items-center justify-center p-4">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <Laptop className="w-16 h-16 text-[var(--color-neutral-600)]" />
                  )}
                  {product.stock <= 0 && (
                    <div className="absolute top-2 right-2 badge badge-neutral text-xs font-bold">
                      Out of Stock
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="text-xs text-[var(--color-accent)] font-medium mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-neutral-50)] mb-1 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-[var(--color-neutral-50)]">
                      Ksh {product.price.toLocaleString()}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
                      <ArrowRight className="w-4 h-4 text-[var(--color-neutral-50)]" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link
              href="/products"
              className="btn-primary inline-flex items-center gap-2"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container-premium">
          <div className="surface-elevated rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Ready to upgrade your tech?
              </h2>
              <p className="text-lg text-[var(--color-neutral-400)]">
                Join thousands of satisfied customers who trust Mirall Technology for their electronics needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
