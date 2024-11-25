import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHooks';
import Loading from '../../components/LoadingComponent/Loading';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const mutation = useMutationHooks((data) => UserService.resetPasswordService(data));

    const { isPending, isSuccess, data } = mutation;

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleOnchangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleOnchangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu không khớp');
            return;
        }
        mutation.mutate({
            email,
            newPassword
        });
    };

    if (isSuccess && data?.status === 'OK') {
        message.success('Mật khẩu của bạn đã được cập nhật thành công!');
        navigate('/sign-in'); // Điều hướng về trang đăng nhập sau khi đổi mật khẩu thành công
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', backgroundColor: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Quên mật khẩu?</h1>
                    <p>Nhập email của bạn để nhận link khôi phục mật khẩu.</p>

                    <Input
                        style={{ marginBottom: '10px' }}
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={handleOnchangeEmail}
                    />

                    <div style={{ position: 'relative' }}>
                        <Input
                            placeholder="Mật khẩu mới"
                            type={isShowPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={handleOnchangeNewPassword}
                            style={{ marginBottom: '10px' }}
                        />
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px',
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Input
                            placeholder="Xác nhận mật khẩu"
                            type={isShowPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleOnchangeConfirmPassword}
                            style={{ marginBottom: '10px' }}
                        />
                    </div>

                    <Loading isPending={isPending}>
                        <Button
                            disabled={!email || !newPassword || !confirmPassword}
                            onClick={handleResetPassword}
                            size="large"
                            style={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px',
                            }}
                        >
                            Cập nhật mật khẩu
                        </Button>
                    </Loading>

                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

                    <WrapperTextLight onClick={() => navigate('/sign-in')}>Đã nhớ mật khẩu? Đăng nhập</WrapperTextLight>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <h4>Khôi phục mật khẩu</h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
