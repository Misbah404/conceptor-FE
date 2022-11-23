import NotFoundPage from '../../not-found'
import DashboardPage from "../pages/dashboard"
import LeadsManagerPage from "../pages/leads-manager"
import CreateLeadsPage from "../pages/leads-manager/pages/forms/create"
import EditLeadsPage from "../pages/leads-manager/pages/forms/edit"
import AIRecommendationPage from "../pages/ai-recommendation"
import CompanySubmissionPage from "../pages/company-submission"

const routes = [
    {
        path: '/',
        exact: true,
        component: (props) => <DashboardPage {...props}/>
    },
    {
        path: '/home',
        exact: true,
        component: (props) => <DashboardPage {...props}/>
    },
    {
        path: '/leads-manager',
        exact: true,
        component: (props) => <LeadsManagerPage {...props}/>
    },
    {
        path: '/leads-manager/create',
        exact: true,
        component: (props) => <CreateLeadsPage {...props}/>
    },
    {
        path: '/leads-manager/edit/:id',
        exact: true,
        component: (props) => <EditLeadsPage {...props}/>
    },
    {
        path: '/ai-recommendation',
        exact: true,
        component: (props) => <AIRecommendationPage {...props}/>
    },
    {
        path: '/company-submission',
        exact: true,
        component: (props) => <CompanySubmissionPage {...props}/>
    },
    {
        path: '*',
        component: () => <NotFoundPage />
    }
]

export default routes