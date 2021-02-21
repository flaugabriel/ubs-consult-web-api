Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
        get 'find_ubs', to: 'unities#find_ubs'
    end
  end
  root 'home#index'
end
