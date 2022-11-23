import React from 'react'

import Loader from '../assets/images/loader.gif'

const PageLoader = () => {
    return (
        <div className='page-loader'>
            <img src={Loader} />
        </div>
    )
}

export default PageLoader