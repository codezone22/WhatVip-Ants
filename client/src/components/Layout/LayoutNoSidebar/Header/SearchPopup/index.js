import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import baseUrl from '~/utils/baseUrl';
import ItemSearch from './ItemSearch';
import styles from './SearchPopup.module.scss';

const cx = classNames.bind(styles);

function SearchPopup({ onMouseLeave , searchKey }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [withWindow,setWithWindow] = useState(window.innerWidth)
    useEffect(() => {
      function handleResize() {
        setWithWindow(window.innerWidth)
      }
    
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleSearch = async () => {
      console.log(searchKey)
      try {
        setLoading(true);
        if (searchKey && searchKey.trim() !== '') {
          const response = await axios.get(`${baseUrl}/api/products/search/${searchKey}`);
          if(response.data){
            setSearchResults(response.data.data);
          }
        } else {
          setSearchResults([]); 
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      handleSearch();
    }, [searchKey]);
  
    return (
      <div onMouseMove={() => onMouseLeave()} className={cx('wrapper')}>
        <div onMouseMove={(e) => e.stopPropagation()} className={cx('inner')}>
          <div className={cx('separate')}></div>
          <div className={cx('title')}>Sản phẩm</div>
          <div className={cx('list-product-filter')}>
            {searchResults?.map((result, index) => {
              if (withWindow >= 768) {
                if (index <= 2) {
                  return <ItemSearch key={result._id} result={result} />;
                }
              }
              else {
                if (index === 0) {
                  return <ItemSearch key={result._id} result={result} />;
                }
              }
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <div className={cx('btn-view-all')}>Xem tất cả</div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SearchPopup;