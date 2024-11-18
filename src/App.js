import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import *as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slides/userSlide'
import axios from 'axios'
import Loading from './components/LoadingComponent/Loading'



function App() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    setIsPending(true)
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsPending(false)
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData }

  }
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date().getTime() / 1000;  // Thời gian hiện tại tính theo giây
    const { decoded } = handleDecoded();

    // Kiểm tra xem refresh_token có tồn tại trong localStorage không
    let storageRefreshToken = localStorage.getItem('refresh_token');
    console.log(storageRefreshToken);
    if (!storageRefreshToken) {
      dispatch(resetUser());
      return config;
    }

    // Kiểm tra và parse refresh_token
    let refreshToken;
    try {
      refreshToken = JSON.parse(storageRefreshToken);
    } catch (err) {
      console.error('Failed to parse refresh_token', err);
      dispatch(resetUser());  // Reset user nếu có lỗi khi parse
      return config;
    }

    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwtDecode(refreshToken);
    } catch (err) {
      console.error('Failed to decode refresh token', err);
      dispatch(resetUser());
      return config;
    }

    if (!decoded || !decodedRefreshToken) {
      dispatch(resetUser());
      return config;
    }

    if (decoded?.exp < currentTime) {
      if (decodedRefreshToken?.exp > currentTime) {
        const data = await UserService.refreshToken(refreshToken);
        config.headers['token'] = `Bearer ${data?.access_token}`;
      } else {
        dispatch(resetUser());
      }
    }

    return config;
  }, (err) => {
    return Promise.reject(err);
  });

  // const handleGetDetailsUser = async (id, token) => {
  //   try {
  //     const res = await UserService.getDetailsUser(id, token);

  //     if (res?.data) {
  //       dispatch(updateUser({ ...res.data, access_token: token }));
  //     } else {
  //       console.error('Failed to fetch user details');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while fetching user details:', error);
  //   }
  // };
  const handleGetDetailsUser = async (id, token) => {
    try {
      let storageRefreshToken = localStorage.getItem('refresh_token');
      const refreshToken = storageRefreshToken ? JSON.parse(storageRefreshToken) : null;

      const res = await UserService.getDetailsUser(id, token);

      if (res?.data) {
        dispatch(updateUser({ ...res.data, access_token: token, refreshToken: refreshToken }));
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('An error occurred while fetching user details:', error.response || error.message || error);
    }
  };


  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Loading isPending={isPending}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const ischeckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}
export default App