import { getNextOpening, getRemainingOpenTime, isOpenNow } from '../utils';
import { daysOfWeek } from '../constants';
import { Rows } from '../types';
import { __, sprintf } from '@wordpress/i18n';

/**
 * The Main Component for opening hours
 * @param  props                  {Object} - The attributes of the block
 * @param  props.hours            {Rows} Opening hours object
 * @param  props.currentDayNumber {number} Day of the week
 * @return {JSX.Element} Opening hours component
 */
export function OpeningDay( {
	hours,
	currentDayNumber,
}: {
	hours: Rows;
	currentDayNumber: number;
} ) {
	const storeOpen = isOpenNow( currentDayNumber, hours );
	let nextOpening = null;

	if ( storeOpen ) {
		return (
			<div className="opening-hours">
				<div className="opening-hours__hours">
					<p>{ __( 'Now open', 'opening-hours-block' ) }</p>
					<p>
						{ __( "today's hours", 'opening-hours-block' ) + ' ' }
						<span className="opening-hours__day">
							{ hours[ currentDayNumber ]?.map(
								( slot, slotIndex ) =>
									slot.disabled ? (
										<span
											key={ slotIndex }
											className={
												'opening-hours__item-disabled'
											}
										>
											{ slot?.open +
												' - ' +
												slot?.close +
												' ' }
										</span>
									) : (
										<span
											key={ slotIndex }
											className={
												'opening-hours__item-enabled'
											}
										>
											{ slot?.open +
												' - ' +
												slot?.close +
												' ' }
										</span>
									)
							) }
						</span>
					</p>
					<p className="opening-hours__remaining">
						{ getRemainingOpenTime( currentDayNumber, hours ) }
					</p>
				</div>
			</div>
		);
	}

	let day = daysOfWeek[ currentDayNumber ];
	if ( ! storeOpen ) {
		nextOpening = getNextOpening( currentDayNumber, hours );
		/** I need to store the string of the day name as a variable because otherwise isn't translated. Erik of the future, do not remove this please! */
		day = nextOpening?.dayName || daysOfWeek[ currentDayNumber ];
	}

	return (
		<div className="opening-hours">
			{ nextOpening ? (
				<div className="opening-hours__hours-container">
					<div className={ 'opening-hours__hours-disabled' }>
						<p className={ 'opening-hours__row-item' }>
							{ __(
								'Sorry, we are closed at the moment.',
								'opening-hours-block'
							) }
						</p>
						<p className={ 'opening-hours__row-item' }>
							{ sprintf(
								/**
								 * Translators: %1$s - day name, %2$s - time, %3$s - delay string (We'll open on Monday (at 9:00 in 18 Hours))
								 */
								__(
									"We'll open on %1$s at %2$s (in %3$s)",
									'opening-hours-block'
								),
								day,
								nextOpening.time,
								nextOpening.delayString
							) }
						</p>
					</div>
				</div>
			) : (
				<div className="opening-hours__hours">
					<p>
						{ __( 'No upcoming openings.', 'opening-hours-block' ) }
					</p>
				</div>
			) }
		</div>
	);
}
