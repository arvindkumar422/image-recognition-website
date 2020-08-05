import React from 'react';
import './formStyle.css';

const ImageLinkForm = ({ input, onInputChange, onButtonClick, infoToDetect, onChangeModel, selectedModel }) => {
    return (
        <div>
            <div className='centerInfo'>
                <p className='f4'>
                    Paste the URL of a picture in the text field below to detect {infoToDetect}
                </p>
            </div>

            <div className='center br3 shadow-5'>
                <div className="row">
                    <input
                        value={input}
                        className='f4 pa2 w-80'
                        type='tex'
                        onChange={onInputChange} />
                    <button
                        className='grow f4 link ph3 pv2 dib btn-detect white w-20'
                        onClick={onButtonClick}>
                        Detect
                    </button>
                </div>
                <div className="row model-row-selection">
                    <div className="model-select">
                        <p className="model-text">
                            Select model
                        </p>
                    </div>
                    <div className="model-select model-select-btns">
                        <nav className="nav-pills nav-fill model-buttons">
                            <button
                                className={selectedModel === 'clarifai' ? 'active nav-item nav-link' : 'nav-item nav-link option-item'}
                                value="clarifai" onClick={onChangeModel}>
                                ClarifAI
                            </button>
                            <button
                                disabled={window.location.pathname === '/pattern'}
                                className={selectedModel === 'opencv' ? 'active nav-item nav-link' : 'nav-item nav-link option-item'}
                                value="opencv" onClick={onChangeModel}>
                                OpenCV
                            </button>
                        </nav>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ImageLinkForm;