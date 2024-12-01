import React, { useState } from 'react';
import { WrapperHeader } from './style';
import { Button, Form, message, Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { orderContant } from '../../contant';
import PieChartComponent from './PieChart';
import { convertPrice } from '../../utils';
import { CheckCircleOutlined } from '@ant-design/icons';

const OrderAdmin = () => {
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();
    const [selectedOrders, setSelectedOrders] = useState([]); // Trạng thái cho các đơn hàng được chọn

    // Fetch orders using react-query
    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token);
        return res;
    };

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrder,
    });

    const { isLoading: isPendingOrders, data: orders } = queryOrder;

    const handleDeleteMany = async () => {
        if (!selectedOrders.length) {
            message.warning('Vui lòng chọn ít nhất một đơn hàng để xóa.');
            return;
        }

        try {
            const response = await OrderService.deleteManyOrders(selectedOrders, user?.access_token);
            if (response.status === 'OK') {
                message.success('Xóa các đơn hàng thành công!');
                queryOrder.refetch(); // Làm mới danh sách đơn hàng
                setSelectedOrders([]); // Xóa lựa chọn
            } else {

            }
        } catch (error) {
            message.error('Không thể xóa các đơn hàng.');
            console.error('Error deleting orders:', error);
            message.error('Đã xảy ra lỗi khi xóa các đơn hàng.');
        }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <InputComponent
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && clearFilters()}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    });

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.localeCompare(b.userName),
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.localeCompare(b.phone),
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address),
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Giá',
            dataIndex: 'itemsPrice',
            sorter: (a, b) => a.itemsPrice - b.itemsPrice,
            ...getColumnSearchProps('itemsPrice'),
        },
        {
            title: 'Shipping',
            dataIndex: 'shippingPrice',
            sorter: (a, b) => a.shippingPrice - b.shippingPrice,
            ...getColumnSearchProps('shippingPrice'),
        },
        {
            title: 'Is Paid',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.localeCompare(b.isPaid),
            ...getColumnSearchProps('isPaid'),
        },
        {
            title: 'Method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
            ...getColumnSearchProps('paymentMethod'),
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            ...getColumnSearchProps('totalPrice'),
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'orderStatus',
        },
    ];

    const dataTable =
        orders?.data?.map((order) => ({
            key: order._id,
            userName: order?.shippingAddress?.fullName || 'N/A',
            phone: order?.shippingAddress?.phone || 'N/A',
            address: order?.shippingAddress?.address || 'N/A',
            paymentMethod: orderContant.payment[order?.paymentMethod] || 'Unknown',
            isPaid: order?.isPaid ? 'TRUE' : 'FALSE',
            shippingPrice: convertPrice(order?.shippingPrice || 0),
            itemsPrice: convertPrice(order?.itemsPrice || 0),
            totalPrice: convertPrice(order?.totalPrice || 0),
            orderStatus: order?.orderStatus || 'Chưa giao',
        })) || [];

    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ height: '170px', width: '170px' }}>
                <PieChartComponent data={orders?.data} />
            </div>
            <Space style={{ marginBottom: 16 }}>
                <Button type="danger" onClick={handleDeleteMany}>
                    Xóa các đơn hàng đã chọn
                </Button>
            </Space>
            <TableComponent
                columns={columns}
                isPending={isPendingOrders}
                data={dataTable}
                rowSelection={{
                    selectedRowKeys: selectedOrders,
                    onChange: (selectedRowKeys) => setSelectedOrders(selectedRowKeys),
                }}
            />
        </div>
    );
};

export default OrderAdmin;
