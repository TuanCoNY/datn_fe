import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <div style={{ width: '100%', background: '#efefef' }}>
      <div style={{ width: '1270px', height: '100%', margin: '0 auto', fontWeight: 'bold', fontSize: '20px' }}>
        <h5>
          <span
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => { navigate('/'); }}
          >
            Trang chủ
          </span>
          <span style={{ fontWeight: 'normal' }}> - Chi tiết sản phẩm</span>
        </h5>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage