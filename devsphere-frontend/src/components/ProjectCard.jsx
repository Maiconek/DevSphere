import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
    return (
        <div className="col">
        
            {/* <Link to={`/project/${props.id}`}> */}
                <div className="card" key={props.id}>
                    {props.image && (
                        <img src={props.image} className="card-image-top" alt="image"/>
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.intro}</p>
                        <Link to={`/project/${props.id}`}><button type="button" className="btn btn-primary">Visit</button></Link>
                    </div>
                </div>
            {/* </Link> */}
        </div>
    )
}

export default ProjectCard;