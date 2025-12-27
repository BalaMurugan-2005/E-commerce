import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/common/Layout'
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
      {/* Routes WITH Header & Footer */}
      <Route path="/" element={
        <Layout>
          <Home />
        </Layout>
      } />
      
      <Route path="/products" element={
        <Layout>
          <ProductList />
        </Layout>
      } />
      
      <Route path="/product/:id" element={
        <Layout>
          <ProductDetail />
        </Layout>
      } />
      
      <Route path="/category/:id" element={
        <Layout>
          <Category />
        </Layout>
      } />
      
      <Route path="/brand/:id" element={
        <Layout>
          <Brand />
        </Layout>
      } />
      
      <Route path="/search" element={
        <Layout>
          <Search />
        </Layout>
      } />
      
      <Route path="/cart" element={
        <Layout>
          <Cart />
        </Layout>
      } />
      
      <Route path="/wishlist" element={
        <Layout>
          <Wishlist />
        </Layout>
      } />
      
      <Route path="/checkout" element={
        <Layout>
          <Checkout />
        </Layout>
      } />
      
      <Route path="/orders" element={
        <Layout>
          <Orders />
        </Layout>
      } />
      
      <Route path="/orders/:id" element={
        <Layout>
          <OrderDetails />
        </Layout>
      } />
      
      <Route path="/track-order" element={
        <Layout>
          <TrackOrder />
        </Layout>
      } />
      
      <Route path="/profile" element={
        <Layout>
          <Profile />
        </Layout>
      } />
      
      <Route path="/addresses" element={
        <Layout>
          <Addresses />
        </Layout>
      } />
      
      <Route path="/notifications" element={
        <Layout>
          <Notifications />
        </Layout>
      } />
      
      <Route path="/support" element={
        <Layout>
          <Support />
        </Layout>
      } />
      
      <Route path="/review/:productId" element={
        <Layout>
          <Review />
        </Layout>
      } />
      
      {/* Routes WITHOUT Header & Footer */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes