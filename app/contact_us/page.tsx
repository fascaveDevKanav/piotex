

export default function ContactUs() {
    return <>
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-6">

                <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
                <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded"></div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get in Touch</h2>
                <p className="text-gray-600 mb-8 text-center">
                    We'd love to hear from you! Whether you have a question about our products, need assistance
                    with an order, or just want to share feedback, our team is here to help.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-pink-100 p-4 rounded-lg flex-shrink-0">
                            <span className="text-3xl">📧</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Email</h3>
                            <p className="text-gray-600">support@ladieswear.com</p>
                            <p className="text-gray-600">sales@ladieswear.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-pink-100 p-4 rounded-lg flex-shrink-0">
                            <span className="text-3xl">📞</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Phone</h3>
                            <p className="text-gray-600">9226541726 </p>
                            <p className="text-gray-600">56395544</p>
                            <p className="text-gray-500 text-sm mt-1">Mon-Sat: 10 AM - 7 PM</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-pink-100 p-4 rounded-lg flex-shrink-0">
                            <span className="text-3xl">📍</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Address</h3>
                            <p className="text-gray-600">
                                Pune Office (Head Office) <br />
                                F-II Block, Plot No. 16/2, Pimpri,  <br />
                                Pune 411018, Maharashtra, <br />
                                India.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-pink-100 p-4 rounded-lg flex-shrink-0">
                            <span className="text-3xl">⏰</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg mb-2">Business Hours</h3>
                            <p className="text-gray-600">Monday - Saturday</p>
                            <p className="text-gray-600">10:00 AM - 7:00 PM</p>
                            <p className="text-gray-500 text-sm mt-1">Sunday: Closed</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
}