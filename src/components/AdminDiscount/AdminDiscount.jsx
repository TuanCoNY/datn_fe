import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Space, Table, Drawer, Modal, Input, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import * as DiscountService from '../../services/DiscountService';

const AdminDiscount = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [discountDetails, setDiscountDetails] = useState({ name: '', discountRate: 0 });
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const searchInput = useRef(null);

    const { data: discounts, isLoading, refetch } = useQuery({
        queryKey: ['discounts'],
        queryFn: DiscountService.getAllDiscounts,
    });

    const [form] = Form.useForm();

    const mutationCreate = useMutation({
        mutationFn: DiscountService.createDiscount,
        onSuccess: () => {
            refetch();
            message.success('Thêm mã giảm giá thành công!');
            handleCloseDrawer();
        },
        onError: () => message.error('Thêm mã giảm giá thất bại!'),
    });

    const mutationUpdate = useMutation({
        mutationFn: DiscountService.updateDiscount,
        onSuccess: () => {
            refetch();
            message.success('Cập nhật mã giảm giá thành công!');
            handleCloseDrawer();
        },
        onError: () => message.error('Cập nhật mã giảm giá thất bại!'),
    });

    const mutationDelete = useMutation({
        mutationFn: DiscountService.deleteDiscount,
        onSuccess: () => {
            refetch();
            message.success('Xóa mã giảm giá thành công!');
            setIsModalOpenDelete(false);
        },
        onError: () => message.error('Xóa mã giảm giá thất bại!'),
    });

    // Hàm tìm kiếm theo cột
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
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
                        Tìm kiếm
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Đặt lại
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    });

    // Hàm xử lý tìm kiếm
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    // Hàm reset tìm kiếm
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
    };

    const handleEditDiscount = (record) => {
        setRowSelected(record.key);
        setDiscountDetails({ name: record.name, discountRate: record.discountRate });
        setIsOpenDrawer(true);
    };

    const handleDeleteDiscount = (key) => {
        setRowSelected(key);
        setIsModalOpenDelete(true);
    };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setDiscountDetails({ name: '', discountRate: 0 });
        form.resetFields();
    };

    const handleSubmit = (values) => {
        if (rowSelected) {
            mutationUpdate.mutate({ ...values, id: rowSelected });
        } else {
            mutationCreate.mutate(values);
        }
    };

    const handleConfirmDelete = () => {
        mutationDelete.mutate(rowSelected);
    };

    const columns = [
        {
            title: 'Tên mã giảm giá',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Giảm giá (%)',
            dataIndex: 'discountValue',
            sorter: (a, b) => a.discountValue - b.discountValue,
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <div>
                    <EditOutlined
                        style={{ color: 'blue', fontSize: '20px', cursor: 'pointer' }}
                        onClick={() => handleEditDiscount(record)}
                    />
                    <DeleteOutlined
                        style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
                        onClick={() => handleDeleteDiscount(record.key)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: 20 }}
                onClick={() => setIsOpenDrawer(true)}
            >
                Thêm mã giảm giá
            </Button>

            <Table
                columns={columns}
                dataSource={discounts?.data}  // Lưu ý phần này là `discounts?.data`
                rowKey="key"
                loading={isLoading}
                pagination={{ pageSize: 5 }}
            />

            <Drawer
                title={rowSelected ? 'Cập nhật mã giảm giá' : 'Thêm mã giảm giá'}
                width={400}
                onClose={handleCloseDrawer}
                visible={isOpenDrawer}
            >
                <Form form={form} onFinish={handleSubmit} initialValues={discountDetails}>
                    <Form.Item
                        label="Tên mã giảm giá"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên mã giảm giá!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Giảm giá (%)"
                        name="discountRate"
                        rules={[{ required: true, message: 'Vui lòng nhập tỷ lệ giảm giá!' }]}
                    >
                        <Input type="number" min={0} max={100} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {rowSelected ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>

            <Modal
                title="Xác nhận xóa"
                visible={isModalOpenDelete}
                onOk={handleConfirmDelete}
                onCancel={() => setIsModalOpenDelete(false)}
            >
                <p>Bạn có chắc chắn muốn xóa mã giảm giá này?</p>
            </Modal>
        </div>
    );
};

export default AdminDiscount;
