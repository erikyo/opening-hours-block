import { Rows, TimeDefaults, View } from './types';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should be combined into the final markup, which is then serialized by Gutenberg into post_content.
 * @param props                     - The attributes of the block
 * @param props.attributes          {Object} - The attributes of the block
 * @param props.attributes.hours    {Row} - Opening hours
 * @param props.attributes.view     {string} - Opening hours
 * @param props.attributes.defaults {Row} - Opening hours
 */
export function Save( {
	attributes,
}: {
	attributes: {
		hours: Rows;
		view: View;
	};
} ): JSX.Element {
	const blockProps = useBlockProps.save();
	return (
		<div
			{ ...blockProps }
			data-hours={ JSON.stringify( attributes.hours ) }
			data-view={ attributes.view }
		></div>
	);
}
