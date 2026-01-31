export default function PrivacyPage() {
    return (
        <div className="min-h-screen py-24">
            <div className="container-premium max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="surface-elevated rounded-2xl p-8 border border-white/10 space-y-6 text-[var(--color-neutral-300)]">
                    <p className="text-sm text-[var(--color-neutral-500)]">Last updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        At Mirall Technology, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from mirallecommerce.com.
                    </p>

                    <h2 className="text-xl font-bold text-[var(--color-neutral-100)] pt-4">Personal Information We Collect</h2>
                    <p>
                        When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                    </p>
                    <p>
                        Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.
                    </p>

                    <h2 className="text-xl font-bold text-[var(--color-neutral-100)] pt-4">How We Use Your Information</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>To fulfill orders placed through the Site (processing payment, shipping, invoices).</li>
                        <li>To communicate with you (Order updates, support).</li>
                        <li>To screen our orders for potential risk or fraud.</li>
                        <li>To provide you with information or advertising relating to our products or services (if opted in).</li>
                    </ul>

                    <h2 className="text-xl font-bold text-[var(--color-neutral-100)] pt-4">Data Security</h2>
                    <p>
                        We use industry-standard encryption and security measures to protect your personal information. Payment information is processed securely by our payment partners (M-Pesa/Stripe) and is not stored on our servers.
                    </p>

                    <h2 className="text-xl font-bold text-[var(--color-neutral-100)] pt-4">Contact Us</h2>
                    <p>
                        For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:hello@mirallecommerce.com" className="text-[var(--color-accent)] hover:underline">hello@mirallecommerce.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
