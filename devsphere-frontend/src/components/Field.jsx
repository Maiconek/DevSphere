import React from "react";

const Field = (props) => {

    const capitalizeFieldName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
        <div className="mb-3">
                <label htmlFor={props.name} className="form-label">{capitalizeFieldName(props.name)}</label>
                {props.onChange !== null ?
                    <input type={props.type} className="form-control" id={props.name} name={props.name} value={props.value ? props.value : undefined} onChange={props.onChange}/>
                    :
                    <input type={props.type} className="form-control" id={props.name} name={props.name} value={props.value ? props.value : undefined}/>
                }
                {props.type === "email" ?
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    :
                    <></>
                }
        </div>
    )
}

export default Field;