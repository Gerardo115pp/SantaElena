<script>
    export let section_name = "Sección nueva";

    export let section_id_postfix = crypto.randomUUID();
</script>

<h2 id="section-header-{section_id_postfix}" class="section-header">
    {section_name}
</h2>

<style>
    .section-header {
        width: 100%;
        font-size: var(--font-size-h2);
        background: var(--dark-8);
        font-weight: 300;
        color: var(--color-light-2);
        text-align: center;
    }
</style>