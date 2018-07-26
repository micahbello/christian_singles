class Api::ViewsController < ApplicationController
  def create
    if current_user.id != params[:view][:viewed_id].to_i && current_user.check_if_view_exists(params[:view][:viewed_id]) == false 
      #the front end will check but this is just for extra protectiont to make sure that
      #no two 'views' are created with the same viewer and viewed.
      @view = View.new(view_params)

      if @view.save
        @user = User.find(params[:user_id])
        render :show
      else
        render json: @view.errors.full_messages, status: 422
      end

    else
      render :show
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
