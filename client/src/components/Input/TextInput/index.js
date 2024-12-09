import { useState } from 'react';
import styles from './TextInput.module.scss';
import classNames from 'classnames/bind';
import { AiFillExclamationCircle, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const cx = classNames.bind(styles);

function TextInput({ placeHolder, icon, secure, type, value, register, name, defaultValue, error , handleChange}) {
    const [hide, setHide] = useState(true);
    return (
        <>
            {
                type === 'type_1' ? (
                    <div>
                        <div className={cx(`${type}_form-field`)}>
                            {icon && <div className={cx(`${type}_form-icon`)}>{icon}</div>}
                            <input
                                type={`${secure && hide ? 'password' : 'text'}`}
                                className={cx(`${type}_form-input`)}
                                placeholder='   '
                                defaultValue={value}
                                {...register}
                                name={name}
                                style={{ borderColor: `${error ? "#a9252b" : ""}`, outlineColor: `${error ? "#a9252b" : ""}` }} />
                            <label for="name" className={cx(`${type}_form-label`)}>{placeHolder}</label>
                            {
                                secure ?
                                    <div className={cx(`${type}_eye`)} onClick={() => setHide(!hide)}>
                                        {
                                            hide ? <AiOutlineEyeInvisible className={cx(`${type}_iconHide`)} /> : <AiOutlineEye className={cx(`${type}_iconHide`)} />
                                        }
                                    </div>
                                    : null
                            }

                        </div>
                        {error && <span style={{ display: 'flex', marginLeft: '4px', flexDirection: 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '8px' }}><AiFillExclamationCircle />{error}</span>}

                    </div>
                ) :
                    type === 'type_2' ?
                        (
                            <div>
                                <div className={cx(`${type}_form-field`)}>
                                    <input
                                        type={`${secure && hide ? 'password' : 'text'}`}
                                        className={cx(`${type}_form-input`)}
                                        placeholder='   ' value={value}
                                        onChange={handleChange}
                                        defaultValue={defaultValue}
                                        {...register}
                                        name={name}
                                        style={{ borderColor: `${error ? "#a9252b" : ""}`, outlineColor: `${error ? "#a9252b" : ""}` }} />
                                    <label for="name" className={cx(`${type}_form-label`)}>{placeHolder}</label>
                                    {
                                        secure ?
                                            <div className={cx(`${type}_eye`)} onClick={() => setHide(!hide)}>
                                                {
                                                    hide ? <AiOutlineEyeInvisible className={cx(`${type}_iconHide`)} /> : <AiOutlineEye className={cx(`${type}_iconHide`)} />
                                                }
                                            </div>
                                            : null
                                    }
                                </div>
                                {error && <span style={{ display: 'flex', marginLeft: '4px', flexDirection: 'row', alignItems: 'center', fontSize: '14px', color: '#a9252b', marginTop: '8px' }}><AiFillExclamationCircle />{error}</span>}
                            </div>
                        ) : null
            }
        </>
    );
}

export default TextInput;