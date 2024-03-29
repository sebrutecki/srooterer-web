import React, { useEffect } from 'react';
import './transition.component.css';

function Transition(props) {

	const ease = {
	  cubicOut: (t) => {
	    const f = t - 1.0;
	    return f * f * f + 1.0;
	  },
	  cubicInOut: (t) => {
	    return t < 0.5
	      ? 4.0 * t * t * t
	      : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
	  }
	}

	class TransitionEffect {
	  constructor(elm) {
	    this.elm = elm;
	    this.path = elm.querySelectorAll('path');
	    this.numPoints = 2;
	    this.duration = 2000;
	    this.delayPointsArray = [];
	    this.delayPointsMax = 500;
	    this.delayPerPath = 300;
	    this.timeStart = Date.now();
	    this.isOpened = true;
	    this.isAnimating = false;
	  }
	  toggle() {
	    this.isAnimating = true;
	    for (var i = 0; i < this.numPoints; i++) {
	      this.delayPointsArray[i] = 0;
	    }
	    if (this.isOpened === false) {
	      this.open();
	    } else {
	      this.close();
	    }
	  }
	  open() {
	    this.isOpened = true;
	    this.elm.classList.add('is-opened');
	    this.timeStart = Date.now();
	    this.renderLoop();
	  }
	  close() {
	    this.isOpened = false;
	    this.elm.classList.remove('is-opened');
	    this.timeStart = Date.now();
	    this.renderLoop();
	  }
	  updatePath(time) {
	    const points = [];
	    for (var i = 0; i < this.numPoints; i++) {
	      const thisEase = this.isOpened ? 
	                        (i === 1) ? ease.cubicOut : ease.cubicInOut:
	                        (i === 1) ? ease.cubicInOut : ease.cubicOut;
	      points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
	    }

	    let str = '';
	    str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
	    for (var j = 0; j < this.numPoints - 1; j++) {
	      const p = (j + 1) / (this.numPoints - 1) * 100;
	      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
	      str += `C ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]} `;
	    }
	    str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
	    return str;
	  }
	  render() {
	    if (this.isOpened) {
	      for (var i = 0; i < this.path.length; i++) {
	        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
	      }
	    } else {
	      for (var j = 0; j < this.path.length; j++) {
	        this.path[j].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - j - 1))));
	      }
	    }
	  }
	  renderLoop() {
	    this.render();
	    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
	      requestAnimationFrame(() => {
	        this.renderLoop();
	      });
	    }
	    else {
	      this.isAnimating = false;
	    }
	  }
	}

	useEffect(() => {
		const elmOverlay = document.querySelector('.shape-overlays');
		const overlay = new TransitionEffect(elmOverlay);

		if (overlay.isAnimating) {
	      return false;
	    }
	    overlay.toggle();

	});

	return (
	    <div className="transition">
	    	<svg className="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
				<path className="shape-overlays__path"></path>
				<path className="shape-overlays__path"></path>
				<path className="shape-overlays__path"></path>
				<path className="shape-overlays__path"></path>
			</svg>
	    </div>
	  );
}

export default Transition;
