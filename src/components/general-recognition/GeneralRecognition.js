import React from 'react'

const GeneralRecognition = ({imgSource, concepts}) => {
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
                }}>
            </div>
        </div>
    )
};

export default GeneralRecognition;