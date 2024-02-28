import CreateNewLocaleModal from './CreateNewLocaleModal.svelte';
import CreateNewPageModal from './CreateNewPageModal.svelte';
import CreateNewSectionModal from "./CreateNewSectionModal.svelte";

export const modal_registry = {
    CreateNewPageModal: {
        ref: CreateNewPageModal,
    },
    CreateNewSectionModal: {
        ref: CreateNewSectionModal,
    },
    CreateNewLocaleModal: {
        ref: CreateNewLocaleModal,
    }
}

export default modal_registry;