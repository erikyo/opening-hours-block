import { OpeningWeek } from './openingWeek';
import { OpeningDay } from './openingDay';
import { Rows, View } from '../types';

export function OpeningHours( props: { hours: Rows; view: View } ) {
	const { hours, view } = props;
	if ( view === 'week' ) {
		return (
			<div className="opening-hours__container">
				<OpeningWeek hours={ hours } />
			</div>
		);
	}
	const currentDay = new Date().getDay();
	const normalizedDayNumber = currentDay === 0 ? 7 : currentDay - 1;
	return (
		<div className="opening-hours__container">
			<OpeningDay
				hours={ hours }
				currentDayNumber={ normalizedDayNumber }
			/>
		</div>
	);
}
