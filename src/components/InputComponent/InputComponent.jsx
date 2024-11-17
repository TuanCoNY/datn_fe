import { Input } from 'antd';
import React from 'react';

const InputComponent = ({ size, placeholder, bordered, style, ...rests }) => {
    // Xử lý thuộc tính variant thay cho bordered
    const variant = bordered === false ? 'unstyled' : 'default';

    return (
        <Input
            size={size}
            placeholder={placeholder}
            variant={variant} // Thay thế bordered bằng variant
            style={style}
            {...rests}
        />
    );
};

export default InputComponent;
