<?php
    $SVELTE_APP_URL = "https://dev-santa-elena.mx/scripts/bundle.js";
?>
<script>
    const svelte_app_url = "<?php echo $SVELTE_APP_URL; ?>";

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
    <div id="app-root"></div>
</section>