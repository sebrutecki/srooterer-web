import React from 'react';
import './main-component.css';

import Nav from '../navigation-component/navigation-component';
import Footer from '../footer-component/footer-component';
import Loader from '../loader-component/loader-component';

import { GlobalProvider } from '../../providers/global-provider';

function Main() {
  	return (
		<GlobalProvider>
		    <div className="main">
		    	<Loader/>
		    	<Nav/>
		        <Footer/>
		    </div>
	    </GlobalProvider>
	 );
}

export default Main;
