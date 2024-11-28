import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select, message } from 'antd';
import * as DiscountService from '../../services/DiscountService'
import moment from 'moment';


const { Option } = Select;

const AdminDiscount = ({ access_token }) => {
    const [discounts, setDiscounts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDiscount, setCurrentDiscount] = useState(null);
    const [form] = Form.useForm();

    // Lấy tất cả mã giảm giá khi component mount
    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const data = await DiscountService.getAllDiscounts(access_token);
                console.log("Data:", data.data);
                setDiscounts(data.data);
            } catch (error) {
                message.error('Failed to fetch discounts');
            }
        };

        fetchDiscounts();
    }, [access_token]);

    // Hiển thị modal tạo mới hoặc chỉnh sửa mã giảm giá
    const showModal = (discount = null) => {
        console.log('Discount Object:', discount);
        setIsEditing(!!discount);
        setCurrentDiscount(discount);
        form.resetFields();

        // Lấy ID của sản phẩm từ discount (nếu có)
        const productId = discount ? discount._id : null;
        console.log('Product ID:', productId);  // In ID sản phẩm ra console để kiểm tra

        if (discount) {
            // Đảm bảo startDate và endDate là đối tượng moment hợp lệ
            form.setFieldsValue({
                ...discount,
                startDate: discount.startDate ? moment(discount.startDate) : null,
                endDate: discount.endDate ? moment(discount.endDate) : null,
            });
        }

        setIsModalVisible(true);
    };


    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Xử lý tạo hoặc cập nhật mã giảm giá
    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // Lấy productId từ currentDiscount nếu đang chỉnh sửa, nếu không lấy từ values khi tạo mới
            const productId = isEditing ? currentDiscount.productId : values.productId; // Dùng currentDiscount để lấy ID nếu chỉnh sửa

            // Kiểm tra nếu đang chỉnh sửa thì lấy _id của discount
            const discountId = isEditing ? currentDiscount._id : undefined;

            if (isEditing) {
                // Nếu đang chỉnh sửa discount
                await DiscountService.updateDiscount(access_token, {
                    ...values,
                    id: discountId,  // Truyền _id của khuyến mãi
                    productId: productId  // Truyền productId
                });
                message.success('Discount updated successfully');
            } else {
                // Nếu tạo mới discount, truyền productId vào
                await DiscountService.createDiscount(access_token, {
                    ...values,
                    productId: productId  // Truyền productId
                });
                message.success('Discount created successfully');
            }

            // Lấy lại danh sách mã giảm giá
            const data = await DiscountService.getAllDiscounts(access_token);
            setDiscounts(data.data);
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to save discount');
        }
    };



    // Xử lý xóa mã giảm giá
    const handleDelete = async (discountId) => {
        console.log('discountId', discountId)
        try {
            await DiscountService.deleteDiscount(access_token, discountId);
            message.success('Discount deleted successfully');
            const data = await DiscountService.getAllDiscounts(access_token);
            setDiscounts(data.data);
        } catch (error) {
            message.error('Failed to delete discount');
        }
    };

    // Cấu hình bảng
    const columns = [
        {
            title: 'Tên mã giảm giá',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Loại giảm giá',
            dataIndex: 'discountType',
            key: 'discountType',
        },
        {
            title: 'Giá trị giảm giá',
            dataIndex: 'discountValue',
            key: 'discountValue',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                console.log(record);  // Kiểm tra đối tượng record
                return (
                    <>
                        <Button onClick={() => showModal(record)}>Edit</Button>
                        <Button onClick={() => handleDelete(record._id)} danger style={{ marginLeft: 8 }}>
                            Delete
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
                Tạo mã giảm giá mới
            </Button>
            <Table columns={columns} dataSource={discounts} rowKey="_id" />

            <Modal
                title={isEditing ? 'Cập nhật mã giảm giá' : 'Tạo mã giảm giá'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={isEditing ? 'Cập nhật' : 'Tạo'}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên mã giảm giá"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên mã giảm giá' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Loại giảm giá"
                        name="discountType"
                        rules={[{ required: true, message: 'Vui lòng chọn loại giảm giá' }]}
                    >
                        <Select>
                            <Option value="percentage">Phần trăm</Option>
                            <Option value="amount">Số tiền</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Giá trị giảm giá"
                        name="discountValue"
                        rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Ngày bắt đầu"
                        name="startDate"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Ngày kết thúc"
                        name="endDate"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminDiscount;
