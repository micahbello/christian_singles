class Api::ViewsController < ApplicationController
  def create

# if the view doesnt exist

    if current_user.id != params[:view][:viewed_id].to_i &&
      View.check_if_view_exists(params[:view][:viewed_id], current_user) == false

      @view = View.new(view_params)
      @view.time_last_viewed = Time.now

      if @view.save
        @user = User.find(params[:user_id])
        render :show
      else
        render json: @view.errors.full_messages, status: 422
      end

# if it exists

    elsif View.check_if_view_exists(params[:view][:viewed_id], current_user) == true

      @view = View.find_by(viewer_id: params[:view][:viewer_id], viewed_id: params[:view][:viewed_id])
      @view.time_last_viewed = Time.now

      if @view.save
        @user = User.find(params[:user_id])
        render :show
      else
        render json: @view.errors.full_messages, status: 422
      end
    end

  end

  def destroy
  end

  def index
  end

  def view_params
    params.require(:view).permit(:viewed_id, :viewer_id)
  end
end
