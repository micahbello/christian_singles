class Api::LikesController < ApplicationController
  def create
    #check to see if the like exists to avoid creating multiple likes
    #of the same user.
    # if Like.find_by(liker_id: params[:liker_id], liked_id: params[:liked_id])
    #   debugger
    #   @user = User.find(params[:user_id])
    #   render :show
    # end

    #otherwise create new one
    @like = Like.new(like_params)
    if @like.save
      @user = User.find(params[:user_id])
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end

  end

  def destroy
    @like = Like.find_by(liker_id: params[:liker_id], liked_id: params[:liked_id])
    if @like.delete
      @user = User.find(params[:id])
      render :show
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def index
  end


  def like_params
    params.require(:like).permit(:liker_id, :liked_id)
  end

end
