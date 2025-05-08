import { createRoot, Suspense } from '@wordpress/element';
import { OpeningHours } from './components/openingHours';
import { Rows, View } from './types';

window.addEventListener( 'DOMContentLoaded', () => {
	const elements: NodeListOf< HTMLElement > =
		document.querySelectorAll( '.opening-hours' );
	elements?.forEach( ( element ) => {
		// the current block dataset
		const dataset = element.dataset as Record< string, string >;
		// the current block attributes
		const attributes = {
			hours: JSON.parse( dataset.hours ) as Rows,
			view: ( dataset.view as View ) ?? 'today',
		};
		createRoot( element ).render(
			<Suspense fallback={ <div className="wp-block-placeholder" /> }>
				<OpeningHours { ...attributes } />
			</Suspense>
		);
	} );
} );
