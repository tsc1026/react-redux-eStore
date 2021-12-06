import React from 'react'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'

import './index.css'
import App from './App'
import store from './redux/store';
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

//dev-4uf260zd.us.auth0.com
//z1zQaRd3LMWn744lth2BfKhcMwTEg76b

ReactDOM.render(
<Auth0Provider
    //domain="dev-4uf260zd.us.auth0.com"
    //clientId="z1zQaRd3LMWn744lth2BfKhcMwTEg76b"
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
>
    <UserProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </UserProvider>
</Auth0Provider>
, document.getElementById('root'))
