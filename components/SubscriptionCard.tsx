import { ExternalLink, Calendar, DollarSign } from 'lucide-react';

interface Subscription {
  name: string;
  price: string;
  period: 'monthly' | 'yearly' | 'unknown';
  cancelLink: string | null;
}

export default function SubscriptionCard({ sub }: { sub: Subscription }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-col">
        <h3 className="font-bold text-xl text-gray-900">{sub.name}</h3>
        <div className="flex items-center text-gray-500 mt-2 space-x-4">
          <span className="flex items-center gap-1 text-sm">
            <DollarSign size={16} />
            {sub.price}
          </span>
          <span className="flex items-center gap-1 text-sm capitalize">
            <Calendar size={16} />
            {sub.period}
          </span>
        </div>
      </div>
      
      {sub.cancelLink ? (
        <a 
          href={sub.cancelLink} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors w-full sm:w-auto justify-center"
        >
          Cancel Subscription
          <ExternalLink size={16} />
        </a>
      ) : (
        <span className="text-gray-400 text-sm italic">No cancel link found</span>
      )}
    </div>
  );
}
