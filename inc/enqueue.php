<?php

/**
 * The block is loaded during the `init` hook.
 */
add_action('init', function () {
	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 */
	register_block_type( 'wp-blocks/opening-hours-block', [
		'editor_script'   => 'opening-hours-block-editor',
		'view_script'     => 'opening-hours-block-frontend',
		'render_callback' => 'opening_hours_block_render_callback',
	] );
});

/**
 * Registers the block and scripts.
 */
function opening_hours_block_register() {
	$editor_asset = include OH_PATH . 'build/index.asset.php';


	// Register block editor script
	wp_register_script( 'opening-hours-block-editor', OH_URL .  'build/index.js', $editor_asset['dependencies'], $editor_asset['version'] );
	wp_enqueue_style( 'opening-hours-block-editor', OH_URL .  'build/style-index.css' );

	$frontend_asset = include OH_PATH . 'build/frontend.asset.php';

	wp_register_script( 'opening-hours-block-frontend', OH_URL . 'build/frontend.js', $frontend_asset['dependencies'], $frontend_asset['version'] );

	wp_set_script_translations( 'opening-hours-block-frontend', 'opening-hours-block', OH_PATH  . 'languages' );
}

add_action( 'init', 'opening_hours_block_register' );
