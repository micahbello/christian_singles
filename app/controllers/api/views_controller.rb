class Api::ViewsController < ApplicationController
  def create
    @view = View.new(view_params)
    #write code so that no views with the same viewer and viewed cannot be produced twice.
    if @view.save
      debugger
      @user = User.find(params[:user_id])
      render :show
    else
      render json: @view.errors.full_messages, status: 422
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
