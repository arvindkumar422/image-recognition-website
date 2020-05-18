import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({imgSource, box}) => {
    return (
        <div className='absolute mt2'>
            <img
                className='image'
                id='image'
                alt=''
                width='500px'
                height='auto'
                src={imgSource}/>
            <div
                className='face-box'
                style={{
                    bottom: box.bottomRow,
                    top: box.topRow,
                    right: box.rightCol,
                    left: box.leftCol
                }}>
            </div>
        </div>
    )
};

export default FaceRecognition;