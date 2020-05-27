import React from 'react';
import './formStyle.css';

const ImageLinkForm = ({ onInputChange, onButtonClick, infoToDetect }) => {
    return (
        <div>
            <div className='centerInfo'>
                <p className='f4'>
                    Enter URL of any picture to detect {infoToDetect}
                </p>
            </div>

            <div className='center pa4 br3 shadow-5'>
                <input
                    className='f4 pa2 w-80'
                    type='tex'
                    onChange={onInputChange} />
                <button
                    className='grow f4 link ph3 pv2 dib btn-detect white w-20'
                    onClick={onButtonClick}>
                    Detect
                </button>
            </div>
        </div>
    )
}

export default ImageLinkForm;