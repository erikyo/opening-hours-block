<?php

/**
 * Renders the block on the frontend and enqueues the dynamic JS.
 */
function opening_hours_block_render_callback( $attributes ) {
	wp_enqueue_script( 'opening-hours-block-frontend' );
	ob_start();
	?>
	<div
		class="opening-hours"
		data-hours='<?php echo esc_attr( wp_json_encode( $attributes['hours'] ?? [] ) ); ?>'
		data-view='<?php echo esc_attr( $attributes['view'] ?? 'week' ); ?>'
	></div>
	<?php
	return ob_get_clean();
}
