<?php

function txy_content_admin_menu() {
    add_menu_page(
        'Txy Content Manager',
        'Txy Content',
        'manage_options',
        'txy-content',
        'txy_content_admin_page',
        'dashicons-admin-page',
        6
    );
}

add_action('admin_menu', 'txy_content_admin_menu');

function txy_content_admin_page() {
    include_once plugin_dir_path(__FILE__) . 'admin-page.php';
}