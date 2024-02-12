<?php
    if ($_SERVER['REQUEST_URI'] !== "/") {
        header("Location: /");
        exit;
    }
?>
<?php get_header(); ?>

<root id="app-root">
    <h1>
        Stop right there criminal scum!
    </h1>
</root>


<?php get_footer(); ?>