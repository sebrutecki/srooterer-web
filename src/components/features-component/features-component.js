import React, { useState } from 'react';
import './features-component.css';

import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Redirect } from 'react-router-dom';

function Features() {

	const [featureSettings, setFeatureSettings] = useState({
		"redirect": false,
		"path": '',
	});

	const featuresStatic = [
		[
			{
				"slug": "tick-tack-toe",
				"label": "Tick Tack Toe",
				"icon": "border_inner_icon",
				"active": 'no',
			},
			{
				"slug": "wheel-of-fortune",
				"label": "Wheel of Fortune",
				"icon": "settings_backup_restore_icon",
				"active": 'no',
			},
			{
				"slug": "simple-xlsx-creator",
				"label": "Simple XLSX Creator",
				"icon": "assignment_icon",
				"active": 'no',
			}
		]
	]

	const [features, setFeatures] = useState(featuresStatic);

	const chooseFeature = (idx, innerIdx) => e => {
		featuresStatic[idx][innerIdx].active = 'yes';
		setFeatures(featuresStatic);
		setFeatureSettings({
			"redirect": true,
			"path": featuresStatic[idx][innerIdx].slug
		})
	};

	if (featureSettings.redirect === true && featureSettings.redirect) {
      return (
      	<Redirect push to={{
		    pathname: /home/ + featureSettings.path
		}} />
      )
    }

	const featureRows = features.map((featureRow, idx1) => {
		const features = featureRow.map((feature, innerIdx) => {
			return (
				<Grid item 
					xs={12} 
					sm={4} 
					lg={3} 
					className={feature.active === 'yes' ? 'active' : '' } 
					onClick={chooseFeature(idx1, innerIdx)} key={feature.slug} 
				>
		          	<Paper className="card">
		          		<span>{feature.label}</span>
		          		<Icon className="icon">{feature.icon}</Icon>
		          	</Paper>
		        </Grid>
			)
		});

		return (
			<Grid container item xs={12} spacing={3} key={idx1}>
				{features}
			</Grid>
		)
	});

  	return (
	    <div className="features">
	        <h2>
				Features
	        </h2>

	        <div>
	        	{featureRows}
		    </div>

	    </div>
	  );
}

export default Features;
