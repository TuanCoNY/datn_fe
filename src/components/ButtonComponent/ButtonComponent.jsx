import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, styletexbutton, texbutton, disabled, ...rest }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background
            }}
            size={size}
            //style={styleButton}
            {...rest}
        >
            <span style={styletexbutton}>{texbutton}</span>
        </Button>
    )
}

export default ButtonComponent