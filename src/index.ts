// Opening Hours Block for WordPress Gutenberg
// This code defines a custom Gutenberg block that allows users to set business opening hours
// and display them dynamically based on user selection (today/week) with highlighted current day

import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import blockConfig from './block.json';
const jsonData = blockConfig as Record< string, any >;
import { Save } from './save';
import { Edit } from './edit';

/**
 * Register the block
 */
registerBlockType( jsonData.name, {
	...jsonData,
	edit: Edit,
	save: Save,
} );
