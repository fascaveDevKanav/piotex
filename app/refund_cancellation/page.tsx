import Head from 'next/head';

export default function RefundCancellation() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Refund & Cancellation - RWear</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Refund & Cancellation Policy</h1>
        
        <div className="space-y-6 text-gray-700">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Return Policy</h2>
            <p className="leading-relaxed mb-4">
              We accept returns within 30 days of purchase. Items must be in original condition 
              with tags attached and in original packaging.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Items must be unworn, unwashed, and undamaged</li>
              <li>Original tags must be attached</li>
              <li>Return shipping costs are the responsibility of the customer</li>
              <li>Sale items are final and cannot be returned</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Refund Process</h2>
            <div className="space-y-3">
              <p>Once we receive your return, we will inspect it and notify you of the approval or rejection of your refund.</p>
              <p>If approved, your refund will be processed within 7-10 business days to your original payment method.</p>
              <p className="font-semibold">Refunds will not be provided for:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Items damaged due to customer misuse</li>
                <li>Items returned after 30 days</li>
                <li>Personalized or custom-made items</li>
                <li>Sale and clearance items</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Cancellation</h2>
            <p className="leading-relaxed mb-4">
              You may cancel your order within 24 hours of placement without any charges. 
              After 24 hours, orders that have entered the processing stage cannot be cancelled.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm">
                <strong>Note:</strong> For orders cancelled after shipping, standard return policy applies.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Exchange Policy</h2>
            <p className="leading-relaxed">
              We are happy to exchange items for a different size or color, subject to availability. 
              Exchanges must be requested within 30 days of purchase and follow the same condition requirements as returns.
            </p>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              For return requests, please contact us at returns@addler.com with your order number.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}