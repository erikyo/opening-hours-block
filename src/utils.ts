import { daysOfWeek } from './constants';
import { Rows } from './types';
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Check if the store is currently open.
 *
 * @param {number} currentDay - Day of week (0 = Monday, 6 = Sunday)
 * @param {Object} hours      - Opening hours array
 * @return {boolean} - True if currently open
 */
export function isOpenNow( currentDay: number, hours: Rows ): boolean {
	const now = new Date();
	const currentTime = now.getHours() * 60 + now.getMinutes();

	const slots = hours[ currentDay ];
	if ( ! slots || ! Array.isArray( slots ) ) {
		return false;
	}

	for ( const slot of slots ) {
		if ( slot?.disabled || ! slot?.open || ! slot.close ) {
			continue;
		}

		const [ openHour, openMin ] = slot.open.split( ':' ).map( Number );
		const [ closeHour, closeMin ] = slot.close.split( ':' ).map( Number );

		const openMinutes = openHour * 60 + openMin;
		const closeMinutes = closeHour * 60 + closeMin;

		if ( currentTime >= openMinutes && currentTime < closeMinutes ) {
			return true;
		}
	}

	return false;
}

/**
 * Returns the next opening day and time from now, with human-friendly delay string.
 *
 * @param {number} currentDay - Day of week (0 = Monday, 6 = Sunday)
 * @param {Array}  hours      - Opening hours array
 * @return {Object|null} - { dayName, time, delayString } or null if no future openings
 */
export function getNextOpening( currentDay: number, hours: Rows ) {
	const now = new Date();
	const currentTime = now.getHours() * 60 + now.getMinutes();

	for ( let i = 0; i < 7; i++ ) {
		const checkDay = ( currentDay + i ) % 7;
		const dayData = hours[ checkDay ];

		if ( ! dayData ) {
			continue;
		}

		for ( const schedule of dayData ) {
			if ( schedule && ! schedule.disabled && schedule.open ) {
				const [ openHour, openMin ] = schedule.open
					.split( ':' )
					.map( Number );
				const openMinutes = openHour * 60 + openMin;

				let minutesUntil = openMinutes - currentTime;

				// If it's today but the opening time has already passed, continue
				if ( i === 0 && openMinutes <= currentTime ) {
					continue;
				}

				// If it's not today, adjust full day(s)
				if ( i > 0 ) {
					minutesUntil += i * 1440; // 1440 minutes in a day
				}

				// Calculate readable time
				const days = Math.floor( minutesUntil / 1440 );
				const hoursLeft = Math.floor( ( minutesUntil % 1440 ) / 60 );
				const mins = minutesUntil % 60;

				let delayString = '';
				if ( days > 0 ) {
					delayString += `${ days } day${ days > 1 ? 's' : '' }`;
				}
				if ( hoursLeft > 0 ) {
					delayString +=
						( delayString ? ' and ' : '' ) +
						`${ hoursLeft } hour${ hoursLeft > 1 ? 's' : '' }`;
				}
				if ( days === 0 && hoursLeft === 0 && mins > 0 ) {
					delayString += `${ mins } minutes`;
				}

				return {
					day: checkDay,
					dayName: daysOfWeek[ checkDay ],
					time: schedule.open,
					delayString,
				};
			}
		}
	}

	return null;
}

/**
 * Returns a readable string for how much longer the store will be open today.
 *
 * @param currentDay - Number (0 = Monday)
 * @param hours      - Full schedule (Rows)
 */
export function getRemainingOpenTime(
	currentDay: number,
	hours: Rows
): string | null {
	const now = new Date();
	const currentMinutes = now.getHours() * 60 + now.getMinutes();
	const todaySlots = hours[ currentDay ];

	if ( ! todaySlots || todaySlots.length === 0 ) {
		return null;
	}

	for ( const slot of todaySlots ) {
		if ( slot.disabled ) {
			continue;
		}

		const [ openHour, openMin ] = slot.open.split( ':' ).map( Number );
		const [ closeHour, closeMin ] = slot.close.split( ':' ).map( Number );

		const openMinutes = openHour * 60 + openMin;
		const closeMinutes = closeHour * 60 + closeMin;

		if ( currentMinutes >= openMinutes && currentMinutes < closeMinutes ) {
			const remaining = closeMinutes - currentMinutes;
			const hoursRemaining = Math.floor( remaining / 60 );
			const minutesRemaining = remaining % 60;
			let hoursTranslation = '';
			let minutesTranslation = '';

			if ( hoursRemaining > 0 ) {
				hoursTranslation = _n(
					'hour',
					'hours',
					hoursRemaining,
					'opening-hours-block'
				);
			}
			if ( minutesRemaining > 0 ) {
				minutesTranslation = _n(
					'minute',
					'minutes',
					minutesRemaining,
					'opening-hours-block'
				);
			}
			return sprintf(
				/* translators: we are open for %1$s hours, %2$s and %3$s minutes */
				__(
					'We are open for another %1$s %2$s %3$s',
					'opening-hours-block'
				),
				hoursRemaining > 0
					? hoursRemaining + ' ' + hoursTranslation
					: '',
				minutesRemaining > 0 && hoursRemaining > 0
					? ` ${ __( 'and', 'opening-hours-block' ) } `
					: '',
				minutesRemaining > 0
					? minutesRemaining + ' ' + minutesTranslation
					: ''
			);
		}
	}

	return null;
}

/**
 * Check if the day is today
 * @param  day {number} Day of the week
 * @return {boolean} True if the day is today
 */
export function isToday( day: number ): boolean {
	const today = new Date().getDay();
	const todayNumber = today === 0 ? 7 : today - 1;
	return Number( day ) === todayNumber;
}
