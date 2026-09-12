'use client';

import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react'; 

interface IPaymentRecord {
  _id: string;
  itemId: string;
  title: string;
  amount: number;
  transactionId: string;
  paymentType: string;
  status: string;
  badge: string;
  createdAt: string;
}

const FundingPage = () => {
  const [payments, setPayments] = useState<IPaymentRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  const user = session?.user;
   
  const userEmail = user?.email;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/my-payments?email=${userEmail}`); 
        const result = await response.json();
        
        if (result.success) {
          setPayments(result.data);
        } else {
          setError('Failed to load funding data.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchPayments();
    }
  }, [userEmail]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg font-medium text-gray-600 animate-pulse">Loading your funding history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Funding & Contribution History</h1>
        <p className="text-gray-600 mt-1">Track all the environmental initiatives you have supported and your earned contributor badges.</p>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">You haven't funded any initiatives yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <div 
              key={payment._id} 
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full">
                    {payment.paymentType}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(payment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {payment.title}
                </h3>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-extrabold text-emerald-600">${payment.amount}</span>
                  <span className="text-xs text-gray-500">USD Contributed</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Earned Badge</p>
                  <span className="inline-block mt-0.5 px-2.5 py-1 text-xs font-bold bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                    🏆 {payment.badge}
                  </span>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${
                  payment.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-850'
                }`}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FundingPage;