import React, {useState} from "react";
import C from "../../Card/Card.module.css";
import {formatDate} from "../../../utils/formatters";
import {Redirect} from "react-router-dom";

function Topic(props) {

    const [chosenTopic, setChosenTopic] = useState(false)
    const {
        topicTitle,
        topicId,
        createdAt,
        color,
        isColorLight,
        authorName,
        image,
        tags,
    } = props;

    const handleClick = () => {
        setChosenTopic(true)
    }

    return (
        <>
            {chosenTopic && <Redirect to={`/topics/${topicId}`}/>}
            {!chosenTopic && <>
                <div
                    style={{
                        'min-height': "100px",
                        'min-width': '250px',
                        width: "23%",
                        backgroundColor: color,
                        color: isColorLight ? 'black' : '#d0d0d0',
                    }}
                    className={C.card}
                    onClick={handleClick}
                >
                    <h2 className={C.cardTitle}>{topicTitle}</h2>
                    <div className={C.cardFooter}>
                        <div>Автор: {authorName}</div>
                        <div className={C.cardDate}>{formatDate(createdAt)}</div>
                    </div>
                </div>
            </>}
        </>
    )
        ;
}


export default Topic;
