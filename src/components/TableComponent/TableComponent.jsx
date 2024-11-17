import { Table } from 'antd';
import React from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useState } from 'react';
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], isPending = false, columns = [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    })
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)

    }
    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };
    return (
        <Loading isPending={isPending}>
            {rowSelectedKeys.length > 0 && (
                <div style={{
                    background: '#1d1ddd',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '10px',
                    cursor: 'pointer'
                }}
                    onClick={handleDeleteAll}>
                    Xóa tất cả
                </div>
            )}
            <button
                onClick={exportExcel}
                style={{
                    float: "right",
                    backgroundColor: "#4CAF50", // Màu xanh lá cây
                    color: "white", // Màu chữ trắng
                    border: "none", // Bỏ viền
                    padding: "10px 20px", // Khoảng cách bên trong nút
                    fontSize: "16px", // Cỡ chữ
                    borderRadius: "5px", // Bo góc
                    cursor: "pointer", // Con trỏ tay khi hover
                    transition: "background-color 0.3s ease, transform 0.2s ease", // Hiệu ứng hover
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#45a049"; // Xanh đậm hơn khi hover
                    e.currentTarget.style.transform = "scale(1.05)"; // Phóng to nhẹ
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#4CAF50"; // Quay lại màu ban đầu
                    e.currentTarget.style.transform = "scale(1)"; // Kích thước ban đầu
                }}
            >
                Export Excel
            </button>

            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    )
}

export default TableComponent