package models

type Product struct {
	ID               int     `json:"id"`
	Name             string  `json:"name"`
	ShortDescription string  `json:"short_description"`
	Price            float64 `json:"price"`
	Image            string  `json:"image"`
}

type WPProduct struct {
	Product
	NextSteps  string `json:"next_steps"`
	Slug       string `json:"slug"`
	PriceRange string `json:"price_range"`
	Content    string `json:"content"`
}

func (wp_product *WPProduct) ToProduct() Product {
	return Product{
		ID:               wp_product.ID,
		Name:             wp_product.Name,
		ShortDescription: wp_product.ShortDescription,
		Price:            wp_product.Price,
		Image:            wp_product.Image,
	}
}
