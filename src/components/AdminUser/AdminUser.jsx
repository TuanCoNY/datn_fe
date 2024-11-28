import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import *as message from '../../components/Message/Message'
import { getBase64 } from '../../utils'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import * as UserService from '../../services/UserService'
import { useQuery } from '@tanstack/react-query'
import { useRef } from 'react'
import { useState } from 'react'
import { updateUser } from '../../redux/slides/userSlide'


const AdminUser = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const dispatch = useDispatch()

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: '',
    })
    const [form] = Form.useForm();

    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id,
                token,
                ...rests
            } = data
            const res = UserService.updateUser(
                id,
                { ...rests }, token)
            return res
        },
    )
    const mutationDeleted = useMutationHooks(
        (data) => {
            const { id,
                token,
            } = data
            const res = UserService.deleteUser(
                id,
                token)
            return res
        },
    )
    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { token,
                ...ids
            } = data
            const res = UserService.deleteManyUser(
                ids,
                token)
            return res
        },
    )
    const handleDeleteManyUsers = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }


    const getAllUsers = async () => {
        const res = await UserService.getAllUser(user?.access_token)
        return res
    }

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserService.getDetailsUser(rowSelected)
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                address: res?.data?.address,
                avatar: res?.data?.avatar,
            })
        }
        setIsPendingUpdate(false)
    }
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)

    }, [form, stateUserDetails])
    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsPendingUpdate(true)
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }
    const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const { data: dataDeleted, isPending: isPendingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted
    const { data: dataDeletedMany, isPending: isPendingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeletedMany

    const queryUser = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    });
    const { isPending: isPendingUsers, data: users } = queryUser
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '25px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'blue', fontSize: '25px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <InputComponent
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <span style={{ backgroundColor: '#ffc069', padding: 0 }}>{text}</span>
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => (a.name?.length || 0) - (b.name?.length || 0),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => (a.email?.length || 0) - (b.email?.length || 0),
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => (a.address?.length || 0) - (b.address?.length || 0),
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                },
            ],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => (a.phone || '').localeCompare(b.phone || ''),
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];

    const dataTable = users?.data?.length && users?.data?.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
    })

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDeleted])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isSuccessDeletedMany])
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }

    }, [isSuccessUpdated])
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    console.log("Dữ liệu trả về từ queryUser.data:", queryUser.data);

    const handleDeleteUser = () => {
        // Kiểm tra trạng thái loading
        if (queryUser.isLoading) {
            console.log("Dữ liệu đang tải...");
            return;
        }

        // Kiểm tra nếu queryUser.data không hợp lệ hoặc không có data
        if (!queryUser.data || !Array.isArray(queryUser.data.data)) {
            console.error("Dữ liệu queryUser.data không hợp lệ.");
            return;
        }

        // Lấy danh sách người dùng
        const userList = queryUser.data.data;

        // Tìm người dùng cần xóa
        const selectedUser = userList.find(user => user._id === rowSelected);

        //Kiểm tra nếu người dùng là admin
        if (selectedUser?.isAdmin) {
            message.error("Không thể xóa tài khoản admin.");
            return;
        }

        // Thực hiện xóa nếu không phải admin
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch(); // Làm mới danh sách người dùng
            }
        });
    };



    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: (file.preview)
        })
    }
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }
    const onUpdateUser = () => {
        if (!rowSelected) {
            console.error("No user selected for update");
            return;
        }

        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateUserDetails },
            {
                onSuccess: (data) => {
                    // Cập nhật lại thông tin người dùng trong Redux store
                    dispatch(updateUser({
                        ...stateUserDetails, // Thông tin vừa chỉnh sửa
                        access_token: user?.access_token, // Token người dùng
                        _id: rowSelected, // ID của người dùng
                        isAdmin: user?.isAdmin, // Vai trò hiện tại
                        city: user?.city, // Thông tin khác (nếu cần)
                    }));

                    // Lấy thông tin người dùng sau khi cập nhật
                    handleGetDetailsUser(rowSelected, user?.access_token);
                },
                onError: () => {
                    // Hiển thị thông báo lỗi
                    message.error("Cập nhật thông tin thất bại, vui lòng thử lại!");
                },
                onSettled: () => {
                    // Làm mới danh sách người dùng để đồng bộ hóa dữ liệu
                    queryUser.refetch();
                },
            }
        );
    };



    return (
        <div>
            <WrapperHeader> Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyUsers} columns={columns} isPending={isPendingUsers} data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                setRowSelected(record._id)
                            }
                        };
                    }} />
            </div>
            <DrawerComponent title='Chi tiết Người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
                <Loading isPending={isPendingUpdate || isPendingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                        </Form.Item>
                        <Form.Item
                            label="Avatar"
                            name="avatar"
                            rules={[{ required: true, message: 'Please input your avatar!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                                <Button>Select File</Button>
                                {stateUserDetails?.avatar && (
                                    <img src={stateUserDetails?.avatar} style={{
                                        height: '60px',
                                        width: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginLeft: '10px'
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>
            <ModalComponent forceRender title="Xóa người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
                <Loading isPending={isPendingDeleted}>
                    <div>Bạn có chắc muốn xóa tài khoản này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default AdminUser