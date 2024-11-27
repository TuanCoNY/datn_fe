

import React, { useEffect, useState } from 'react';
import imageLogo from '../../assets/images/logo-login.png';
import { useNavigate } from 'react-router-dom';
import { Input, Button, message, Image } from 'antd';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import Loading from '../../components/LoadingComponent/Loading';
import { sendVerificationCode, verifyCode, resetPassword } from '../../services/UserService';

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1); // Bước trong quy trình quên mật khẩu
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState('');
    const navigate = useNavigate();

    const mutationSendCode = useMutationHooks((email) => UserService.sendVerificationCode(email));
    const mutationVerifyCode = useMutationHooks((data) => UserService.verifyCode(data));
    const mutationResetPassword = useMutationHooks((data) => UserService.resetPassword(data));
    const mutation = useMutationHooks(({ email, newPassword }) => UserService.resetPassword({ email, newPassword }));

    console.log('mutatin', mutation)
    const { isPending, isSuccess, data, isError } = mutation;

    console.log('email, newPassword', email, newPassword)
    useEffect(() => {
        if (isSuccess) {
            message.success('Đổi mật khẩu thành công!');
            navigate('/sign-in')
        }
    }, [isSuccess]);  // Cập nhật theo cả isSuccess và isError



    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleOnChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(validateEmail(value) ? '' : '(1) Email không hợp lệ');
    };
    const handleNavigateSignIn = () => {
        navigate('/sign-in');
    };

    const handleSendVerificationCode = () => {
        if (!validateEmail(email)) {
            message.error('(2) Vui lòng nhập email hợp lệ.');
            return;
        }
        mutationSendCode.mutate(email, {
            onSuccess: () => {
                message.success('(3) Mã xác thực đã được gửi đến email của bạn.');
                setStep(2); // Chuyển sang bước nhập mã xác thực
            },
            onError: () => message.error('(4) Gửi mã xác thực thất bại. Vui lòng thử lại.'),
        });
    };

    const handleVerifyCode = () => {
        if (!verificationCode) {
            message.error('(5) Vui lòng nhập mã xác thực.');
            return;
        }
        console.log('verificationCode', verificationCode)
        mutationVerifyCode.mutate({ email, code: verificationCode }, {
            onSuccess: () => {
                message.success('(6) Mã xác thực chính xác. Vui lòng đặt lại mật khẩu.');
                setStep(3); // Chuyển sang bước đổi mật khẩu
            },
            onError: () => message.error('(7) Mã xác thực không đúng.'),
        });
    };

    const validatePassword = (password) => {
        const passwordRegex = /^[a-zA-Z0-9]{6,}$/; // Chỉ chứa chữ và số, ít nhất 6 ký tự
        return passwordRegex.test(password);
    };
    const handleOnchangeNewPassword = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        if (!validatePassword(value)) {
            setNewPasswordError('Mật khẩu phải có ít nhất 6 ký tự và chỉ chứa chữ và số');
        } else {
            setNewPasswordError('');
        }
    };
    const handleOnchangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleResetPassword = () => {
        if (!validatePassword(newPassword)) {
            message.error('Mật khẩu không hợp lệ. Phải có ít nhất 6 ký tự và chỉ chứa chữ và số.');
            return;
        }

        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu không khớp.');
            return;
        }

        // Kiểm tra giá trị của email và newPassword trước khi gọi mutate
        console.log('Giá trị email:', email);
        console.log('Giá trị newPassword:', newPassword);

        mutation.mutate(
            { email, newPassword },
            {
                onError: (error) => {
                    if (error?.response?.data?.status === 'ERR' && error?.response?.data?.message === 'Email không tồn tại trong hệ thống') {
                        message.error('Email không tồn tại trong hệ thống.');
                    } else {
                        message.error('(99) Có lỗi xảy ra. Vui lòng thử lại sau.');
                    }
                },
            }
        );
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    {step === 1 && (
                        <>
                            <h1>Quên mật khẩu?</h1>
                            <p>Nhập email của bạn để nhận mã xác thực.</p>
                            <Input
                                placeholder="abc@gmail.com"
                                value={email}
                                onChange={handleOnChangeEmail}
                                status={emailError ? 'error' : ''}
                                style={{ marginBottom: '10px' }}
                            />
                            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                            <Loading isPending={mutationSendCode.isPending}>
                                <Button
                                    onClick={handleSendVerificationCode}
                                    size="large"
                                    style={{ background: 'rgb(255, 57, 69)', height: '48px', width: '100%', border: 'none', borderRadius: '4px' }}
                                >
                                    Gửi mã xác thực
                                </Button>
                            </Loading>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h1>Nhập mã xác thực</h1>
                            <p>Mã xác thực đã được gửi đến email của bạn.</p>
                            <Input
                                placeholder="Nhập mã xác thực"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                            <Loading isPending={mutationVerifyCode.isPending}>
                                <Button
                                    onClick={handleVerifyCode}
                                    size="large"
                                    style={{ background: 'rgb(255, 57, 69)', height: '48px', width: '100%', border: 'none', borderRadius: '4px' }}
                                >
                                    Xác nhận mã
                                </Button>
                            </Loading>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h1>Đặt lại mật khẩu</h1>
                            <p>Vui lòng nhập mật khẩu mới.</p>
                            <Input.Password
                                placeholder="Mật khẩu mới"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                            <Input.Password
                                placeholder="Xác nhận mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={{ marginBottom: '10px' }}
                            />
                            <Loading isPending={mutationResetPassword.isPending}>
                                <Button
                                    onClick={handleResetPassword}
                                    size="large"
                                    style={{ background: 'rgb(255, 57, 69)', height: '48px', width: '100%', border: 'none', borderRadius: '4px' }}
                                >
                                    Đổi mật khẩu
                                </Button>
                            </Loading>
                        </>
                    )}
                    <p>
                        <WrapperTextLight onClick={handleNavigateSignIn}>Đăng Nhập</WrapperTextLight>
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

export default ForgotPasswordPage;
