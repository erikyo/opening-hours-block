import { isOpenNow, isToday } from '../utils';
import { Rows } from '../types';
import { __ } from '@wordpress/i18n';

/**
 * The opening hours table row
 * @param hours.hours
 * @param hours       {Row} Opening hours
 * @param day         {number} Day of the week
 * @param hours.day
 * @class
 */
export function TableRow( { hours, day }: { hours: Rows; day: number } ) {
	const schedule = hours[ day ];
	const isNow = isToday( day ) && isOpenNow( day, hours );
	if ( ! schedule || Object.keys( schedule ).length === 0 ) {
		return (
			<div
				className={
					'opening-hours__row-item' +
					( isToday( day ) ? ' opening-hours__row-today' : '' )
				}
			>
				<p
					className={
						'opening-hours__row-item opening-hours__item-closed'
					}
				>
					{ __( 'Closed', 'opening-hours-block' ) }
				</p>
			</div>
		);
	}
	return schedule.map( ( slot, slotIndex ) => (
		<div
			key={ slotIndex }
			className={
				'opening-hours__row' +
				( isToday( day ) ? ' opening-hours__row-today' : '' ) +
				( isNow ? ' opening-hours__row-now' : '' )
			}
		>
			{ ! slot || slot.disabled ? (
				<p
					className={
						'opening-hours__row-item opening-hours__item-closed'
					}
				>
					{ __( 'Closed', 'opening-hours-block' ) }
				</p>
			) : (
				<p
					className={
						'opening-hours__row-item opening-hours__row-open'
					}
				>
					<span className={ 'oh_opentime' }>{ slot.open }</span> –{ ' ' }
					<span className={ 'oh_closetime' }>{ slot.close }</span>
				</p>
			) }
		</div>
	) );
}
