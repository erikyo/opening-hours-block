<?php
/**
 * Plugin Name: Opening Hours Block
 * Description: A Gutenberg block to set and display business opening hours.
 * Version: 1.0.0
 * Author: Erik Golinelli - Codekraft
 * Author URI: https://codekraft.it
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: opening-hours-block
 * Domain Path: languages/
 */

defined( 'ABSPATH' ) || exit;

define( 'OH_FILE', __FILE__ );
define( 'OH_PATH', plugin_dir_path( OH_FILE ) );
define( 'OH_URL', plugin_dir_url(OH_FILE ) );

require OH_PATH . 'inc/i18n.php';
require OH_PATH . 'inc/enqueue.php';
require OH_PATH . 'inc/callback.php';
