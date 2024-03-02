<?php

    if (!str_starts_with($_SERVER['REQUEST_URI'], '/wordpress') || $_SERVER['REQUEST_URI'] === '/wordpress/') {
        header("X-Redirect-By: PHP santa_elena_theme/functions.php");
        header('Location: /', true);
        exit;
    }
