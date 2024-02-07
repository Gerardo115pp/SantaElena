<?php
namespace SantaElenaModels;

use WP_Post;
use WP_Error;
use get_post_meta;
use apply_filters;

enum metaBoxNames: string {
    case PRODUCT_IMAGE = "sep-image";
    case SHORT_DESCRIPTION = "sep-short-description";
    case NEXT_STEPS = "sep-next-steps";
    case PRICE = "sep-price";
    case PRICE_RANGE = "sep-price-range";
}

class Product {
    private WP_Post $post;
    public string $name;
    public ?string $image;
    public string $content;
    public string $short_description;
    public float $price;
    public string $price_range;
    public string $slug;

    public function __construct($post) {
        $this->post = $post;
        $this->populateProperties();
    }

    private function populateProperties() {
        $this->name = $this->post->post_title;

        $this->image = libery_getPostMeta($this->post->ID, metaBoxNames::PRODUCT_IMAGE->value);
        
        $raw_content = $this->post->post_content;

        $this->content = apply_filters('the_content', $raw_content);

        $this->short_description = libery_getPostMeta($this->post->ID, metaBoxNames::SHORT_DESCRIPTION->value);

        $raw_price = libery_getPostMeta($this->post->ID, metaBoxNames::PRICE->value);

        $this->price = is_numeric($raw_price) ? (float)$raw_price : -1.0;

        $this->price_range = libery_getPostMeta($this->post->ID, metaBoxNames::PRICE_RANGE->value);

        $this->slug = $this->post->post_name;

    }
}

function libery_getPostMeta($post_id, $field_name) {
    return get_post_meta($post_id, $field_name, true);
}