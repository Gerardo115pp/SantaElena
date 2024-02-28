import CreateNewLocaleModal from './CreateNewLocaleModal.svelte';
import CreateNewPageModal from './CreateNewPageModal.svelte';
import CreateNewSectionModal from "./CreateNewSectionModal.svelte";
import CreateNewContentEntryModal from "./CreateNewContentEntryModal.svelte";

export const modal_registry = {
    CreateNewPageModal: {
        ref: CreateNewPageModal,
    },
    CreateNewSectionModal: {
        ref: CreateNewSectionModal,
    },
    CreateNewLocaleModal: {
        ref: CreateNewLocaleModal,
    },
    CreateNewContentEntryModal: {
        ref: CreateNewContentEntryModal,
    }
}

export default modal_registry;