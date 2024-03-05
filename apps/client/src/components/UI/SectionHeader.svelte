<script>
    import { fade } from "svelte/transition";
    import viewport from "@components/viewport_actions/useViewportActions";
    import { bounceIn, circIn } from "svelte/easing";

    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        export let section_name = "Sección nueva";

        export let section_id_postfix = crypto.randomUUID();

        let is_visible = false;
    
    
    /*=====  End of Properties  ======*/
    
    
    /*=============================================
    =            Methods            =
    =============================================*/
    
        const setVisibility = value => {
            if (is_visible === value) return;

            is_visible = value;
            console.log(`Section ${section_name} is visible: ${is_visible}`)
        }
    
    /*=====  End of Methods  ======*/
    
    

</script>

<h2 id="section-header-{section_id_postfix}" class="section-header" on:viewportEnter={() => setVisibility(true)} use:viewport>
    {#key is_visible}
    <span in:fade|global={{delay: 400, duration: 800, easing: circIn}} class="transition-wrapper">
            {section_name}
        </span>
        {/key}
</h2>
<hr style:visibility="hidden" on:viewportEnter={() => setVisibility(true)} />

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