package databases

import (
	"crypto/tls"
	"crypto/x509"
	"encoding/json"
	"fmt"
	app_config "libery_payments_service/Config"
	"libery_payments_service/models"
	"net/http"
	"os"
	"strings"

	"github.com/Gerardo115pp/patriots_lib/echo"
)

type WpProductsConn struct {
	HttpAddress   string
	CertFile      string
	httpTransport *http.Transport
}

func NewWpProductsConn() *WpProductsConn {
	if !app_config.USE_WORDPRESS {
		echo.EchoFatal(fmt.Errorf("The service is not configured to use wordpress, yet something tried to create a WordPress Products repository."))
	}

	var new_wp_products_conn *WpProductsConn = new(WpProductsConn)

	new_wp_products_conn.HttpAddress = fmt.Sprintf("https://%s%s", app_config.BASE_DOMAIN, app_config.WORDPRESS_SERVICE)

	echo.EchoDebug(fmt.Sprintf("Wordpress products service address: %s", new_wp_products_conn.HttpAddress))

	if app_config.DEVELOPMENT_MODE {
		new_wp_products_conn.CertFile = app_config.SSL_CA_PATH
		http_transport, err := new_wp_products_conn.getHttpsCredentials()
		if err != nil {
			echo.EchoFatal(err)
		}

		new_wp_products_conn.httpTransport = http_transport
	}

	return new_wp_products_conn
}

func (wp_products_conn *WpProductsConn) getHttpsCredentials() (*http.Transport, error) {
	if !app_config.DEVELOPMENT_MODE || wp_products_conn.CertFile == "" {
		return nil, fmt.Errorf("Trying to get HTTPS credentials but no certificate authority file was provided")
	}

	certificate_authority_cert, err := os.ReadFile(wp_products_conn.CertFile)
	if err != nil {
		return nil, fmt.Errorf("Error reading certificate authority file: %s", err.Error())
	}

	authority_pool := x509.NewCertPool()
	authority_pool.AppendCertsFromPEM(certificate_authority_cert)

	transport_credentials := &tls.Config{
		RootCAs: authority_pool,
	}

	transport := &http.Transport{TLSClientConfig: transport_credentials}

	return transport, nil
}

func (wp_products_conn *WpProductsConn) GetProductsByID(product_ids []string) ([]models.Product, error) {
	var products []models.Product = make([]models.Product, 0)
	var wp_products []models.WPProduct
	var products_ids_query string = "?product_id=" // must hace the format: "product_id=1,2,3,...,n"
	var err error = nil

	if len(product_ids) == 0 {
		return products, nil
	}

	products_ids_query += strings.Join(product_ids, ",")

	var request_url string = fmt.Sprintf("%s%s%s", wp_products_conn.HttpAddress, app_config.WP_PRODUCTS_SUFFIX, products_ids_query)

	request, err := http.NewRequest(http.MethodGet, request_url, nil)
	if err != nil {
		return products, fmt.Errorf("Error creating request: %s", err.Error())
	}

	request.Header.Add("Content-Type", "application/json")

	client := &http.Client{}

	if app_config.DEVELOPMENT_MODE {
		client.Transport = wp_products_conn.httpTransport
	}

	response, err := client.Do(request)
	if err != nil {
		return products, fmt.Errorf("Error making request: %s", err.Error())
	}

	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		echo.EchoDebug(fmt.Sprintf("Request failed. URL: %s\nStatus code: %d", request_url, response.StatusCode))
		return products, fmt.Errorf("Request failed with status code: %d", response.StatusCode)
	}

	err = json.NewDecoder(response.Body).Decode(&wp_products)
	if err != nil {
		return products, fmt.Errorf("Error decoding response: %s", err.Error())
	}

	products = make([]models.Product, len(wp_products))
	for i, wp_product := range wp_products {
		products[i] = wp_product.ToProduct()
	}

	return products, err
}

func (wp_products_conn *WpProductsConn) Close() error {
	return nil
}
