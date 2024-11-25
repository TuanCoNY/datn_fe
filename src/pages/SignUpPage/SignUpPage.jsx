import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import imageLogo from '../../assets/images/logo-login.png';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validateForm = () => {
    let validationErrors = {};
    if (!email.trim()) {
      validationErrors.email = 'Email không được để trống.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Email không đúng định dạng.';
    }

    if (!password.trim()) {
      validationErrors.password = 'Mật khẩu không được để trống.';
    } else if (password.length < 6) {
      validationErrors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự.';
    } else if (/[^a-zA-Z0-9]/.test(password)) {
      validationErrors.password = 'Mật khẩu không được chứa ký tự đặc biệt.';
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Mutation hook for signup API call
  const mutation = useMutationHooks(
    data => UserService.signupUser(data)

  )
  console.log(mutation)
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success('Đăng ký thành công!');
      handleNavigateSignIn();
    } else if (isError) {
      console.log(data?.message)
      if (data?.message === 'Email already exists.') {
        message.error('Email đã có người sử dụng.');
      } else {
        message.error('Tài khoản đã tồn tại. Vui lòng thử lại.');
      }
    }
  }, [isSuccess, isError, data]);

  const handleSignUp = () => {
    if (validateForm()) {
      mutation.mutate({ email, password, confirmPassword });
    }
  };

  const handleNavigateSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: 'auto', borderRadius: '6px', backgroundColor: '#fff', display: 'flex', padding: '20px' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập và tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer',
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Mật khẩu"
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(value) => setPassword(value)}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
          </div>
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer',
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Xác nhận mật khẩu"
              type={isShowConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(value) => setConfirmPassword(value)}
            />
            {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email || !password || !confirmPassword}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              texbutton="Đăng Ký"
              styletexbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            />
          </Loading>
          <p>
            Bạn đã có tài khoản? <WrapperTextLight onClick={handleNavigateSignIn}>Đăng Nhập</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
          <h4>Mua sắm tại ঔ𝒮𝒽𝑜𝓅𝒯𝓊𝒩𝒶亗</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
