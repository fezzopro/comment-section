class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_devise_api_token!, only: %i[create edit update destory]

  def index
    @comments = Comment.all
    render json: CommentSerializer.new(@comments).serializable_hash[:data], status: :ok
  end

  def show
    @comment = Comment.find_by(id: params['id'].to_i)
    if @comment.nil?
      render json: { name: 'unavailable comment' }, status: :no_content
    else
      render json: CommentSerializer.new(@comment).serializable_hash[:data][:attributes], status: :ok
    end
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_devise_api_user
    @post = Post.find(params['post_id'].to_i)
    @comment.post = @post

    if @comment.save
      render json: @comment.to_json, status: :created
    else
      render json: @comment.errors.to_json, status: :unprocessable_entity
    end
  end

  def update
    @comment = Comment.find_by(id: params['id'].to_i)
    if @comment.nil?
      render json: { name: 'unavailable comment' }, status: :no_content
    elsif @comment.update(comment_params)
      render json: @comment.to_json, status: :ok
    else
      render json: @comment.errors.to_json, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params['id'].to_i)

    if @comment.destroy
      render json: @comment.to_json, status: :ok
    else
      render json: @comment.errors.to_json, status: :unprocessable_entity
    end
  rescue StandardError
    render json: { name: 'unavailable reply', error: StandardError }, status: :no_content
  end

  private

  def comment_params
    params.permit(%i[id content likes])
  end
end
