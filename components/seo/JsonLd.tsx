'use client';

export default function JsonLd() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Store',
        name: 'Mirall Technology',
        description: 'Premium electronics store in Nairobi, Kenya offering laptops, smartphones, audio equipment, and cameras',
        url: 'https://mirall.vercel.app',
        logo: 'https://mirall.vercel.app/icon.png',
        image: 'https://mirall.vercel.app/og-image.png',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nairobi',
            addressCountry: 'KE',
        },
        priceRange: 'KES',
        paymentAccepted: ['M-Pesa', 'Credit Card'],
        currenciesAccepted: 'KES',
        openingHours: 'Mo-Sa 09:00-18:00',
        telephone: '+254-XXX-XXXXXX',
        email: 'support@mirall.com',
        sameAs: [
            'https://facebook.com/miralltechnology',
            'https://twitter.com/miralltechnology',
            'https://instagram.com/miralltechnology',
        ],
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://mirall.vercel.app/products?search={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
