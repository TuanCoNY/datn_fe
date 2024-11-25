import React, { useState, useEffect } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import imageLogo from '../../assets/images/logo-login.png';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import Loading from '../../components/LoadingComponent/Loading';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';
import { message } from 'antd'; // Thêm import message từ antd

const SignInPage = () => {
  const location = useLocation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Lưu thông báo lỗi
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  );
  const { data, isPending, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success('Đăng nhập thành công!');
      navigate(location?.state);
    } else if (isError) {
      console.log(data?.message)
      if (data?.message === 'Incorrect password.') {
        message.error('Email đã có người sử dụng.');
      } else {
        message.error('Vui lòng kiểm tra lại email hoặc mật khẩu');
      }
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate('/');
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }

    // Kiểm tra nếu có lỗi trong dữ liệu trả về từ server
    if (data?.status === 'ERR') {
      message.error(data?.message || 'Đăng nhập thất bại!');
    }
  }, [isSuccess, data, location, navigate]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    // Reset lỗi mỗi khi người dùng nhấn đăng nhập
    setErrorMessage('');
    if (email && password) {
      // Kiểm tra định dạng email trước
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Định dạng email không hợp lệ');
        return;
      }

      mutation.mutate({
        email,
        password
      });
    } else {
      setErrorMessage('Vui lòng nhập email và mật khẩu');
    }
  };


  // Hàm điều hướng đến trang quên mật khẩu
  const handleForgotPasswordClick = () => {
    navigate('/forgot-password'); // Điều hướng tới trang quên mật khẩu
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1> Xin chào</h1>
          <p> Đăng nhập và tạo tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >
              {isShowPassword ? (
                <EyeFilled />
              ) : (
                <EyeInvisibleFilled />
              )}
            </span>
            <InputForm placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>} {/* Hiển thị thông báo lỗi */}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              texbutton={"Đăng Nhập"}
              styletexbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </Loading>
          <WrapperTextLight onClick={handleForgotPasswordClick}>Quên mật khẩu?</WrapperTextLight>
          <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
          <h4>Mua sắm tại shoptank</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
