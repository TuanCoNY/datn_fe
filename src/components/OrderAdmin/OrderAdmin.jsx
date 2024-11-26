import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import *as message from '../Message/Message'
import { convertPrice, getBase64 } from '../../utils'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import PieChartComponent from './PieChart'


const OrderAdmin = () => {
    const user = useSelector((state) => state?.user)

    const [form] = Form.useForm();

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrder,
    });
    const { isPending: isPendingOrders, data: orders } = queryOrder

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    //ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    //onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        //onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        //onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
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
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                //setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         // <Highlighter
        //         //     highlightStyle={{
        //         //         backgroundColor: '#ffc069',
        //         //         padding: 0,
        //         //     }}
        //         //     searchWords={[searchText]}
        //         //     autoEscape
        //         //     textToHighlight={text ? text.toString() : ''}
        //         // />
        //     ) : (
        //         text
        //     ),
    });
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Price Item',
            dataIndex: 'itemsPrice',
            sorter: (a, b) => a.itemsPrice.length - b.itemsPrice.length,
            ...getColumnSearchProps('itemsPrice')
        },
        {
            title: 'Shipping',
            dataIndex: 'shippingPrice',
            sorter: (a, b) => a.shippingPrice.length - b.shippingPrice.length,
            ...getColumnSearchProps('shippingPrice')
        },
        {
            title: 'IsPaid',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
            ...getColumnSearchProps('isPaid')
        },
        {
            title: 'Method',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
            ...getColumnSearchProps('paymentMethod')
        },
        {
            title: 'Total',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
            ...getColumnSearchProps('totalPrice')
        },
    ];
    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        console.log('user', user)
        return {
            ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone,
            address: order?.shippingAddress?.address, paymentMethod: orderContant.payment[order?.paymentMethod],
            isPaid: order?.isPaid ? 'TRUE' : 'FALSE', isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice),
            itemsPrice: convertPrice(order?.itemsPrice)
        }
    })

    return (
        <div>
            <WrapperHeader> Quản lý đơn hàng</WrapperHeader>
            <div style={{ height: '170px', width: '170px' }}>
                <PieChartComponent data={orders?.data} />

            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isPending={isPendingOrders} data={dataTable} />
            </div>
        </div>
    )
}

export default OrderAdmin