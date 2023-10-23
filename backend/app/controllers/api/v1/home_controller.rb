class Api::V1::HomeController < ApplicationController
  def index
    render json: { message: 'Welcome to blog API' }, status: :ok
  end
end
