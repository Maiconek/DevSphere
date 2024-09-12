import React from "react";

const ProjectCard = (props) => {
    return (
        <div className="col-sm mb-3" key={props.id}>
            <div className="card">
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default ProjectCard;