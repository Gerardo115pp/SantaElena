package repositories

import "libery_payments_service/models"

type ProductsRepository interface {
	GetProductsByID(product_ids []string) ([]models.Product, error)
	Close() error
}

var Products ProductsRepository

func SetProductsRepository(repository ProductsRepository) {
	Products = repository
}
