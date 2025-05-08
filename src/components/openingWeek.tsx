import { TableRow } from './tableRow';
import { daysOfWeek } from '../constants';
import { Rows } from '../types';

export function OpeningWeek( { hours }: { hours: Rows } ) {
	const day = new Date().getDay();
	const dayNumber = day === 0 ? 7 : day - 1;
	return (
		<div className="opening-hours">
			<table>
				<tbody>
					{ daysOfWeek.map( ( currentDay: string, index: number ) => (
						<tr
							key={ currentDay }
							className={ 'opening-hours-row' }
						>
							<td
								className={
									'opening-hours__day' +
									( index === dayNumber
										? ' opening-hours__day--today'
										: '' )
								}
							>
								{ daysOfWeek[ index ] }
							</td>
							<td
								className={ `opening-hours__hours-container opening-hours__day--${ index }` }
							>
								<TableRow hours={ hours } day={ index } />
							</td>
						</tr>
					) ) }
				</tbody>
			</table>
		</div>
	);
}
