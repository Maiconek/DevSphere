import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = (props) => {
    return (
        <div className="col">
        
            <Link to={`/project/${props.id}`} className="text-decoration-none">
                <div className="card" key={props.id}>
                    {props.image && (
                        <img src={props.image} className="card-image-top" alt="image"/>
                    )}
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.intro}</p>
                        {/* <Link to={`/project/${props.id}`}><button type="button" className="btn btn-primary">Visit</button></Link> */}
                        <div>
                            {props.tags && props.tags.map((item, index) => (
                                <p key={index} className="badge bg-secondary me-2 mt-2">{item.name}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProjectCard;