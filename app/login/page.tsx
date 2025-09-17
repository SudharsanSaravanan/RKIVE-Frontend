"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempted with:", { email, password })
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <div className="mb-8">
              <img src="/logo.png" alt="Logo" className="w-fit h-24 rounded-2xl" />
              <h1 className="text-4xl font-bold my-4">PM Internship Portal</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Empowering India's future leaders through strategic internship opportunities
              </p>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 w-96 h-96 bg-orange-400/20 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full"></div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:hidden">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-orange-400 rounded-lg"></div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">PM Internship</h2>
              <p className="text-gray-600">Admin Dashboard Access</p>
            </div>

            <Card className="border-0 shadow-2xl bg-white">
              <CardHeader className="space-y-1 pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center text-gray-500 text-base">
                  Sign in to your account
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-6 px-8">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@pminternship.gov.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-base"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-base"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Forgot password?
                    </a>
                  </div>
                </CardContent>
                
                <CardFooter className="px-8 pb-8 pt-4 flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign In to Dashboard
                  </Button>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?
                    <a href="#" className="text-blue-600 ml-1 hover:text-blue-800 font-medium">
                      Sign up
                    </a>
                  </p>
                </CardFooter>
              </form>
            </Card>
            
            <div className="text-center text-sm text-gray-500">
              <p>© 2024 Ministry of Corporate Affairs</p>
              <p>Government of India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}