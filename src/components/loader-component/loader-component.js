import React, { useContext } from 'react'
import './loader-component.css';

import { ReactComponent as LoaderSvg } from '../../assets/logo.svg';

import { GlobalContext } from '../../providers/global-provider';

import Transition from '../transition-component/transition-component';

function Loader() {

	const [settings, setSettings] = useContext(GlobalContext)
	
	if (!settings.isLoaded) {
		setTimeout(() => {
			setSettings({
		      isLoaded: true,
		    });
		}, 0);
	};

	return (
		<div>
			<div className={settings.isLoaded === true ?  "loader loaded" :  "loader active"}>
				<LoaderSvg className="svg-loader"></LoaderSvg>
			</div>
			<Transition/>
		</div>
	);

}

export default Loader;
