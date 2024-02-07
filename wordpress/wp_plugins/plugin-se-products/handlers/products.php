<?php
namespace SantaElenaHandlers;

use WP_Error;
use WP_REST_Controller;
use register_rest_route;
use get_posts;

class SeProductsHandler extends WP_REST_Controller {
    public function __construct() {
        $this->namespace = "santa-elena/v1";
        $this->rest_base = "products";
    }

    public function register_routes() {
        register_rest_route($this->namespace, "/{$this->rest_base}", [
            "methods" => "GET",
            "callback" => array($this, "getProducts"),
            "permission_callback" => array($this, "authorizeRequest")
        ]);
    }

    public function authorizeRequest($request) {
        $request_method = $request->get_method();

        if ($request_method !== "GET") {
            return new WP_Error("bad_request", "Método no permitido", ["status" => 405]);
        }

        return true;
    }

    public function getProducts($request) {
        $args = [
            "post_type" => "santa-elena-products",
            "post_status" => "publish",
            "posts_per_page" => -1
        ];

        $products = get_posts($args);

        $products = array_map(function($product) {
            return new \SantaElenaModels\Product($product);
        }, $products);

        header("Content-Type: application/json");

        // return json_encode($products);
        return $products;
    }    
}