# Fresh Harvest Market

Build a complete, production-quality Farmers Marketplace E-commerce application as a responsive web application for both mobile and desktop.

Use React + Vite + JavaScript only (NO TypeScript), the latest/current Tailwind CSS, shadcn/ui, React Router, and React Context API for state management. Do not use Redux unless absolutely necessary. There must be no login, signup, authentication, or payment gateway. Users should be able to open the website directly and start shopping.

The application should have a modern, premium farmers/agriculture marketplace design using natural greens, earth tones, clean typography, attractive product imagery, rounded cards, subtle shadows, good spacing, smooth interactions, and a mobile-first responsive layout. It must work properly on mobile phones, tablets, laptops, desktops, and large screens without horizontal overflow or broken layouts.

Backend API

Use this API base URL:

https://vaaradhi-dev.agrani.tech/marketplace/api

Put it in an environment variable:

VITE_API_BASE_URL=https://vaaradhi-dev.agrani.tech/marketplace/api

Create a .env.example.

Products API

Use:

GET /products/marketplace?qc_status=approved&per_page=20&page=1

Full URL:

https://vaaradhi-dev.agrani.tech/marketplace/api/products/marketplace?qc_status=approved&per_page=20&page=1

The API returns:

{

  "count": 4,

  "next": null,

  "previous": null,

  "results": [

    {

      "id": "a816872d-4068-453d-9f6f-5e02860490c0",

      "name": "TEST",

      "seller_detail": {

        "user_id": "1b387b70-430e-4218-8963-49e915f315ac",

        "user_name": "Farmer",

        "user_mobile": "6666666013",

        "email": ""

      },

      "variants": [

        {

          "id": "aeb3be80-ac16-4582-9e8f-a907f4288f4c",

          "name": "non paddy",

          "pack_quantity": 6,

          "pack_unit": "KG",

          "price": 200,

          "is_active": true,

          "no_of_units": 7,

          "all_media": [

            {

              "id": "3278dece-598e-4861-b008-a8d731ab1f22",

              "file": "https://...",

              "file_extension": "png"

            }

          ]

        }

      ],

      "specifications": [

        {

          "id": "f507d9b7-c642-4e1e-ab5e-744433beb525",

          "name": "red",

          "value": "color",

          "description": "",

          "is_active": true

        }

      ],

      "delivery_location_detail": {

        "id": "7a591863-e2e1-48f6-86db-9acc94b10c44",

        "zone_name": "",

        "coverage": {

          "exclude": {

            "pincodes": ["201301"],

            "districts": [

              {

                "state_name": "Gujarat",

                "district_name": "Amreli"

              }

            ]

          },

          "include": {

            "states": [

              {

                "state_name": "Madhya Pradesh",

                "all_districts": true

              },

              {

                "state_name": "Kerala",

                "all_districts": true

              }

            ]

          }

        }

      },

      "is_ordered": true,

      "created_at": "2026-08-17T08:45:29.517597",

      "updated_at": "2026-08-17T11:28:54.441236",

      "created_by_id": "4a6bd6ee-c489-442d-a3ed-7956882aae58",

      "created_by_name": "Charan Kumar",

      "description": "good test review",

      "category": "XYZ",

      "qc_status": "Approved",

      "is_approved": true,

      "approved_at": "2026-08-17T08:47:07.101368",

      "approved_by": "Charan Kumar",

      "is_active": true

    }

  ],

  "status": 200,

  "message": "Marketplace records retrieved successfully."

}

The actual response can contain multiple products and multiple variants.

Very important: the variant is the purchasable item, not the base product. The product does not directly contain a price. The selected variant provides the price, quantity availability, pack quantity, pack unit, and images.

Use:

product.id as product ID

product.name as product name

product.category as category

product.description as description

product.specifications for specifications

product.seller_detail for seller information

variant.id as the purchasable variant ID

variant.name as variant name

variant.price as price

variant.pack_quantity as package quantity

variant.pack_unit as package unit

variant.no_of_units as available inventory

variant.all_media[].file as product images

A product can have multiple variants. The user must be able to select the desired variant before adding it to the cart.

If a variant has multiple all_media images, create an image carousel. The carousel must work on desktop and mobile, have previous/next controls and indicators, handle a single image properly, handle missing images gracefully, and use lazy loading where appropriate.

The API uses pagination with:

count, next, and previous.

Implement pagination or a polished "Load More" experience using the API's pagination data.

Search should use the API's q parameter, for example:

GET /products/marketplace?q=apple&qc_status=approved&per_page=20&page=1

Debounce search requests appropriately.

Use API-supported data to implement useful filters such as category, seller, price, availability, variant, pack unit, and other relevant product fields. Do not invent backend filter endpoints. If a filter is not supported server-side, implement it client-side only when reasonable.

The sample response can contain inconsistent values such as qc_status: "Edit Requested" while is_approved: true, or qc_status: "Approved" while is_approved: false. Since the API is already queried with qc_status=approved, do not arbitrarily hide returned products because of these inconsistencies. Respect the API response and use is_active appropriately.

Home / Landing Page

Create a beautiful marketplace landing page that opens immediately without authentication.

Include:

Responsive navigation/header

Agriculture-themed hero/banner

Strong marketplace headline

Supporting description

"Shop Now" CTA

Product sections

Featured/recommended products based on available API data

Responsive product grid

Footer

The header should contain:

Marketplace logo/name

Home

Shop/Products

Orders

Cart

Cart item count

On mobile, use a shadcn Sheet/menu.

Product Cards

Create polished, reusable product cards.

Each card should contain:

Product image carousel

Product name

Category

Starting/selected variant price

Variant selector if practical

Pack quantity and unit

Seller/farmer name

Availability

Add to Cart button

View Details button

Do not silently add an arbitrary variant. If multiple variants exist, make the selected variant obvious.

For example:

PINEAPPLE

From ₹400

Seller: Farmer

Variant: Imported — 5 KG

[Add to Cart] [View Details]

Create a reusable ProductCard and ProductCarousel.

Product Details

Create /products/:id.

Show:

Large product image carousel/gallery

Product name

Category

Description

Specifications

Seller information

Variant selector

Selected variant price

Pack quantity

Pack unit

Available units

Quantity selector

Add to Cart

When the selected variant changes, update the image, price, pack quantity, pack unit, and available inventory.

Seller Details

Create a shadcn Dialog/Sheet for seller information.

When the seller name/details are clicked, show:

Seller name

Seller mobile

Email if available

Seller ID if useful

Other information available from the API

Make the seller modal/sheet fully responsive.

Cart

Create a global CartContext using React Context API.

The cart must support:

Add variant to cart

Remove item

Increase quantity

Decrease quantity

Direct quantity update

Clear cart

Calculate subtotal

Calculate total item count

Check whether an item is already in the cart

Persist cart state using localStorage.

Use a storage key such as:

farmers_marketplace_cart

The cart must survive page refreshes.

Very important: the cart item identity must be based on:

productId + variantId

If the same product has two different variants, they must be separate cart items.

If the same product + same variant is added again, increase its quantity instead of creating a duplicate item.

Each cart item should contain enough frontend information to render the cart without refetching:

productId

productName

variantId

variantName

packQuantity

packUnit

price

quantity

availableUnits

seller

image

category

Do not allow a user to exceed variant.no_of_units.

For example, if no_of_units is 5, the maximum cart quantity for that variant is 5.

Cart Page

Create /cart.

Display:

Product image

Product name

Variant

Pack quantity

Pack unit

Seller

Unit price

Quantity controls

Item total

Remove button

Clear cart

Subtotal

Total item count

Proceed to Checkout

Use responsive layouts for mobile and desktop.

Show proper empty-cart UI.

Checkout

Create /checkout as a 3-step checkout.

Step 1 — Review Order

Display all cart items and allow quantity changes/removal.

Show:

Product

Variant

Quantity

Unit price

Item total

Subtotal

Step 2 — Buyer / Delivery Details

The order API requires:

buyer_name

buyer_phone

delivery_address

delivery_pincode

Create a validated form.

Validate:

Buyer name is required

Phone is required and should be a valid Indian mobile number

Address is required

Pincode is required and should be a valid Indian pincode

Do not require state, district, or block because the backend response derives those fields.

Step 3 — Order Confirmation

After successful order placement, show a professional success page containing:

Success indicator

Order ID

Order status

Items

Variants

Quantities

Prices

Buyer information

Delivery information

Continue Shopping

View Orders

There is no payment gateway. Do not create any payment UI.

Place Order API

Use:

POST /order

Full endpoint:

https://vaaradhi-dev.agrani.tech/marketplace/api/order

The payload must follow this exact structure:

{

  "products": [

    {

      "no_of_units": 2,

      "variant": "67fb3146-6534-4bfc-b5c0-5c8ff8023aae"

    }

  ],

  "delivery_address": "no",

  "delivery_pincode": "110081",

  "buyer_name": "Ravi",

  "buyer_phone": "8585987546"

}

For multiple cart items:

{

  "products": [

    {

      "no_of_units": 2,

      "variant": "variant-id-1"

    },

    {

      "no_of_units": 1,

      "variant": "variant-id-2"

    }

  ],

  "delivery_address": "Customer address",

  "delivery_pincode": "110081",

  "buyer_name": "Ravi",

  "buyer_phone": "8585987546"

}

Important:

variant must contain the variant ID, NOT the product ID.

no_of_units must contain the cart quantity.

Do not send unnecessary frontend-only fields in the products array.

Validate inventory before submitting.

Disable the submit button while the request is in progress.

Prevent accidental duplicate order submissions.

The successful response looks like:

{

  "status": 201,

  "message": "Order Created!",

  "data": {

    "id": "order_01M0HGEAXCJ0GG1MAD6C5PKWPR",

    "delivery_state": "DELHI",

    "delivery_district": "NORTH WEST DELHI",

    "delivery_block": "DELHI",

    "delivery_pincode": "110081",

    "delivery_address": "no",

    "buyer_name": "Ravi",

    "buyer_phone": "8585987546",

    "items": [

      {

        "id": "order_01M0HGEAXJC2JDTMQ2E5NXMC1V",

        "seller": {

          "user_id": "1b387b70-430e-4218-8963-49e915f315ac",

          "user_name": "Farmer",

          "user_mobile": "6666666013",

          "email": ""

        },

        "product": {

          "id": "0f18c6d3-d65d-43d1-830e-6c59d315e49d",

          "name": "PINEAPPLE",

          "category": "FRUITS"

        },

        "variant": {

          "id": "67fb3146-6534-4bfc-b5c0-5c8ff8023aae",

          "name": "imported",

          "pack_quantity": 5,

          "pack_unit": "KG",

          "no_of_units": 5,

          "price": 400

        },

        "no_of_units": 2,

        "price_per_unit": 400,

        "status": "Order Placed"

      }

    ],

    "created_at": "2026-08-21T12:04:27.628422",

    "status": "Pending"

  }

}

After a successful response:

Clear the cart.

Store/update the buyer phone locally.

Store the successful order in OrderContext if used.

Navigate to /order-success.

Display the complete order information.

Orders

Create /orders.

There is no authentication, so orders are retrieved using the buyer's phone number.

Use:

GET /order?buyer_phone=8585987546

Full endpoint:

https://vaaradhi-dev.agrani.tech/marketplace/api/order?buyer_phone=8585987546

If the buyer phone is not available in localStorage/context, show a clean form asking for the mobile number.

Persist the buyer phone locally using something like:

farmers_marketplace_buyer_phone

Once the phone is available, call the orders API.

The API response is:

{

  "status": 200,

  "message": "Orders retrieved successfully.",

  "data": {

    "count": 1,

    "next": null,

    "previous": null,

    "results": [

      {

        "id": "order_01M0HGEAXCJ0GG1MAD6C5PKWPR",

        "delivery_state": "DELHI",

        "delivery_district": "NORTH WEST DELHI",

        "delivery_block": "DELHI",

        "delivery_pincode": "110081",

        "delivery_address": "no",

        "buyer_name": "Ravi",

        "buyer_phone": "8585987546",

        "items": [

          {

            "id": "order_01M0HGEAXJC2JDTMQ2E5NXMC1V",

            "seller": {

              "user_id": "1b387b70-430e-4218-8963-49e915f315ac",

              "user_name": "Farmer",

              "user_mobile": "6666666013",

              "email": ""

            },

            "product": {

              "id": "0f18c6d3-d65d-43d1-830e-6c59d315e49d",

              "name": "PINEAPPLE",

              "category": "FRUITS"

            },

            "variant": {

              "id": "67fb3146-6534-4bfc-b5c0-5c8ff8023aae",

              "name": "imported",

              "pack_quantity": 5,

              "pack_unit": "KG",

              "no_of_units": 5,

              "price": 400

            },

            "no_of_units": 2,

            "price_per_unit": 400,

            "status": "Order Placed"

          }

        ],

        "created_at": "2026-08-21T12:04:27.628422",

        "status": "Pending"

      }

    ]

  }

}

Create an attractive order list with:

Order ID

Date

Total items

Total amount

Order status

View Details button

Create /orders/:id for detailed order information.

The order detail view should show:

Order ID

Date

Overall status

Buyer information

Delivery information

State

District

Block

Pincode

All ordered products

Variants

Quantities

Price per unit

Sellers

Item status

Use shadcn Badge components for statuses such as:

Pending

and:

Order Placed

API Architecture

Do not put API requests directly throughout UI components.

Create a dedicated API layer:

src/

  api/

    client.js

    products.js

    orders.js

For example:

products.js

  getProducts(params)

  searchProducts(params)

orders.js

  createOrder(payload)

  getOrdersByPhone(phone)

Create a reusable API client with centralized base URL and error handling.

Use the existing backend API exactly as provided. Do not invent endpoints.

Context Architecture

Use:

src/context/

  CartContext.jsx

  OrderContext.jsx

OrderContext is optional if it is not needed, but CartContext is required.

CartContext should provide:

addToCart()

removeFromCart()

updateQuantity()

increaseQuantity()

decreaseQuantity()

clearCart()

getCartTotal()

getCartItemCount()

isInCart()

Avoid unnecessary prop drilling.

Routing

Use React Router with:

/

/products

/products/:id

/cart

/checkout

/order-success

/orders

/orders/:id

No protected routes are required.

Components

Create reusable components such as:

components/

  common/

    LoadingSkeleton

    EmptyState

    ErrorState

  layout/

    Header

    Footer

    MobileNavigation

  products/

    ProductCard

    ProductGrid

    ProductCarousel

    VariantSelector

    ProductFilters

    ProductDetails

    SellerDialog

  cart/

    CartItem

    CartSummary

    EmptyCart

  checkout/

    CheckoutSteps

    OrderReview

    BuyerDetailsForm

    OrderSuccess

  orders/

    OrderCard

    OrderList

    OrderDetails

    OrderStatusBadge

Use shadcn/ui components wherever appropriate, including:

Button

Card

Dialog

Sheet

Input

Select

Checkbox

Slider

Badge

Tabs

Breadcrumb

Alert

Skeleton

Separator

Form

Sonner/toast

Responsive Design

This is a critical requirement.

Desktop should have:

Full navigation

Multi-column product grid

Sidebar filters where appropriate

Large product images

Spacious checkout layout

Mobile should have:

Mobile menu

Mobile filter Sheet

1–2 column product layout depending on viewport

Touch-friendly carousel

Stacked checkout

Responsive seller dialog/sheet

Sticky cart/checkout actions where useful

Do not simply shrink desktop components. Create genuinely responsive layouts.

Make sure there is no:

Horizontal scrolling

Broken carousel

Overlapping content

Cut-off buttons

Tiny touch targets

Fixed-width content that breaks mobile

Loading / Error / Empty States

Every API-driven section must handle:

Loading

API error

Network error

Empty results

Retry

Use Skeleton loaders while products/orders load.

For example:

"Unable to load products. Please try again."

with a Retry button.

For no results:

"No products found. Try changing your search or filters."

For empty cart:

"Your cart is empty."

Toasts

Use shadcn Sonner/toast.

Examples:

Added to cart

Removed from cart

Quantity updated

Cart cleared

Order placed successfully

Failed to place order

Failed to load products

Accessibility

Use:

Semantic HTML

Proper labels

Accessible dialogs

Keyboard navigation

Focus states

Alt text

Sufficient color contrast

Accessible buttons

ARIA attributes where necessary

Performance

Use sensible optimizations:

Lazy-loaded images

Route lazy loading where appropriate

Debounced search

Avoid unnecessary API requests

Efficient Context usage

Avoid unnecessary re-renders

Proper loading states

Do not over-engineer the project.

Suggested Project Structure

src/

├── api/

│   ├── client.js

│   ├── products.js

│   └── orders.js

├── components/

│   ├── common/

│   ├── layout/

│   ├── products/

│   ├── cart/

│   ├── checkout/

│   └── orders/

├── context/

│   ├── CartContext.jsx

│   └── OrderContext.jsx

├── hooks/

├── lib/

├── utils/

├── pages/

│   ├── Home.jsx

│   ├── Products.jsx

│   ├── ProductDetails.jsx

│   ├── Cart.jsx

│   ├── Checkout.jsx

│   ├── OrderSuccess.jsx

│   ├── Orders.jsx

│   └── OrderDetails.jsx

├── App.jsx

├── main.jsx

└── index.css

Important Business Rules

Follow these rules exactly:

The variant is the purchasable item.

Product price comes from the selected variant.

Cart identity is productId + variantId.

Order payload uses the variant.id.

Order quantity uses the cart quantity.

Product images come from variant.all_media[].file.

Seller information comes from seller_detail.

Inventory comes from variant.no_of_units.

Search uses the API's q parameter.

Product pagination uses count, next, and previous.

Orders are retrieved using buyer_phone.

Do not create authentication.

Do not create a payment gateway.

Do not invent API endpoints.

Do not use TypeScript.

Do not add unnecessary dependencies.

Do not hide API-returned products solely because sample QC fields are inconsistent.

Do not allow users to exceed available variant inventory.

Do not create duplicate cart lines for the same product + variant.

Clear the cart after successful order creation.

Testing Requirements

Before completing the project, verify this entire flow:

Open the application.

Hero section renders correctly.

Products load from the real API.

Search works.

Pagination works.

Filters work.

Product cards render correctly.

Product image carousel works.

Product details work.

Multiple variants work.

Selecting a variant updates price/images/availability.

Seller details modal works.

Add to cart works.

Same variant increases quantity.

Different variants create separate cart items.

Inventory limits work.

Quantity update works.

Remove item works.

Clear cart works.

Cart survives browser refresh.

Checkout review works.

Buyer details validation works.

Correct POST /order payload is generated.

Order API works.

Duplicate order submission is prevented.

Cart clears after successful order.

Order success page works.

Buyer phone is persisted.

Orders API works.

Orders list works.

Order details work.

Loading states work.

Error states work.

Empty states work.

Mobile layout works.

Tablet layout works.

Desktop layout works.

No horizontal overflow exists.

No console errors exist.

Production build succeeds.

README

Create a complete README.md with:

Project overview

Tech stack

Installation

Environment variables

API configuration

Development commands

Production build

Preview command

Project structure

Product API

Order API

Order retrieval API

Cart behavior

Checkout flow

Order flow

Include:

npm install

npm run dev

and:

npm run build

npm run preview

Final Deliverable

Build the actual functioning application, not just static mockups.

Use the real APIs above.

Make all major interactions functional.

Fix all build errors, runtime errors, broken imports, API handling issues, console errors, and responsive layout problems.

Finally, package the complete working project into a ZIP file containing:

All source code

package.json

Vite configuration

Tailwind configuration

shadcn configuration/components

.env.example

README

All required assets/configuration

Complete API integration

The final result should be a polished, responsive, production-quality Farmers Marketplace E-commerce application that can be installed with npm install and run with npm run dev.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b2b458c0-f75d-49ea-a701-1613a8bcee86).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
