import { GetStripeCheckoutSessionRequest, PatchPurchaseVerificationRequest } from "../../Services/HttpRequests";

class ClientCheckoutSession {
    constructor({session_id, session_url}) {
        this.session_id = session_id;
        this.session_url = session_url;
    }

    redirect = () => {
        window.location.href = this.session_url;
    }
}

export class OrphanOrderVerification {
    /**
     * the id that identifies the order
     * @type {string}
     */
    #tracking_id;

    /**
     * Whether the order has been paid for
     * @type {boolean}
     */
    #paid;

    /**
     * The id of the payment intent
     * @type {string}
     */
    #payment_intent_id;

    constructor({tracking_id, paid, payment_intent_id}) {
        this.#tracking_id = tracking_id;
        this.#paid = paid;
        this.#payment_intent_id = payment_intent_id;
    }

    /**
     * The id that identifies the order
     * @type {string}
     */
    get TrackingId() {
        return this.#tracking_id;
    }

    /**
     * Whether the order has been paid for
     * @type {boolean}
     */
    get Paid() {
        return this.#paid;
    }

    /**
     * The id of the payment intent
     * @type {string}
     */
    get PaymentIntentId() {
        return this.#payment_intent_id;
    }
}

/**
 * Creates a new checkout session using the libery labs payment service
 * @param {string} product_id
 * @param {string} customer_email
 * @param {string} success_url
 * @param {string} cancel_url
 * @returns {Promise<ClientCheckoutSession>}
 */
export const createCheckoutSession = async (tracking_id, product_id, customer_name, customer_email, success_url, cancel_url) => {
    let request = new GetStripeCheckoutSessionRequest(tracking_id, product_id, customer_name, customer_email, success_url, cancel_url);
    let response = await request.do();

    let session = null;

    if (response.Ok) {
        session = new ClientCheckoutSession(response.data);
    }

    return session;
}

/**
 * Verifies the status of an order and returns the tracking id and whether the order has been paid for
 * @param {string} order_id - if an empty string is passed, the payment service will try to find the order from the browser's cookies
 * @param {boolean} send_email - whether to send an email to the customer, by default it is true
 * @returns {Promise<OrphanOrderVerification>}
 */
export const verifyOrder = async (order_id, send_email = true) => {
    let request = new PatchPurchaseVerificationRequest(order_id, send_email);
    let response = await request.do();

    let verification = null;

    if (response.Ok) {
        verification = new OrphanOrderVerification(response.data);
    }

    return verification;
}