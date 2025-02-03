const Footer = () => {
  return (
    <footer className="bg-reginify-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-reginify-gold text-lg font-bold mb-4">Regenefi</h3>
            <p className="text-gray-300">
              Transform your hair with our premium hair oil, crafted with the finest natural ingredients.
            </p>
          </div>
          
          <div>
            <h3 className="text-reginify-gold text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/product" className="text-gray-300 hover:text-reginify-gold">Our Product</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-reginify-gold">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-reginify-gold">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-reginify-gold">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-reginify-gold text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@reginify.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Beauty Lane, Style City</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Regenefi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
