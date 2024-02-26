package repositories

import (
	"context"
	"libery_payments_service/models"
)

type TradesRepository interface {
	InsertOrphanOrder(ctx context.Context, orphan_order *models.OrphanOrder) error
	GetOrphanOrder(ctx context.Context, order_id string) (*models.OrphanOrder, error)
	UpdateOrphanOrderPaid(ctx context.Context, order_id string, is_paid bool) error
	UpdateOrphanOrder(ctx context.Context, order *models.OrphanOrder) error
	Close() error
}

var Trades TradesRepository

func SetTradesRepository(trades TradesRepository) {
	Trades = trades
}
