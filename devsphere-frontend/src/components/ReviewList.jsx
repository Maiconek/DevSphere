import React, {useEffect, useState} from "react";

const ReviewList = (props) => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            let response = await fetch(`http://localhost:8080/api/v1/reviews/projects/${props.id}`, {
                method: 'GET',
                'headers': {
                    'Authorization': "Bearer " + props.token,
                },
            })
            let data = await response.json()
            setReviews(data)
            console.log(data)
        }
        catch (error) {
            console.error('Błąd połączenia:', error);
        }
    }

    return (
        <div className="reviews-list mt-2">
            <ul className="list-group">
                {reviews.map(((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="me-auto">
                            <div className="d-flex justify-content-start mb-2">
                                <img className="review-profile-image" src={item.userDto.imageUrl}></img>
                                <div className="fw-bold m-2">{item.userDto.firstName} {item.userDto.lastName}</div>
                            </div>
                            <span className="ms-1">{item.content}</span>
                        </div>
                        <span class="badge text-bg-primary rounded-pill">Score: {item.score}/5</span>
                        
                    </li>
                )))}
            </ul>    
        </div>
    )
}

export default ReviewList;