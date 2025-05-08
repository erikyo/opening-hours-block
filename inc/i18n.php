<?php
/**
 * Loads the plugin text domain for translation.
 */
function ho_i18n() {
	load_plugin_textdomain( 'opening-hours-block', false, OH_PATH . 'languages' );
}
add_action( 'init', 'ho_i18n' );

