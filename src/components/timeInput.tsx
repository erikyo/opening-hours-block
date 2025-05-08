import { __ } from '@wordpress/i18n';

/**
 * A simple time input component using native HTML input[type="time"].
 * @param props          {Object} - The attributes of the block
 * @param props.value    {string} - The value of the input
 * @param props.onChange {Function} - The function to call when the value changes
 * @param props.disabled {boolean} - Whether the input is disabled
 * @param props.id
 */
export function TimeInput( {
	id,
	value,
	onChange,
	disabled,
}: {
	id: string;
	value: string;
	onChange: ( value: string ) => void;
	disabled?: boolean;
} ) {
	return (
		<input
			id={ id }
			disabled={ disabled }
			type="time"
			className="components-text-control__input"
			value={ value }
			onChange={ ( e ) => onChange( e.target.value ) }
			aria-label={ __( 'Select time', 'opening-hours-block' ) }
		/>
	);
}
