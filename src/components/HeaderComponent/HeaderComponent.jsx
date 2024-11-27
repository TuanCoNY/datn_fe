import { Badge, Col, Modal, Popover, message, notification } from 'antd';
import React, { useEffect } from 'react';
import {
  IconWrapper,
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from './style';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import *as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvater, setUserAvater] = useState('')
  const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [pending, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();  // Đăng xuất người dùng
    dispatch(resetUser());           // Reset state người dùng
    setLoading(false);
    message.success({
      content: 'Đã đăng xuất thành công',
      style: {
        marginLeft: 0,     // Điều chỉnh để thông báo hiện từ trái sang phải
        position: 'fixed',
        top: 50,
        left: '10%',  // Bạn có thể thay đổi phần trăm này để điều chỉnh vị trí xuất hiện từ trái qua
        transform: 'translateX(0%)', // Vị trí mặc định (không cần di chuyển)
        transition: 'transform 0.5s ease',  // Hiệu ứng mượt mà
      },
    });
    navigate('/'); // Điều hướng về trang chủ sau khi đăng xuất
  };
  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvater(user?.avatar)
    setLoading(false)

  }, [user?.name, user?.avatar])
  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>
          Quản lý hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate('my-order')}>
        Đơn hàng của tôi
      </WrapperContentPopup>

      <WrapperContentPopup onClick={() => handleClickNavigate('my-discount')}>
        Khuyến mại của tôi
      </WrapperContentPopup>

      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>

  );
  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navigate('/profile-user');
    } else if (type === 'admin') {
      navigate('/system/admin');
    } else if (type === 'my-order') {
      navigate('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token,
        }
      });
    } else if (type === 'my-discount') {
      navigate('/my-discount')

    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    // Thực hiện hành động gọi điện nếu cần

  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value));
  }
  return (
    <div style={{ width: '100%', background: '#d70018', display: 'flex', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <WrapperTextHeader to='/'>ঔ𝒮𝒽𝑜𝓅𝒯𝓊𝒩𝒶亗</WrapperTextHeader>
        </Col>
        <div style={{ margin: '0 16px', display: 'flex', alignItems: 'center', fontSize: '24px', color: '#fff' }}>
          <ContactsOutlined />
        </div>
        <IconWrapper>
          <PhoneOutlined onClick={showModal} />
        </IconWrapper>
        <Modal
          title="Xác nhận gọi điện"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="OK"
          cancelText="Hủy"
        >
          <p>Hãy gọi vào theo số 0362297649</p>
        </Modal>

        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              // texbutton="Tìm kiếm"
              placeholder="Bạn cần tìm gì?"
              onChange={onSearch}
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
          <Loading isPending={pending}>
            <WrapperHeaderAccount>
              {userAvater ? (
                <img src={userAvater} alt="avatar" style={{
                  height: '30px',
                  width: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer' }} onClick={() => setIsOpenPopup((prev) => !prev)}>
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng kí</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
