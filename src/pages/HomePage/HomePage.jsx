import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import {
  ResetButton,
  SelectSort,
  WrapperButtonMore,
  WrapperProducts,
  WrapperSortOptions,
  WrapperTypeProduct
} from './style';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { DownCircleOutlined } from '@ant-design/icons';
import slider1 from '../../assets/images/slider1.webp';
import slider2 from '../../assets/images/slider2.webp';
import slider3 from '../../assets/images/slider3.webp';
import slider4 from '../../assets/images/slidet1.webp';
import slider5 from '../../assets/images/logo1.webp';
import slider6 from '../../assets/images/log2.webp';
import slider7 from '../../assets/images/lo3.webp';
import slider8 from '../../assets/images/lo4.webp';
import slider9 from '../../assets/images/lo9.webp';

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);
  const [sortOption, setSortOption] = useState('selled'); // Default sort by selled
  const [showSortOptions, setShowSortOptions] = useState(false);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === 'OK') {
      setTypeProducts(res?.data);
    }
  };

  const { isPending, data: products, isPreviousData } = useQuery({
    queryKey: ['products', limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  // Sắp xếp sản phẩm theo lựa chọn
  const sortedProducts = [...(products?.data || [])].sort((a, b) => {
    if (sortOption === 'selled') {
      return b.selled - a.selled;
    } else if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    return 0;
  });

  const handleSortChange = (event) => {
    setSortOption(event.target.value); // Cập nhật sort option khi người dùng chọn
  };

  // Hàm reset lại giá trị mặc định
  const handleReset = () => {
    setSortOption('selled'); // Reset về mặc định (sắp xếp theo số lượng bán)
    setLimit(6); // Reset số lượng sản phẩm hiển thị
  };

  const handleToggleSortOptions = () => {
    setShowSortOptions((prev) => !prev); // Đảo trạng thái ẩn/hiện dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowSortOptions(false); // Đóng dropdown nếu click ra ngoài
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside); // Dọn dẹp sự kiện
    };
  }, []);

  return (
    <Loading isPending={isPending || loading}>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
      </div>

      <div className="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
        <div id="container" style={{ width: '1270px', margin: '0 auto' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1270px', margin: '0 20px' }}>
              <SliderComponent
                arrImages={[slider1, slider2, slider3, slider4, slider5, slider6, slider7, slider8, slider9]}
              />
            </div>
          </div>

          {/* Dropdown để chọn cách sắp xếp */}
          <div className="dropdown-container" style={{ position: 'relative' }}>
            <DownCircleOutlined
              onClick={handleToggleSortOptions}
              style={{ fontSize: '24px', cursor: 'pointer', marginRight: '10px' }}
            />
            {showSortOptions && (
              <WrapperSortOptions>
                <SelectSort
                  value={sortOption}
                  onChange={handleSortChange}
                  style={{ padding: '10px', fontSize: '16px' }}
                >
                  <option value="selled">Sắp xếp theo số lượng bán</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                </SelectSort>

                <ResetButton
                  onClick={handleReset}
                  style={{
                    padding: '10px 20px',
                    marginLeft: '10px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Reset
                </ResetButton>
              </WrapperSortOptions>
            )}
          </div>

          <WrapperProducts>
            {sortedProducts.map((product) => (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
                id={product._id}
              />
            ))}
          </WrapperProducts>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore
              texbutton={isPreviousData ? 'Load more' : 'Xem thêm'}
              type="outline"
              styleButton={{
                border: '1px solid rgb(11, 116, 229)',
                color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11, 116, 229)'}`,
                width: '240px',
                height: '38px',
                borderRadius: '4px',
              }}
              disabled={products?.total === products?.data?.length || products?.totalPage === 1}
              styletexbutton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
