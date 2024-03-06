<script>
    import Footer from "@components/Footer/Footer.svelte";
</script>

<main id="santa-elena-blog-page">
    <slot/>
</main>
<Footer />

<style>
    #santa-elena-blog-page {
        display: flex;
        padding: calc(var(--navbar-height) + var(--spacing-5)) var(--spacing-4) var(--spacing-4) var(--spacing-4);
        flex-direction: column;
        row-gap: var(--spacing-4);
    }
</style>