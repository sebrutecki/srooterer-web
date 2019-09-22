import React from 'react';
import './navigation-component.css';

import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import Features from '../features-component/features-component';
import Settings from '../settings-component/settings-component';
import TickTackToe from '../features-component/tick-tack-toe-component/tick-tack-toe-component';
import WheelOfFortune from '../features-component/wheel-of-fortune-component/wheel-of-fortune-component';
import SimpleXlsxCreator from '../features-component/simple-xlsx-creator-component/simple-xlsx-creator-component';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { BrowserRouter as Router, Route, Redirect, NavLink, Switch} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Nav() {
  return (

    <Router>
        <div className="nav">
        	<div className="logo">
            <NavLink  to="/home">
                <Logo></Logo>
            </NavLink >
        	</div>

        	<ul>
        		<li>
              <NavLink  to="/home">
                  <HomeIcon></HomeIcon>
                  Home
              </NavLink >
        		</li>
            <li>
              <NavLink  to="/settings">
                  <SettingsIcon></SettingsIcon>
                  Settings
              </NavLink >
            </li>
        	</ul>
        </div>

        <div className="container">
            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition 
                        key={location.key} 
                        timeout={500} 
                        classNames="fade"
                    >
                        <Switch location={location}>
                          <Route path="/home/tick-tack-toe" exact component={TickTackToe} />
                          <Route path="/home/wheel-of-fortune" exact component={WheelOfFortune} />
                          <Route path="/home/simple-xlsx-creator" exact component={SimpleXlsxCreator} />
                          <Route exact path="/settings" component={Settings} />
                          <Route exact path="/home" component={Features}/>
                          <Redirect from='*' to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            )} />
        </div>
        
    </Router>
  );
}

export default Nav;
