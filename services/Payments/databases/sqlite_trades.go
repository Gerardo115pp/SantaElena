package databases

import (
	"context"
	"database/sql"
	"libery_payments_service/models"
)

type TradesSQLiteDB struct {
	db *sql.DB
}

func NewTradesSQLiteDB() (*TradesSQLiteDB, error) {
	var err error
	var db *sql.DB

	db, err = openTradesSQLiteDB()
	if err != nil {
		return nil, err
	}

	return &TradesSQLiteDB{db: db}, nil
}

func (tdb *TradesSQLiteDB) Close() (err error) {
	err = tdb.db.Close()
	return
}

func (tdb *TradesSQLiteDB) InsertOrphanOrder(ctx context.Context, orphan_order *models.OrphanOrder) error {
	tx, err := tdb.db.Begin()
	if err != nil {
		return err
	}

	stmt, err := tx.PrepareContext(ctx, "INSERT INTO `orphan_orders` (`order_id`, `checkout_id`, `payment_intent_id`, `paid`, `customer_email`, `customer_name`, `locale`) VALUES (?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, orphan_order.OrderID, orphan_order.CheckoutID, orphan_order.PaymentIntentID, orphan_order.Paid, orphan_order.CustomerEmail, orphan_order.CustomerName, orphan_order.Locale)
	if err != nil {
		return err
	}

	items_stmt, err := tx.PrepareContext(ctx, "INSERT INTO `orphan_order_items` (`order_id`, `product_id`) VALUES (?, ?)")
	if err != nil {
		return err
	}

	defer items_stmt.Close()

	for _, product_id := range orphan_order.ItemsIDs {
		_, err = items_stmt.ExecContext(ctx, orphan_order.OrderID, product_id)
		if err != nil {
			return err
		}
	}

	err = tx.Commit()

	return err
}

func (tdb *TradesSQLiteDB) GetOrphanOrder(ctx context.Context, order_id string) (*models.OrphanOrder, error) {
	var order *models.OrphanOrder = new(models.OrphanOrder)

	stmt, err := tdb.db.PrepareContext(ctx, "SELECT `order_id`, `order_date`, `checkout_id`, `payment_intent_id`, `paid`, `customer_email`, `customer_name`, `locale` FROM `orphan_orders` WHERE `order_id` = ?")
	if err != nil {
		return nil, err
	}

	defer stmt.Close()

	err = stmt.QueryRowContext(ctx, order_id).Scan(&order.OrderID, &order.OrderDate, &order.CheckoutID, &order.PaymentIntentID, &order.Paid, &order.CustomerEmail, &order.CustomerName, &order.Locale)
	if err != nil {
		return nil, err
	}

	items_stmt, err := tdb.db.PrepareContext(ctx, "SELECT `product_id` FROM `orphan_order_items` WHERE `order_id` = ?")
	if err != nil {
		return nil, err
	}

	defer items_stmt.Close()

	rows, err := items_stmt.QueryContext(ctx, order_id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	order.ItemsIDs = make([]string, 0)

	for rows.Next() {
		var product_id string
		err = rows.Scan(&product_id)
		if err != nil {
			return nil, err
		}

		order.ItemsIDs = append(order.ItemsIDs, product_id)
	}

	return order, nil
}

func (tdb *TradesSQLiteDB) UpdateOrphanOrderPaid(ctx context.Context, order_id string, is_paid bool) error {
	stmt, err := tdb.db.PrepareContext(ctx, "UPDATE `orphan_orders` SET `paid` = ? WHERE `order_id` = ?")
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, is_paid, order_id)
	if err != nil {
		return err
	}

	return nil
}

func (tdb *TradesSQLiteDB) UpdateOrphanOrder(ctx context.Context, order *models.OrphanOrder) error {
	tx, err := tdb.db.Begin()
	if err != nil {
		return err
	}

	stmt, err := tx.PrepareContext(ctx, "UPDATE `orphan_orders` SET `checkout_id` = ?, `payment_intent_id` = ?, `paid` = ?, `customer_email` = ?, `customer_name` = ?, `locale` = ? WHERE `order_id` = ?")
	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, order.CheckoutID, order.PaymentIntentID, order.Paid, order.CustomerEmail, order.CustomerName, order.Locale, order.OrderID)
	if err != nil {
		return err
	}

	items_stmt, err := tx.PrepareContext(ctx, "DELETE FROM `orphan_order_items` WHERE `order_id` = ?")
	if err != nil {
		return err
	}

	defer items_stmt.Close()

	_, err = items_stmt.ExecContext(ctx, order.OrderID)
	if err != nil {
		return err
	}

	items_stmt, err = tx.PrepareContext(ctx, "INSERT INTO `orphan_order_items` (`order_id`, `product_id`) VALUES (?, ?)")
	if err != nil {
		return err
	}

	defer items_stmt.Close()

	for _, product_id := range order.ItemsIDs {
		_, err = items_stmt.ExecContext(ctx, order.OrderID, product_id)
		if err != nil {
			return err
		}
	}

	err = tx.Commit()

	return err
}
