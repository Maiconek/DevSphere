import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
    return (
        <div className="col-sm mb-3" key={props.id}>
            <Link to={`/project/${props.id}`}>
                <div className="card">
                    <p>{props.title}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProjectCard;