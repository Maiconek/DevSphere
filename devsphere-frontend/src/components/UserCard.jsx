import React from "react";
import { Link } from "react-router-dom";

const UserCard = (props) => {
    return (
        <div className="col-sm mb-3">
            <Link to={`/users/${props.id}`} className="text-decoration-none">
                <div className="card" key={props.id}>
                    {props.image && (
                        <img src={props.image} className="card-image-top image-size" alt="image"/>
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{props.firstName} {props.lastName}</h5>
                        <p className="card-text">{props.email}</p>
                        {/* <button type="button" className="btn btn-primary">Visit</button> */}
                    </div>
            </div>
            </Link>
        </div>
    )
}

export default UserCard