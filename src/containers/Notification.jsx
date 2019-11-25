import React from 'react';
import { connect } from 'react-redux';
import { setNotificacion } from '../actions';
import '../assets/styles/components/Notification.scss';

const Notificacion = ({ data, setNotificacion }) => {
	const handleClass = e => {
		const nameAnimation = e.animationName;
		if (nameAnimation === 'fadeout') {
			e.target.classList.remove(`notification__${data.type}`);
			setNotificacion({});
		}
	};

	return (
		<div
			onAnimationEnd={handleClass}
			className={`notification__${data.type} notification`}
		>
			<span>{data.message}</span>
		</div>
	);
};

const mapDispatchToProps = {
	setNotificacion,
};
export default connect(null, mapDispatchToProps)(Notificacion);
