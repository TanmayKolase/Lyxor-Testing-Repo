Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :orders, only: [:index, :show, :create, :update, :destroy]
      get 'stats', to: 'order_stats#index'
      get 'stats/by_status', to: 'order_stats#by_status'
      get 'stats/by_date_range', to: 'order_stats#by_date_range'
    end
  end
end
