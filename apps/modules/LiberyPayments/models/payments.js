import { GetStripeCheckoutSessionRequest } from "../../Services/HttpRequests";

class ClientCheckoutSession {
    constructor({session_id, session_url}) {
        this.session_id = session_id;
        this.session_url = session_url;
    }

    redirect = () => {
        window.location.href = this.session_url;
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
export const createCheckoutSession = async (product_id, customer_email, success_url, cancel_url) => {
    let request = new GetStripeCheckoutSessionRequest(product_id, customer_email, success_url, cancel_url);
    let response = await request.do();

    let session = null;

    if (response.Ok) {
        session = new ClientCheckoutSession(response.data);
    }

    return session;
}