import { isHeadline, parseHtmlText } from "./html_helper_functions";

class HTMLEventListenerItem {
    /**
     * @type {string}
     */
    #event_name;

    /**
     * @type {Function}
     */
    #event_listener;
    constructor({event_name, event_listener}){
        this.#event_name = event_name;
        this.#event_listener = event_listener;
    }

    get EventName(){
        return this.#event_name;
    }

    get EventListener(){
        return this.#event_listener;
    }
}

class HTMLPreprocessRule {
    /**
     * The attributes to add to the tag
     * @type {Object<string, string>[]}
     */
    #attributes;

    /**
     * The class names to add to the tag
     * @type {string[]}
     */
    #class_names;

    /**
     * The listeners to add to the tag
     * @type {HTMLEventListenerItem[]}
     */
    #listeners;

    constructor({attributes, class_names, listeners}){
        this.#attributes = attributes;
        this.#class_names = class_names;
        this.#listeners = listeners;
    }

    /**
     * Adds an event listener that will be added to a matching tag
     * @param {string} event_name 
     * @param {Function} event_listener 
     */
    AddEventListener(event_name, event_listener){
        this.#listeners.push(new HTMLEventListenerItem({event_name, event_listener}));
    }

    /**
     * Process a tag and returns the modified tag
     * @param {Element} tag
     * @returns {Node}
     */
    ProcessNode = tag => {
        if(!(tag instanceof Element)) return tag;

        this.#attributes.forEach(attribute => {
            let is_remove = attribute.name.startsWith('!');
            
            if (is_remove) {
                attribute.name = attribute.name.substring(1);
                tag.removeAttribute(attribute.name);
                return;
            } 

            tag.setAttribute(attribute.name, attribute.value);
        });

        tag.classList.add(...this.#class_names);
        
        this.#listeners.forEach(listener => {
            tag.addEventListener(listener.EventName, listener.EventListener);
        });

        return tag;
    }    
}

const meta_rules = {
    HEADLINE: 'headline'
}

/**
 * Used to add classes, attributes, and events handlers to Nodes on the ServiceData description
 * @typedef {Object} NodesPreprocessRule
 * @property {string} tag_name - looks for an immediate child with the tag name
 * @property {string} selector - looks for a non-immediate child with a matching selector 
 * @property {string[]} classes
 * @property {Object.<string, string>[]} attributes - If the key starts with '!', it will remove the attribute
 * @property {Object.<string, Function>[]} event_handlers
 */ 

export class LiberyHTMLPreprocessor {
    /**
     * @type {Object<string, HTMLPreprocessRule>}
     */
    #rules_map;

    /**
     * @type {NodesPreprocessRule[]}
     */
    #rules;

    constructor(){
        this.#rules_map = {};
        this.#rules = [];
    }

    /**
     * Adds an event listener that will be added to a matching tag
     * @param {string} tag_name
     * @param {string} event_name
     * @param {Function} event_listener
     * @returns {void}
     */
    addEventListener = (tag_name, event_name, event_listener) => {
        let rule = this.#rules_map[tag_name] ?? false;

        if (!rule) return;

        rule.AddEventListener(event_name, event_listener);
    }

    /**
     * Applies a rule that matches exactly the tag name of the Node, if there is none, it returns the Node as is
     * @param {Node} node
     * @returns {Node}
     */
    #applyExactRule = node => {
        let rule = this.#rules_map[node.nodeName.toLowerCase()];
        let processed_node = node;

        if (rule !== undefined) {
            processed_node = rule.ProcessNode(node);
        }

        return processed_node;
    }

    /**
     * Process an array of elements/nodes and returns the modified array. It's faster but DOES NOT APPLY SELECTOR BASED RULES
     * @param {Node[]} nodes
     * @returns {Node[]}
     */
    processNodes = nodes => {
        const preprocessed_nodes = [];

        nodes.forEach(node => preprocessed_nodes.push(this.#processNode(node)));

        return preprocessed_nodes;
    }

    /**
     * Recieves html text and returns an array of Nodes with the rules applied
     * @param {string} html_text
     * @returns {Node[]}
     */
    processText = html_text => {
        let parser = new DOMParser();
        let fake_dom = null;

        try {
            fake_dom = parser.parseFromString(html_text, 'text/html');
        } catch (error) {
            console.error(error);
            return [];
        }

        for(let rule of this.#rules) {
            let selector = rule.selector;
            if (selector == null) {
                continue;
            }

            let html_rule = this.#rules_map[selector];

            if (html_rule === undefined) {
                continue;
            }

            let elements = fake_dom.querySelectorAll(selector);

            elements.forEach(element => {
                let processed_element = html_rule.ProcessNode(element);
                element.replaceWith(processed_element);
            });
        }

        const content_nodes = Array.from(fake_dom.body.children);

        return this.processNodes(content_nodes);
    }


    /**
     * Applies exact rules and meta rules to the Node
     * @param {Node} node 
     * @returns {Node}
     */
    #processHeadlines = node => {
        let headline_rule = this.#rules_map[meta_rules.HEADLINE];
        let special_headline_rule = this.#rules_map[node.nodeName.toLowerCase()];

        if (headline_rule !== undefined) {
            node = headline_rule.ProcessNode(node);
        }

        if (special_headline_rule !== undefined) {
            node = special_headline_rule.ProcessNode(node);
        }

        return node;
    }

    /**
     * Applies a rules if set to the tag. if is not set, then returns the Node as is
     * @param {Node} node
     * @returns {Node}
     */
    #processNode = node => {
        let processed_node = undefined;

        switch (true) {
            case isHeadline(node.nodeName):
                processed_node = this.#processHeadlines(node);
                break;
            default:
                processed_node = this.#applyExactRule(node);
                break;
        }

        return processed_node;
    }

    /**
     * Parses a set of rules defined as NodesPreprocessRule and adds them to the processor
     * @param {NodesPreprocessRule[]} rules
     * @returns {void}
     */
    setRules = rules => {
        this.#rules_map = {};

        rules.forEach(rule => {
            let rule_listeners = [];
            let rule_attributes = [];
            let rule_classes = [];

            rule_attributes = rule.attributes !== undefined ? rule.attributes : rule_attributes;
            rule_classes = rule.classes !== undefined ? rule.classes : rule_classes;
            rule_listeners = rule.event_handlers !== undefined ? rule.event_handlers : rule_listeners;

            this.#rules_map[rule.tag_name ?? rule.selector] = new HTMLPreprocessRule({
                attributes: rule_attributes,
                class_names: rule_classes,
                listeners: rule_listeners
            });
        });

        this.#rules = rules;
    }
}
