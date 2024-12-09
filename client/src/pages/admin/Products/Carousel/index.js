import classNames from "classnames/bind";
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import styles from './Carousel.module.scss'
import { useState } from "react";

const cx = classNames.bind(styles);

function Carousel({data, width, height}) {
    const style = {
        width,
        // height
    }

    const [slide,setSlide] = useState(0);
    const nextSlide = () => {
        setSlide(prev => {
            let nextState;
            if (prev===data.length - 1) {
                nextState = 0;
            }
            else nextState= prev + 1;
            return nextState;
        });
    }

    const prevSlide = () => {
        setSlide(prev => {
            let nextState;
            if (prev===0) {
                nextState = data.length - 1;
            }
            else nextState= prev - 1;
            return nextState;
        });
    }
    const handledbclick = function (event) {
        console.log (event.target);
        event.preventDefault();  
        // event.stopPropagation(); 
    }
    return (
        <div className={cx('wrapper')} style={style} onClick={handledbclick}>

            {/* <div className={cx('button-switch', 'icon-left')} onClick={prevSlide}><BsChevronLeft className={cx('icon')}/></div> */}
            {/* {data.map((item, index) => {
                return <img key={index} src={item.src} alt={item.alt} className={cx('item')}/>
            })} */}
            {/* <img  src={data[slide].src} alt='' className={cx('item')} />
            <div className={cx('button-switch', 'icon-right')} onClick={nextSlide}><BsChevronRight className={cx('icon')}/></div> */}
            

            {/* <span className={cx('indicators')}>
                {data.map((_,index) => {
                    return <button key={index} onClick={() => setSlide(index)} className={cx('indicator', {
                        'indicator-inactive': slide!==index
                    })}></button>
                })}
            </span> */}
            <div>
                
            </div>
            
        </div>
    );
}

export default Carousel;