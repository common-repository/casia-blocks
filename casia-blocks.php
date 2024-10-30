<?php
/**
Plugin Name: Casia Blocks
Description: This plugin adds collection of Gutenberg blocks to your site.
Version: 1.0
Author: castellar120
License: GPLv2 or later
Text Domain: casiagb
*/

//Actions
add_action( 'wp_enqueue_scripts', 'casiagb_custom_styles' );

add_action( 'admin_enqueue_scripts', 'casia_admin_style' );

// Register Style
function casiagb_custom_styles() {
  wp_register_style( 'casiagb_main', plugins_url( 'main.css', __FILE__ ), false, false );
  wp_enqueue_style( 'casiagb_main' );
}

// Update CSS within in Admin
function casia_admin_style() {
	wp_enqueue_style('admin-styles', plugins_url( 'admin.css', __FILE__ ));
}

/**
 * Enqueue the block's assets for the editor.
 *
 * wp-blocks:  Includes the registerBlockType() function to register blocks.
 * wp-editor:  Includes the RichText functionality for editable content.
 * wp-element: Includes the createElement() function to create elements.
 * wp-i18n:    Includes the __() function for internationalization.
 *
 * @since 1.0.0
 */
function casia_gutenberg_infoblock() {
	wp_enqueue_script(
		'casia/infoblock', // Unique handle.
		plugins_url( '/blocks/gutenberg-infoblock.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugins_url( '/blocks/gutenberg-infoblock.js', __FILE__ ) ) // filemtime — Gets file modification time.
	);
}
add_action( 'enqueue_block_editor_assets', 'casia_gutenberg_infoblock' );

function casia_gutenberg_nested() {
	wp_enqueue_script(
		'casia/nested', // Unique handle.
		plugins_url( '/blocks/gutenberg-nested.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugins_url( '/blocks/gutenberg-nested.js', __FILE__ ) ) // filemtime — Gets file modification time.
	);
}
add_action( 'enqueue_block_editor_assets', 'casia_gutenberg_nested' );

function casia_gutenberg_showcase() {
	wp_register_script(
		'casia/showcase',
		plugins_url( '/blocks/gutenberg-showcase.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), filemtime( plugins_url( '/blocks/gutenberg-showcase.js', __FILE__ ) )
	);

	wp_enqueue_script('casia/showcase');

	//Localize scripts
	$casia_data_array = [
		'placeholder_img_url' => plugins_url( '500.png', __FILE__ )
	];

	wp_localize_script( 'casia/showcase', 'casia_data', $casia_data_array );
	//wp_localize_script( 'casia/griditem', 'casia_data', $casia_data_array );
}

add_action( 'enqueue_block_editor_assets', 'casia_gutenberg_showcase' );

function casia_gutenberg_griditem() {
	wp_register_script(
		'casia/griditem',
		plugins_url( '/blocks/gutenberg-griditem.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugins_url( '/blocks/gutenberg-griditem.js', __FILE__ ) )
	);

	wp_enqueue_script('casia/griditem');

	//Localize scripts
	$casia_data_array = [
		'placeholder_img_url' => plugins_url( '500.png', __FILE__ )
	];

	wp_localize_script( 'casia/griditem', 'casia_data', $casia_data_array );
}

add_action( 'enqueue_block_editor_assets', 'casia_gutenberg_griditem' );

function casia_textblock_enqueue() {
	wp_enqueue_script(
		'casia/textblock', // Unique handle.
		plugins_url( '/blocks/gutenberg-textblock.js', __FILE__ ), // block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugins_url( '/blocks/gutenberg-textblock.js', __FILE__ ) )
	);
}
add_action( 'enqueue_block_editor_assets', 'casia_textblock_enqueue' );

function casia_slider_enqueue() {
	wp_enqueue_script(
		'casia/slider', // Unique handle.
		plugins_url( '/blocks/gutenberg-slider.js', __FILE__ ), // block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugins_url( '/blocks/gutenberg-slider.js', __FILE__ ) )
	);
}
add_action( 'enqueue_block_editor_assets', 'casia_slider_enqueue' );

function casia_slider_scripts() {
	if ( has_block( 'casia/slider' ) ) {
		wp_enqueue_script(
			'casia/slider',
			plugins_url( 'casia-slider.js', __FILE__ ),
			array( 'jquery' )
		);
	}
}

add_action( 'wp_enqueue_scripts', 'casia_slider_scripts' );
