<?php

add_action( 'init', 'rw_register_shortcode');

function rw_register_shortcode(){
    add_shortcode('rw-postcode-lookup-form', 'rw_display_postcode_lookup_form');
}

function rw_display_postcode_lookup_form(){
    wp_enqueue_script('rw-postcode-lookup', plugin_dir_url( __FILE__ ) . '/dist/index.js');
    ob_start();
    $template = include 'form-template.php';
    return ob_get_clean();
}