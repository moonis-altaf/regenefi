import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const product = {
  name: 'Hair Growth Oil',
  price: 49.99,
  rating: 4.8,
  reviews: 128,
  sizes: [
    { name: '30ml', inStock: true },
    { name: '50ml', inStock: true },
    { name: '100ml', inStock: false },
  ],
  subscription: [
    { interval: 'One-time purchase', discount: 0 },
    { interval: 'Subscribe monthly (Save 15%)', discount: 15 },
    { interval: 'Subscribe every 2 months (Save 10%)', discount: 10 },
  ],
  images: [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80',
      alt: 'Hair Growth Oil bottle front view',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80',
      alt: 'Hair Growth Oil ingredients',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?auto=format&fit=crop&q=80',
      alt: 'Hair Growth Oil in use',
    },
  ],
  features: [
    'Natural and organic ingredients',
    'Scientifically proven formula',
    'Suitable for all hair types',
    'Cruelty-free and vegan',
    'Made in USA',
  ],
  ingredients: [
    'Organic Argan Oil',
    'Jojoba Oil',
    'Coconut Oil',
    'Vitamin E',
    'Rosemary Essential Oil',
    'Lavender Essential Oil',
  ],
}

const Shop = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedSubscription, setSelectedSubscription] = useState(product.subscription[0])
  const [mainImage, setMainImage] = useState(product.images[0])
  const [quantity, setQuantity] = useState(1)

  const discountedPrice = (price, discount) => {
    return (price * (100 - discount)) / 100
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-reginify-navy/60 hover:text-reginify-navy">
              Home
            </Link>
          </li>
          <li>
            <span className="text-reginify-navy/60">/</span>
          </li>
          <li>
            <span className="text-reginify-navy">Hair Growth Oil</span>
          </li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16">
          {/* Product Images */}
          <div className="mb-12 lg:mb-0">
            {/* Main Image */}
            <div className="aspect-h-1 aspect-w-1 mb-6">
              <img
                src={mainImage.src}
                alt={mainImage.alt}
                className="w-full h-[600px] object-cover rounded-2xl"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setMainImage(image)}
                  className={`relative aspect-h-1 aspect-w-1 rounded-lg overflow-hidden
                            ${mainImage.id === image.id ? 'ring-2 ring-reginify-gold' : ''}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-32 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-light text-reginify-navy mb-4 tracking-wider">
                {product.name}
              </h1>

              {/* Reviews */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        product.rating > rating ? 'text-reginify-gold' : 'text-reginify-gold/20'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm text-reginify-navy/70">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline mb-8">
                <span className="text-3xl font-light text-reginify-navy tracking-wider">
                  ${discountedPrice(product.price, selectedSubscription.discount).toFixed(2)}
                </span>
                {selectedSubscription.discount > 0 && (
                  <span className="ml-4 text-lg text-reginify-navy/50 line-through">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Subscription Options */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-reginify-navy mb-4">Purchase Options</h3>
                <div className="space-y-3">
                  {product.subscription.map((option) => (
                    <label
                      key={option.interval}
                      className={`relative block cursor-pointer rounded-lg border p-4
                                ${
                                  selectedSubscription.interval === option.interval
                                    ? 'border-reginify-gold bg-reginify-gold/5'
                                    : 'border-gray-200'
                                }`}
                    >
                      <input
                        type="radio"
                        name="subscription"
                        value={option.interval}
                        className="sr-only"
                        checked={selectedSubscription.interval === option.interval}
                        onChange={() => setSelectedSubscription(option)}
                      />
                      <span className="flex items-center">
                        <span className="flex flex-col">
                          <span className="text-sm font-medium text-reginify-navy">
                            {option.interval}
                          </span>
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-reginify-navy mb-4">Select Size</h3>
                <div className="grid grid-cols-3 gap-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      disabled={!size.inStock}
                      className={`py-3 px-4 text-sm font-medium rounded-lg
                                ${
                                  selectedSize.name === size.name
                                    ? 'bg-reginify-gold text-white'
                                    : size.inStock
                                    ? 'bg-reginify-gold/10 text-reginify-navy hover:bg-reginify-gold/20'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-reginify-navy mb-4">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-reginify-gold/10 text-reginify-navy
                             flex items-center justify-center hover:bg-reginify-gold/20"
                  >
                    -
                  </button>
                  <span className="text-reginify-navy font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-reginify-gold/10 text-reginify-navy
                             flex items-center justify-center hover:bg-reginify-gold/20"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart and Wishlist */}
              <div className="flex space-x-4 mb-12">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center space-x-2 px-8 py-4
                           bg-reginify-gold text-white rounded-lg hover:bg-reginify-gold/90
                           transition-colors duration-300"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  type="button"
                  className="w-14 h-14 flex items-center justify-center rounded-lg
                           border border-reginify-gold/20 text-reginify-gold
                           hover:bg-reginify-gold/10 transition-colors duration-300"
                >
                  <HeartIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Product Features */}
              <div className="border-t border-gray-200 pt-8 mb-8">
                <h3 className="text-lg font-medium text-reginify-navy mb-4">Key Features</h3>
                <ul className="list-disc pl-5 space-y-2 text-reginify-navy/70">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-reginify-navy mb-4">Ingredients</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.ingredients.map((ingredient) => (
                    <div
                      key={ingredient}
                      className="flex items-center space-x-2 text-reginify-navy/70"
                    >
                      <svg
                        className="h-4 w-4 text-reginify-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-24">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-reginify-gold text-reginify-gold whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                How to Use
              </button>
              <button className="border-transparent text-reginify-navy/60 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Benefits
              </button>
              <button className="border-transparent text-reginify-navy/60 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Reviews
              </button>
              <button className="border-transparent text-reginify-navy/60 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                FAQs
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-12">
            <div className="max-w-3xl">
              <h3 className="text-lg font-medium text-reginify-navy mb-6">How to Use</h3>
              <div className="prose prose-reginify">
                <ol className="list-decimal space-y-4 text-reginify-navy/70">
                  <li>
                    Start with clean, towel-dried hair. Your hair should be damp but not wet.
                  </li>
                  <li>
                    Take 4-5 drops of the oil into your palm and warm it by rubbing your hands
                    together.
                  </li>
                  <li>
                    Gently massage the oil into your scalp using circular motions. Pay special
                    attention to areas of concern.
                  </li>
                  <li>
                    Work any remaining oil through the lengths of your hair, focusing on the ends.
                  </li>
                  <li>
                    For best results, leave the oil in overnight or for at least 30 minutes before
                    washing.
                  </li>
                  <li>
                    Use 2-3 times per week for optimal results.
                  </li>
                </ol>

                <div className="mt-8">
                  <p className="text-reginify-navy/70">
                    <strong className="text-reginify-navy">Pro Tip:</strong> For an intensive
                    treatment, apply a generous amount to dry hair, cover with a shower cap, and
                    leave overnight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
