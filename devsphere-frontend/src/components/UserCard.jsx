import React from "react";
import { Link } from "react-router-dom";

const UserCard = (props) => {
    return (
        <div className="col-sm mb-3" key={props.id}>
            <div className="card">
            {props.image && (
                        <img src={props.image} className="card-image-top" alt="image"/>
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{props.firstName} {props.lastName}</h5>
                        <p className="card-text">{props.email}</p>
                        <Link to={`/users/${props.id}`}><button type="button" className="btn btn-primary">Visit</button></Link>
                    </div>
            </div>
        </div>
    )
}

export default UserCard