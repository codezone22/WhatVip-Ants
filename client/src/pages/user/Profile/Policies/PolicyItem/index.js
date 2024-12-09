import { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from './PolicyItem.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function PolicyItem({props}) {
    const [item, setItem] = useState({});
    const [popup, setPopup] = useState(false);
    useEffect(() => {
        props ? setItem({...props}) : setItem({
            question: "",
            answer: "",
        })
    }, [props])
    return ( <>
        <div className={cx('container')}>
            <div className={cx('outer_header', `${popup ? 'pop_head' : ''}`)} onClick={() => setPopup(!popup)}>
                <span className={cx('question')}>{item.question}</span>
                {
                    !popup ? <AiOutlinePlus className={cx('icon_plus')}/> : <AiOutlineMinus className={cx('icon_plus')}/>
                }
                
            </div>
            {
                popup ? <hr style={{width: '100%', height: '1px', backgroundColor: '#F1f1f1', margin: 0}}/> : null
            }
          
            <p className={cx('content', `${popup ? 'pop_content' : ''}`)}>
                {item.answer}
            </p>
        </div>
    </>);
}

export default PolicyItem;