import React from "react";

const UserCard = (props) => {
    return (
        <div className="col-sm mb-3" key={props.key}>
            <div className="card">
                <p>{props.email}</p>
            </div>
        </div>
    )
}

export default UserCard