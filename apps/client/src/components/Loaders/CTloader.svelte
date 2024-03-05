<script>
    
    /*=============================================
    =            Properties            =
    =============================================*/
    
        /**
         * Size of the loader element in pixels
         */
        export let size = 48;

        /**
         * The primary color of the loader
         */
        export let primary_color = "var(--color)";

        /**
         * The secondary color of the loader
         */
        export let secondary_color = "var(--color-4)";
    
    /*=====  End of Properties  ======*/
    
    
</script>

<span class="CT-loader"
    style:--loader-size="{size}px"
    style:--loader-color="{primary_color}"
    style:--loader-color-light="{secondary_color}"
></span>

<style>
    .CT-loader {

        border-radius: 50%;
        display: inline-block;
        position: relative;
        height: var(--loader-size);
        width: var(--loader-size);
        border: calc(0.0625 * var(--loader-size)) solid;
        border-color: var(--loader-color) var(--loader-color) transparent transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    .CT-loader::after,
    .CT-loader::before {
        content: '';  
        box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border: calc(0.0625 * var(--loader-size)) solid;
        border-color: transparent transparent var(--loader-color-light) var(--loader-color-light);
        width: calc(0.833333 * var(--loader-size));
        height: calc(0.833333 * var(--loader-size));
        border-radius: 50%;
        box-sizing: border-box;
        animation: rotationBack 0.5s linear infinite;
        transform-origin: center center;
    }

    .CT-loader::before {
        width: calc(0.666666 * var(--loader-size));
        height: calc(0.666666 * var(--loader-size));
        border-color: var(--loader-color) var(--loader-color) transparent transparent;
        animation: rotation 1.5s linear infinite;
    }
    
    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes rotationBack {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
    }
    
</style>
