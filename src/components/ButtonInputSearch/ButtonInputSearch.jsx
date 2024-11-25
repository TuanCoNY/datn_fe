
import React from 'react'
import {
    SearchOutlined,
} from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';


const ButtonInputSearch = (props) => {
    const {
        size, placeholder, texbutton,
        bordered, backgroundColorInput = '#fff',
        backgroundColorButton = '#d70018',
        colorButton = '#000'
    } = props

    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput }}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
                icon={<SearchOutlined style={{ color: colorButton }} />}
                texbutton={texbutton}
                styletexbutton={{ color: colorButton }}
            />
        </div>
    )
}

export default ButtonInputSearch