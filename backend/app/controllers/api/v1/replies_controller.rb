class Api::V1::RepliesController < ApplicationController
  def index
    @replies = Reply.all
    render json: ReplySerializer.new(@replies).serializable_hash[:data], status: :ok
  end

  def show
    @reply = Reply.find_by(id: params['id'].to_i)
    if @reply.nil?
      render json: { name: 'unavailable reply' }, status: :no_content
    else
      render json: ReplySerializer.new(@reply).serializable_hash[:data][:attributes], status: :ok
    end
  end

  def create
    @reply = Reply.new(reply_params)
    @reply.user = current_devise_api_user
    @comment = Comment.find(params['comment_id'].to_i)
    @reply.comment = @comment

    if @reply.save
      render json: @reply.to_json, status: :created
    else
      render json: @reply.errors.to_json, status: :unprocessable_entity
    end
  end

  def update
    @reply = Reply.find_by(id: params['id'].to_i)
    if @reply.nil?
      render json: { name: 'unavailable reply' }, status: :no_content
    elsif @reply.update(reply_params)
      render json: @reply.to_json, status: :ok
    else
      render json: @reply.errors.to_json, status: :unprocessable_entity
    end
  rescue StandardError
    render json: { name: 'unavailable reply', error: StandardError }, status: :no_content
  end

  def destroy
    @reply = Reply.find(params['id'].to_i)

    if @reply.destroy
      render json: @reply.to_json, status: :ok
    else
      render json: @reply.errors.to_json, status: :unprocessable_entity
    end
  rescue StandardError
    render json: { name: 'unavailable reply', error: StandardError }, status: :no_content
  end

  private

  def reply_params
    params.permit(%i[id content likes])
  end
end
