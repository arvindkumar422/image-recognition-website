import React from 'react'

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='maroon f3'>
                {'Your current rank is : '}
            </div>
            <div className='red f1'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;