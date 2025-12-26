import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'
import Category from '../pages/Category'
import Brand from '../pages/Brand'
import Search from '../pages/Search'
import Cart from '../../customer/Cart'
import Wishlist from '../pages/Wishlist'
import Checkout from '../pages/Checkout'
import Orders from '../../customer/Orders'
import OrderDetails from '../../customer/OrderDetails'
import TrackOrder from '../../customer/TrackOrder'
import Profile from '../pages/Profile'
import Addresses from '../../customer/Addresses'
import Notifications from '../pages/Notifications'
import Support from '../pages/Support'
import Review from '../pages/Review'
import Register from '../pages/Register'
import Login from '../pages/Login'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/brand/:id" element={<Brand />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addresses" element={<Addresses />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/support" element={<Support />} />
      <Route path="/review/:productId" element={<Review />} />
    </Routes>
  )
}

export default AppRoutes