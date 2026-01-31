import { Shield, Truck, CheckCircle, Phone } from 'lucide-react';

interface TrustBadgeProps {
    icon: 'shield' | 'truck' | 'check' | 'phone';
    text: string;
    className?: string;
}

const iconMap = {
    shield: Shield,
    truck: Truck,
    check: CheckCircle,
    phone: Phone,
};

export default function TrustBadge({ icon, text, className = '' }: TrustBadgeProps) {
    const Icon = iconMap[icon];

    return (
        <div className={`trust-badge ${className}`}>
            <Icon className="w-4 h-4" />
            <span>{text}</span>
        </div>
    );
}
