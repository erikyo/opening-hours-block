import {
	__experimentalDivider as Divider,
	PanelBody,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { OpeningHours } from './components/openingHours';
import { TimeInput } from './components/timeInput';
import { Row, RowItem, Rows, TimeDefaults, View } from './types';
import { __ } from '@wordpress/i18n';
import { daysOfWeek } from './constants';

export function Edit( {
	attributes,
	setAttributes,
}: {
	attributes: {
		hours: Rows;
		view: View;
		defaults: TimeDefaults;
	};
	setAttributes: ( attributes: any ) => null;
} ) {
	const { hours = {}, view, defaults } = attributes;

	const initDayHours = ( state = false ): Row => [
		{
			open: defaults.morningOpen,
			close: defaults.morningClose,
			disabled: state,
		},
		{
			open: defaults.afternoonOpen,
			close: defaults.afternoonClose,
			disabled: state,
		},
	];

	const updateHour = (
		day: number,
		index: number,
		field: keyof RowItem,
		value: string
	) => {
		const newHours: Rows = { ...hours };
		if ( ! newHours[ day ] ) {
			newHours[ day ] = initDayHours();
		}
		( newHours[ day ][ index ][ field ] as typeof value ) = value;
		setAttributes( { hours: newHours } );
	};

	const togglePeriodDisabled = ( day: number, index: number ) => {
		if ( ! hours[ day ] ) {
			hours[ day ] = initDayHours( true );
		}
		updateHour(
			day,
			index,
			'disabled',
			! hours[ day ][ index ]?.disabled ?? false
		);
	};

	const toggleClosed = ( day: number ) => {
		const newHours: Rows = { ...hours };
		newHours[ day ] = newHours[ day ] === null ? initDayHours() : null;
		setAttributes( { hours: newHours } );
	};

	/**
	 * Update the default value for a field
	 * @param field - The field to update
	 * @param value - The new value
	 */
	const updateDefault = ( field: string, value: string ) => {
		const newDefaults = { ...defaults, [ field ]: value };
		setAttributes( { defaults: newDefaults } );
	};

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'opening-hours-block' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'View Mode', 'opening-hours-block' ) }
						value={ view }
						options={ [
							{ label: 'Today', value: 'today' },
							{ label: 'Week', value: 'week' },
						] }
						onChange={ ( newView ) =>
							setAttributes( { view: newView } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Default Times', 'opening-hours-block' ) }
					initialOpen={ false }
				>
					<p>
						{ __(
							'These values are used when a time field is empty.',
							'opening-hours-block'
						) }
					</p>
					<div className="default-time-controls">
						<label htmlFor={ 'morning-open-' + view }>
							{ __( 'Morning Open', 'opening-hours-block' ) }
						</label>
						<TimeInput
							id={ 'morning-open-' + view }
							value={ defaults.morningOpen || '' }
							onChange={ ( val ) =>
								updateDefault( 'morningOpen', val )
							}
						/>
						<label htmlFor={ 'morning-close-' + view }>
							{ __( 'Morning Close', 'opening-hours-block' ) }
						</label>
						<TimeInput
							id={ 'morning-close-' + view }
							value={ defaults.morningClose || '' }
							onChange={ ( val ) =>
								updateDefault( 'morningClose', val )
							}
						/>
						<Divider />
						<label htmlFor={ 'afternoon-open' + view }>
							{ __( 'Afternoon Open', 'opening-hours-block' ) }
						</label>
						<TimeInput
							id={ 'afternoon-open' + view }
							value={ defaults.afternoonOpen || '' }
							onChange={ ( val ) =>
								updateDefault( 'afternoonOpen', val )
							}
						/>
						<label htmlFor={ 'afternoon-close-' + view }>
							{ __( 'Afternoon Close', 'opening-hours-block' ) }
						</label>
						<TimeInput
							id={ 'afternoon-close-' + view }
							value={ defaults.afternoonClose || '' }
							onChange={ ( val ) =>
								updateDefault( 'afternoonClose', val )
							}
						/>
					</div>
				</PanelBody>

				<PanelBody
					title={ __( 'Opening Hours', 'opening-hours-block' ) }
					initialOpen={ true }
				>
					<table className="opening-hours-table">
						<thead>
							<tr>
								<th>{ __( 'Day', 'opening-hours-block' ) }</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ daysOfWeek.map( ( day, i ) => {
								const isClosed = hours[ i ] === null;
								const morning = hours[ i ]?.[ 0 ] || {
									open: defaults.morningOpen,
									close: defaults.morningClose,
									disabled: true,
								};
								const afternoon = hours[ i ]?.[ 1 ] || {
									open: defaults.afternoonOpen,
									close: defaults.afternoonClose,
									disabled: true,
								};

								return (
									<tr
										key={ i }
										className={
											'oh-row' +
											( isClosed ? ' oh-closed' : '' )
										}
									>
										<td>
											{ day }
											<div
												className={
													'cell-align-center'
												}
											>
												<ToggleControl
													label={ null }
													checked={ ! isClosed }
													onChange={ () =>
														toggleClosed( i )
													}
												/>
											</div>
										</td>
										<td>
											<div
												className={
													'time-input-cell cell-align-center'
												}
											>
												<ToggleControl
													label={ null }
													checked={
														! morning.disabled
													}
													onChange={ () =>
														togglePeriodDisabled(
															i,
															0
														)
													}
												/>
												<TimeInput
													id={ 'morning-open-' + i }
													disabled={
														isClosed ||
														morning.disabled
													}
													value={
														morning.open ||
														defaults.morningOpen ||
														''
													}
													onChange={ ( value ) =>
														updateHour(
															i,
															0,
															'open',
															value
														)
													}
												/>{ ' ' }
												–
												<TimeInput
													id={ 'morning-close-' + i }
													disabled={
														isClosed ||
														morning.disabled
													}
													value={
														morning.close ||
														defaults.morningClose ||
														''
													}
													onChange={ ( value ) =>
														updateHour(
															i,
															0,
															'close',
															value
														)
													}
												/>
											</div>
											<div
												className={
													'time-input-cell cell-align-center'
												}
											>
												<ToggleControl
													label={ null }
													checked={
														! afternoon.disabled
													}
													onChange={ () =>
														togglePeriodDisabled(
															i,
															1
														)
													}
												/>
												<TimeInput
													id={ 'afternoon-open-' + i }
													disabled={
														isClosed ||
														afternoon.disabled
													}
													value={
														afternoon.open ||
														defaults.afternoonOpen ||
														''
													}
													onChange={ ( value ) =>
														updateHour(
															i,
															1,
															'open',
															value
														)
													}
												/>{ ' ' }
												–
												<TimeInput
													id={
														'afternoon-close-' + i
													}
													disabled={
														isClosed ||
														afternoon.disabled
													}
													value={
														afternoon.close ||
														defaults.afternoonClose ||
														''
													}
													onChange={ ( value ) =>
														updateHour(
															i,
															1,
															'close',
															value
														)
													}
												/>
											</div>
										</td>
									</tr>
								);
							} ) }
						</tbody>
					</table>
				</PanelBody>
			</InspectorControls>
			<div className={ 'opening-hours-block' }>
				<OpeningHours hours={ hours } view={ view } />
			</div>
		</div>
	);
}
