// Order management utilities
export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  image: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  deliveryDate?: string
  shippingAddress: {
    fullName: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
  }
  paymentMethod: string
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    userId: "1",
    items: [
      {
        id: "1",
        name: "Elegant Silk Saree",
        price: 2499,
        quantity: 1,
        size: "Free Size",
        image: "/elegant-silk-saree-in-pink.jpg",
      },
    ],
    total: 2697,
    status: "delivered",
    orderDate: "2024-01-15T10:30:00Z",
    deliveryDate: "2024-01-18T14:20:00Z",
    shippingAddress: {
      fullName: "Priya Sharma",
      phone: "+91 9876543210",
      email: "priya@example.com",
      address: "123 MG Road, Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560034",
    },
    paymentMethod: "Cash on Delivery",
  },
  {
    id: "ORD-2024-002",
    userId: "1",
    items: [
      {
        id: "3",
        name: "Floral Summer Dress",
        price: 1899,
        quantity: 1,
        size: "M",
        image: "/floral-summer-dress.png",
      },
      {
        id: "7",
        name: "Casual Sneakers",
        price: 1599,
        quantity: 1,
        size: "7",
        image: "/white-casual-sneakers.jpg",
      },
    ],
    total: 3696,
    status: "shipped",
    orderDate: "2024-01-20T15:45:00Z",
    shippingAddress: {
      fullName: "Priya Sharma",
      phone: "+91 9876543210",
      email: "priya@example.com",
      address: "123 MG Road, Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560034",
    },
    paymentMethod: "Cash on Delivery",
  },
]

// Get orders for user
export function getUserOrders(userId: string): Order[] {
  return mockOrders.filter((order) => order.userId === userId)
}

// Get order by ID
export function getOrderById(orderId: string): Order | undefined {
  return mockOrders.find((order) => order.id === orderId)
}

// Get order status color
export function getOrderStatusColor(status: Order["status"]): string {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "confirmed":
      return "bg-blue-100 text-blue-800"
    case "shipped":
      return "bg-purple-100 text-purple-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Format order status
export function formatOrderStatus(status: Order["status"]): string {
  switch (status) {
    case "pending":
      return "Order Placed"
    case "confirmed":
      return "Confirmed"
    case "shipped":
      return "Shipped"
    case "delivered":
      return "Delivered"
    case "cancelled":
      return "Cancelled"
    default:
      return status
  }
}
