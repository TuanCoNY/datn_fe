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

  // const handleDecoded = () => {

  //   let storageData = localStorage.getItem('access_token')
  //   let decoded = {}
  //   if (storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData)
  //     decoded = jwtDecode(storageData);
  //   }
  //   return { decoded, storageData }

  // }
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
    const currentTime = new Date()
    const { decoded } = handleDecoded();

    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token);

      if (res?.data) {
        dispatch(updateUser({ ...res.data, access_token: token }));
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('An error occurred while fetching user details:', error);
    }
  };
  // const handleGetDetailsUser = async (id, token) => {
  //   const res = await UserService.getDetailsUser(id, token);
  //   dispatch(updateUser({ ...res.data, access_token: token }));
  // };


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