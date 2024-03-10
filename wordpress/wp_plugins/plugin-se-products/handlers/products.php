<?php
namespace SantaElenaHandlers;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use register_rest_route;
use get_posts;

class SeProductsHandler extends WP_REST_Controller {
    public function __construct() {
        $this->namespace = "santa-elena/v1";
        $this->rest_base = "products";
    }

    public function register_routes() {
        // GET /wp-json/santa-elena/v1/products
        register_rest_route($this->namespace, "/{$this->rest_base}", [
            "methods" => "GET",
            "callback" => array($this, "getProducts"),
            "permission_callback" => [$this, "authorizeRequest"]
        ]);

        // GET /wp-json/santa-elena/v1/products/archive
        register_rest_route($this->namespace, "/{$this->rest_base}/archive", [
            "methods" => "GET",
            "callback" => array($this, "getArchiveProducts"),
            "permission_callback" => [$this, "authorizeRequest"]
        ]);


    }

    /**
     * Authorize request based on the request method
     *
     * @param WP_REST_Request $request
     * @return mixed
     */
    public function authorizeRequest($request) {
        $request_method = $request->get_method();

        if ($request_method !== "GET") {
            return new WP_Error("bad_request", "Método no permitido", ["status" => 405]);
        }

        return true;
    }

    /**
     * Hub function to the products endpoint with the GET method
     * If the request doens't include any query parameters, it will return all the products. if a product_id list is included, it will return the products that match the ids
     *
     * @param WP_REST_Request $request
     * @return \SantaElenaModels\Product[]|WP_Error
     */
    public function getProducts($request) {
        $query_parameters = $request->get_params();
        $product_ids = [];
        
        if (isset($query_parameters["product_id"])) {
            $product_ids = explode(",", $query_parameters["product_id"]);   
            $product_ids = array_map(function($item) {
                return (int) $item;
            }, $product_ids);
        }

        $products = [];

        $products = match(true) {
            empty($product_ids) => $this->getAllProducts(),
            default => $this->getProductsByIds($product_ids),
        };

        header("Content-Type: application/json");

        // return json_encode($products);
        return $products;
    }    

    public function getArchiveProducts(): array {
        $products_archive = [];

        $search_args = [
            "post_type" => "santa-elena-products",
            "post_status" => "publish",
            "posts_per_page" => -1
        ];

        $products = get_posts($search_args);

        $products_archive = array_map(function($product) {
            return new \SantaElenaModels\ProductArchiveItem($product);
        }, $products);


        return $products_archive;
    }

    /**
     * Returns all the products
     * @return \SantaElenaModels\Product[]|WP_Error
     */
    public function getAllProducts() {
        $args = [
            "post_type" => "santa-elena-products",
            "post_status" => "publish",
            "posts_per_page" => -1
        ];

        $products = get_posts($args);

        $products = array_map(function($product) {
            return new \SantaElenaModels\Product($product);
        }, $products);

        return $products;
    }

    /**
     * Returns the products that match the ids
     * @param array $product_ids
     * @return \SantaElenaModels\Product[]|WP_Error
     */
    public function getProductsByIds($product_ids) {    

        $args = [
            "post_type" => "santa-elena-products",
            "include" => $product_ids,
            "post_status" => "publish",
            "posts_per_page" => -1
        ];

        $products = get_posts($args);

        $products = array_map(function($product) {
            return new \SantaElenaModels\Product($product);
        }, $products);

        return $products;
    }
}