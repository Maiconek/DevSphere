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
                    <li key={index} className="list-group-item">
                        {item.content} - Score {item.score} - Author: {item.userDto.firstName} {item.userDto.lastName}
                    </li>
                )))}
            </ul>    
        </div>
    )
}

export default ReviewList;