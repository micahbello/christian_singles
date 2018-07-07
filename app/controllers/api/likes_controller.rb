class Api::LikesController < ApplicationController
  def create
    @like = Like.new(like_params)
    if @like.save
      @user = User.find(params[:user_id])
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end

  end

  def destroy
  end

  def index
  end


  def like_params
    params.require(:like).permit(:liker_id, :liked_id)
  end

end
