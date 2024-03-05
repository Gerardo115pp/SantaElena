<script>
    import { fly } from "svelte/transition";
    import { backOut } from "svelte/easing";
    import { layout_properties } from "@stores/layout";


    export let text = '';
    export let between_words_delay = 100; // ms
    export let pause_delay = 100; // ms

    const words = text.split(' ');
    let extra_delay = 0;

    const getDelay = (word, index) => {
        let delay = between_words_delay * index

        extra_delay += word === '<br/>' ? pause_delay : 0;

        return delay + extra_delay;
    }
</script>

<h3 class="word-writer-wrapper">
    {#each words as word, h}
        <span 
            class="blast" 
            data-delay="{between_words_delay*h}"
            style:width={$layout_properties.IS_MOBILE ? 'max-content' : `${word.length}ch`}
        >
            <span 
                class="animatable-word"
                in:fly={{
                    y: 100,
                    delay:  getDelay(word, h),
                    duration: 3500,
                    easing: backOut
                }}
            >
                {@html word}
            </span>
        </span>
    {/each}
</h3>

<style>

    .blast {
        overflow: hidden;
        inset: 0;
    }

    .animatable-word {
        text-shadow: 2px 0 10px hsl(0 0% 0% / 20%);
    }
    

</style>