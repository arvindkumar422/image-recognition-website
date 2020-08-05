import React from 'react';
import './home-text.css'

const HomeText = () => {
    return (
        <div className='home-text'>
            <div className='f3'>
                <p className='hometextp'>
                    {'Welcome to "Recognize anything?"!'}
                </p>
                <p className='hometextp'>
                    {
                        'This website is all about showcasing how easy it is for a computer to detect things in ' +
                        'pictures(things even you or I may not be able to!). Detecting a person\'s face and probable age, ' +
                        'food and what\'s in that food, patterns in a photo, or just some random thing on this planet - this app can' +
                        '(probably!) do them all.'
                    }
                </p>
                <p className='hometextp'>
                    If you want to test it out, just find a picture online of anyone or anything you feel like,
                    copy its URL<strong>(make sure it includes a \'.png\' or \'.jpg\' filename extension at the end)</strong>,
                    click on the appropriate tab on the website (\'Face\' if you want to detect face(s)), paste
                    your copied URL, click on Detect, and watch watch happens(hopefully something).

                </p>
            </div>
            <div className='red f1'>
            </div>
        </div>
    );
}

export default HomeText;