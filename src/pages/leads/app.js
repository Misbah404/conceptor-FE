import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Content from './content'

import MainLayout from '../../components/leads-layout'

const LeadsPage = () => {

    return (
        <React.Fragment>
            <Router basename="/leads">
                <MainLayout>
                    <Content />
                </MainLayout>
            </Router>
        </React.Fragment>
    )
}

export default LeadsPage
