import React from "react";

const TextareaField = (props) => {

    const capitalizeFieldName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">{capitalizeFieldName(props.name)}</label>
            {props.onChange !== null ?
                <textarea 
                    type={props.type} 
                    className="form-control" 
                    id={props.name} 
                    name={props.name}
                    value={props.value ? props.value : undefined}
                    onChange={props.onChange}
                />  :
                <textarea 
                    type={props.type} 
                    className="form-control" 
                    id={props.name} 
                    name={props.name}
                    value={props.value ? props.value : undefined}
                />
            }
        </div>
    )
}

export default TextareaField