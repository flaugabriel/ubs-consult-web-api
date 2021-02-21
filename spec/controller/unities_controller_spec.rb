require "rails_helper"

RSpec.describe 'UnitiesController', type: :request do
  describe "get all ubs API" do
    it 'should return a valid list of ubs' do
      get "/api/v1/find_ubs?query=-23.604936,-46.692999&page=1&per_page=2"

      expect(response).to have_http_status(200)
    end

    it 'should return a invalid list of ubs' do
      get "/api/v1/find_ubs"
      
      expect(response).to have_http_status(422)
    end
  end
end
