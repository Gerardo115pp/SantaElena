/**
 * @callback ContextMenuAction
 * @param {Object} params
 * @returns {void}
 */

/**
 * @typedef {Object} ContextMenuItem
 * @property {string} title
 * @property {string} icon
 * @property {ContextMenuAction} action
 */

/**
 * @typedef {Object} ContextMenuSection
 * @property {string} title
 * @property {Array<ContextMenuItem>} items
 */

export default ContextMenuSection;