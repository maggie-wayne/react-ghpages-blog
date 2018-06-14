import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import FooterBar from './components/FooterBar'
import HeaderContainer from './containers/HeaderContainer'
import PostsListContainer from './containers/PostsListContainer'
import PostsContentContainer from './containers/PostsContentContainer'

import './style/main.less'

class App extends Component {
    render () {
        return (
        <Router>
            <div className="main-container">
                <HeaderContainer />
                <Switch>
                    <Route 
                        path="/*.md"
                        component={PostsContentContainer}
                    />
                    <Route
                        path="/*"
                        component={PostsListContainer}
                    />
                </Switch>
                <FooterBar/>
            </div>
        </Router>
        )
    }
}

export default App