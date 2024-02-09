<?php
    $SVELTE_APP_URL = "https://dev-santa-elena.mx/scripts/bundle.js";
?>
<script>
    const svelte_app_url = "<?php echo $SVELTE_APP_URL; ?>";

    const mountTxyApp = () => {
        const script = document.createElement('script');
        script.src = svelte_app_url;
        script.async = true;
        document.body.appendChild(script);
        console.log('Txy App mounted');
    }

    document.addEventListener('DOMContentLoaded', mountTxyApp);
</script>
<section id="libery-labs-txy-wp-menu">
    <h1>
        Txy Content Manager - loading  from <?php echo $SVELTE_APP_URL; ?>
    </h1>
    <div id="app-root"></div>
</section>