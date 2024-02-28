/**
 * @typedef {Object} ContextMenuPosition
 * @property {number} x
 * @property {number} y
 */

/**
 * 
 * @param {HTMLElement} container_element 
 * @param {ContextMenuPosition} saved_position 
 * @returns {ContextMenuPosition}
 */
export const calculateContextMenuPosition = (container_element, saved_position) => {
    let body_rect = document.body.getBoundingClientRect();
    let container_rect = container_element.getBoundingClientRect();

    let x = saved_position.x - (body_rect.width - container_rect.width);
    let y = saved_position.y - container_rect.top;

    console.debug("Context menu position: ", { x, y });
    return { x, y };
}