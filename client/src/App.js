import React from 'react'
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom'
import { Container } from "@material-ui/core"
import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <GoogleOAuthProvider clientId="252200147164-que9boustdvr7ome8sm58ftnr7dhkltj.apps.googleusercontent.com">
            <BrowserRouter>
                <Container>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={()=> <Redirect to='/posts'/>} />
                        <Route path="/posts" exact component={Home} />
                        <Route path="/posts/search" exact component={Home} />
                        <Route path="/posts/:id" exact component={PostDetails} />
                        <Route path="/auth" exact component={() => (!user?.result?.name ?  <Auth/> : <Redirect to="/posts"/>)} /> 
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App
