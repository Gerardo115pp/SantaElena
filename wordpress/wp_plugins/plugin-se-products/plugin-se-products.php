<?php

/* 
    Plugin Name: plugin-se-products
    Description: Plugin para gestionar los productos que aparecerán en el listado de servicios de Santa Elena
    Version: 1.0
    Author: LiberyLabs
    Author URI: https://libery-labs.com
*/
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once __DIR__ . "/vendor/autoload.php";

function santa_elena_register_products() {
    $post_type_labels = array(
        "name" => "Productos Santa Elena",
        "singular_name" => "Producto Santa Elena",
        "add_new" => "Agregar Producto",
        "add_new_item" => "Agregar Producto",
        "menu_name" => "Productos Santa Elena",
        "edit_item" => "Modificar Producto",
        "new_item" => "Evita crear paginas de productos",
        "view_item" => "Ver Producto Santa Elena",
        "view_items" => "Ver Productos Santa Elena",
        "search_items" => "Buscar Productos Santa Elena",
        "not_found" => "No se encontraron productos",
        "not_found_in_trash" => "No se encontraron productos en la papelera",
        "parent_item_colon" => "Producto",
        "all_items" => "Todos los productos",
        "archives" => "Listado de productos",
        "attributes" => "Atributos del producto",
        "insert_into_item" => "Insertar en el producto",
        "uploaded_to_this_item" => "Subido a este producto",
        "featured_image" => "Imagen destacada",
        "set_featured_image" => "Establecer imagen destacada",
        "remove_featured_image" => "Eliminar imagen destacada",
        "use_featured_image" => "Usar como imagen destacada",
        "menu_name" => "Productos Santa Elena",
        "filter_items_list" => "Filtrar listado de productos",
        "items_list_navigation" => "Navegación del listado de productos",
        "items_list" => "Listado de productos",
        "item_published" => "Producto publicado",
        "item_published_privately" => "Producto privado",
        "item_reverted_to_draft" => "Producto revertido a borrador",
        "item_scheduled" => "Producto en proceso de publicación",
        "item_updated" => "Producto actualizado",
    );

    $post_type_description = "Los productos que se mostrarán en el listado de servicios de Santa Elena";

    $post_type_args = array(
        "label" => "Productos Santa Elena",
        "labels" => $post_type_labels,
        "description" => $post_type_description,
        "public" => true,
        "publicly_queryable" => false,
        "show_ui" => true,
        "show_in_menu" => true,
        "show_in_rest" => true,
        "rest_base" => "santa-elena-products",
        "menu_position" => 5,
        "menu_icon" => "dashicons-cart",
        "has_archive" => false,
        "slug" => "santa-elena-products",
        "can_export" => true,
        "template" => array(
            array( "core/paragraph", array(
                "placeholder" => "Contenido que aparecerá cuando el cliente quiera ver mas detalles del producto",
            ) )
        ),
    );

    register_post_type( "santa-elena-products", $post_type_args );
}

add_action( 'init', 'santa_elena_register_products' );

function santa_elena_register_product_meta() {
    add_meta_box(
        "santa-elena-product-price",
        "Precio",
        function($post) {
            $price = get_post_meta($post->ID, "santa-elena-product-price", true);
            echo "<input type='text' name='santa-elena-product-price' value='$price' />";
        },
        "santa-elena-products",
        "normal",
        "high"
    );
}


// add_action( 'add_meta_boxes', 'santa_elena_register_product_meta' ); // We're using ACF for the time being. probably will define a custom approach for this instead of using ACF in production.

// Register products rest api
function santa_elena_register_products_rest_api() {
    $products_handler = new SantaElenaHandlers\SeProductsHandler();
    $products_handler->register_routes();
}

add_action( 'rest_api_init', 'santa_elena_register_products_rest_api' );
