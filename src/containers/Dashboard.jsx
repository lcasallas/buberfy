import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import Header from '../components/Header';
import ContainerDashboard from '../components/ContainerDashboard';
import ContainerDashboardLeft from '../components/ContainerDashboardLeft';
import ContainerDashboardRight from '../components/ContainerDashboardRight';
import ContainerDataTrip from '../components/ContainerDataTrip';
import Input from '../components/Input';
import Button from '../components/Button';
import CardContainer from '../components/CardContainer';
import CardTwoLines from '../components/CardTwoLines';
import CardThreeLines from '../components/CardThreeLines';

import '../assets/styles/components/Dashboard.scss';
import CarIcon from '../assets/static/iconCar.png';
import CashIcon from '../assets/static/iconCash.png';
import FlagIcon from '../assets/static/iconFlag.png';
import DriverImg from '../assets/static/userProfile.jpeg';

const Dashboard = ({ google }) => {
	const [form, setValues] = useState({
		direccionOrigen: '',
		direccionDestino: '',
	});

	const handleChange = event => {
		setValues({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const handleConfirmTrip = () => {
		console.log('Confirma Viaje');
	};

	const handleSubmit = event => {
		event.preventDefault();
		console.log('Consulta Viaje');
	};

	return (
		<>
			<Header />
			<ContainerDashboard>
				<ContainerDashboardLeft>
					<div className='container__menu-trip'>
						<div className='container__menu-trip-options'>
							<h2>Detalle Viaje</h2>
							<form onSubmit={handleSubmit}>
								<Input
									type='text'
									placeholder='Direcci&oacute;n Origen'
									handleChange={handleChange}
									name='direccionOrigen'
								/>
								<Input
									type='text'
									placeholder='Direcci&oacute;n Destino'
									handleChange={handleChange}
									name='direccionDestino'
								/>
								<h2>Tipo de Viaje</h2>
								<CardContainer>
									<CardTwoLines
										image={CarIcon}
										title='Comparte'
										subtitle='Tarifa dividida m&aacute;s econ&oacute;mica.'
									/>
								</CardContainer>
								<CardContainer>
									<CardTwoLines
										image={CarIcon}
										title='Personal'
										subtitle='Tarifa econ&oacute;mica.'
									/>
								</CardContainer>
								<CardContainer>
									<CardTwoLines
										image={CarIcon}
										title='Confort'
										subtitle='Tarifa plus.'
									/>
								</CardContainer>
								<Button
									style='button-morado'
									type='submit'
									textValue='Consultar Viaje'
								/>
							</form>
							<Button
								style='button-verde'
								type='button'
								textValue='Confirmar Viaje'
								handleClick={handleConfirmTrip}
							/>
						</div>
						<div></div>
						<div></div>
					</div>
				</ContainerDashboardLeft>
				<ContainerDashboardRight>
					<div className='map'>
						<Map
							google={google}
							zoom={4}
							initialCenter={{ lat: 19.5943885, lng: -97.9526044 }}
						/>
					</div>
					<ContainerDataTrip>
						<CardTwoLines
							image={CashIcon}
							title='$ 25.000'
							subtitle='Tarifa estimada del viaje.'
						/>
						<CardTwoLines
							image={FlagIcon}
							title='37 min.'
							subtitle='Tiempo estimado de llegada.'
						/>
						<CardThreeLines
							image={CarIcon}
							title='Chevrolet Spark GT.'
							subtitle='ELX 890'
							detail='Automovil Asignado.'
						/>
						<CardThreeLines
							image={DriverImg}
							title='Uber Contreras'
							subtitle='4.95'
							detail='Conductor Asignado'
							classes='data-trip__item-imgProfile'
							score={true}
						/>
					</ContainerDataTrip>
				</ContainerDashboardRight>
			</ContainerDashboard>
		</>
	);
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw',
})(Dashboard);
