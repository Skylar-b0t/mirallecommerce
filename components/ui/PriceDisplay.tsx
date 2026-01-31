interface PriceDisplayProps {
    price: number;
    originalPrice?: number;
    currency?: string;
    className?: string;
}

export default function PriceDisplay({
    price,
    originalPrice,
    currency = 'KSh',
    className = '',
}: PriceDisplayProps) {
    const formatPrice = (amount: number) => {
        return amount.toLocaleString('en-KE');
    };

    return (
        <div className={`flex items-baseline gap-2 ${className}`}>
            <span className="price-primary">
                <span className="ksh">{currency}</span> {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
                <span className="price-muted">
                    <span className="ksh">{currency}</span> {formatPrice(originalPrice)}
                </span>
            )}
        </div>
    );
}
