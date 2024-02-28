<?php
    $parent_dir_url = plugin_dir_url(dirname(__FILE__));

    // $TXY_SVELTE_APP_URL = "https://dev-santa-elena.mx/scripts/bundle.js"; // Dev
    $TXY_SVELTE_APP_URL = $parent_dir_url."js/txy-bundle.v1.js"; // Prod
    
?>
<script>
    const svelte_app_url = "<?php echo $TXY_SVELTE_APP_URL; ?>";

    const home_page_txy_id = "santa-elena-home-page";

    const mountTxyApp = () => {
        window.txy = {
            home_page_txy_id
        };

        const script = document.createElement('script');
        script.src = svelte_app_url;
        script.async = true;
        document.body.appendChild(script);
        console.log('Txy App mounted');
    }

    document.addEventListener('DOMContentLoaded', mountTxyApp);
</script>
<section id="libery-labs-txy-wp-menu">
    <div id="app-root" data-theme="libery-labs-theme" class="dark"></div>
</section>