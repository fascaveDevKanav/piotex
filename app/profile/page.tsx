"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProfileForm } from "@/components/profile/profile-form"
import { OrderHistory } from "@/components/profile/order-history"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Package, Settings, LogOut, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to view your profile.</p>
            <div className="flex flex-col gap-3">
              <Link href="/login">
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="w-full bg-transparent">
                  Create Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl bg-pink-100 text-pink-600">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="text-2xl bg-pink-100 text-pink-600">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#profile">
                      <User className="h-4 w-4 mr-3" />
                      Profile Information
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#orders">
                      <Package className="h-4 w-4 mr-3" />
                      Order History
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="#settings">
                      <Settings className="h-4 w-4 mr-3" />
                      Account Settings
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" id="profile">
                <ProfileForm />
              </TabsContent>

              <TabsContent value="orders" id="orders">
                <OrderHistory />
              </TabsContent>

              <TabsContent value="settings" id="settings">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Email Notifications</h4>
                              <p className="text-sm text-gray-600">Receive updates about your orders and promotions</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Privacy Settings</h4>
                              <p className="text-sm text-gray-600">Control how your data is used and shared</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Change Password</h4>
                              <p className="text-sm text-gray-600">Update your account password</p>
                            </div>
                            <Button variant="outline" size="sm">
                              Change
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
                            <div>
                              <h4 className="font-medium text-red-600">Delete Account</h4>
                              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
