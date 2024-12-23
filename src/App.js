import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Profile from './pages/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetails from './pages/ProductDetails';
import User from './pages/User';
import Sale from './pages/Sale';
import Accounting from './pages/Accounting';

const App = () => {

  const isAuth = store.getState().user.isAuth;

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Giriş yapmamış kullanıcılar için PublicRoute */}
          <Route path="/welcome" element={isAuth ? <Navigate to="/home" /> : <Welcome />} />
          <Route path="/register" element={isAuth ? <Navigate to="/home" /> : <Register />} />

          {/* Giriş yapmış kullanıcılar için PrivateRoute */}
          <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/welcome" />} />
          <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/welcome" />} />
          <Route path="/products" element={isAuth ? <Products /> : <Navigate to="/welcome" />} />
          <Route path="/users" element={isAuth ? <User /> : <Navigate to="/welcome" />} />
          <Route path='/sales' element={isAuth ? <Sale /> : <Navigate to="/welcome" />} />
          <Route path="/products/add-product" element={isAuth ? <AddProduct /> : <Navigate to="/welcome" />} />
          <Route path="/products/edit-product/:id" element={isAuth ? <EditProduct /> : <Navigate to="/welcome" />} />
          <Route path="/products/:id" element={isAuth ? <ProductDetails /> : <Navigate to="/welcome" />} />
          <Route path="/accounting" element={isAuth ? <Accounting /> : <Navigate to="/welcome" />} />

          {/* Default route: Giriş yapılmışsa, home'a yönlendirilir, yoksa login'e */}
          <Route path="/" element={isAuth ? <Navigate to="/home" /> : <Navigate to="/welcome" />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
