/*
default

inverted

google sign in
*/

// by creating this object it allows me to assign a classname that I feel is more descriptive and I am not forced to provive the name
// I will use as a classname whenever I make a new button

import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}


const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType] ? BUTTON_TYPE_CLASSES[buttonType] : ''}`}
            {...otherProps}> {children}</button >
    )
}

export default Button;