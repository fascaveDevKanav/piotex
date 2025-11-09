import Head from 'next/head';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>About Us - Addler</title>
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">About Addler</h1>

        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to Addler, your premier destination for contemporary women's fashion. 
            We are passionate about bringing you the latest trends in ethnic and modern wear.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Our Story</h2>
            <p className="leading-relaxed">
              Founded with a vision to revolutionize women's fashion, Addler has been at the 
              forefront of style innovation. We carefully curate our collections to ensure 
              every piece reflects elegance, comfort, and contemporary design.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Our Collections</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Lehanga - Traditional elegance with modern twists</li>
              <li>Chaniya Choli - Vibrant and authentic designs</li>
              <li>Sarees - Timeless beauty reimagined</li>
              <li>Office Wear - Professional and sophisticated</li>
              <li>Kurtis - Comfortable and stylish everyday wear</li>
            </ul>
          </div>


        </div>
      </main>
    </div>
  );
}