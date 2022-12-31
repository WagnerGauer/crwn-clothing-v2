import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => { //because I have label before ...otherProps, the key value pair: label will not be inside of 
    console.log({ ...otherProps })
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`} htmlFor="">{label}</label>
            )}
        </div >
    )
};

export default FormInput;

