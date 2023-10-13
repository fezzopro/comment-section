class Api::V1::PostsController < ApplicationController
  before_action :authenticate_devise_api_token!

  def index
    @posts = Post.all
    render json: PostSerializer.new(@posts).serializable_hash[:data], status: :ok
  end

  def show
    @post = Post.find_by(id: params['id'].to_i)
    if @post.nil?
      render json: { name: 'unavailable post' }, status: :no_content
    else
      render json: PostSerializer.new(@post).serializable_hash[:data][:attributes], status: :ok
    end
  end

  def create
    @post = Post.new(post_params)
    @post.user = current_devise_api_user

    if @post.save
      render json: @post.to_json, status: :created
    else
      render json: @post.errors.to_json, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find_by(id: params['id'].to_i)
    if @post.nil?
      render json: { name: 'unavailable post' }, status: :no_content
    elsif @post.update(post_params)
      render json: @post.to_json, status: :ok
    else
      render json: @post.errors.to_json, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params['id'].to_i)

    if @post.destroy
      render json: @post.to_json, status: :ok
    else
      render json: @post.errors.to_json, status: :unprocessable_entity
    end
  rescue StandardError
    render json: { name: 'unavailable reply', error: StandardError }, status: :no_content
  end

  private

  def post_params
    params.permit(%i[id title content likes])
  end
end
