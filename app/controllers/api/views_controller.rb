class Api::ViewsController < ApplicationController
  def create

    if current_user.id != params[:view][:viewed_id].to_i && View.check_if_view_exists(params[:view][:viewed_id], current_user) == false
      @view = View.new(view_params)

      if @view.save
        @user = User.find(params[:user_id])
        render :show
      else
        render json: @view.errors.full_messages, status: 422
      end

    elsif View.check_if_view_exists(params[:view][:viewed_id], current_user) == true
      # redirect_to action: destroy

      # @view_to_destroy = View.where("viewer_id = ? AND viewed_id = ?", params[:view][:viewer_id], params[:view][:viewed_id])
      @view = View.find_by(viewer_id: params[:view][:viewer_id], viewed_id: params[:view][:viewed_id])
      if @view.delete

        #
        @view = View.new(view_params)

        if @view.save
          @user = User.find(params[:user_id])
          render :show
        else
          render json: @view.errors.full_messages, status: 422
        end
      end

    end

  end

  def recreate
    @view = View.new(view_params)

    if @view.save
      @user = User.find(params[:user_id])
      render :show
    else
      render json: @view.errors.full_messages, status: 422
    end
  end

  def destroy

    #the purpose of destoying is to recreate- the reason is that if a view is being destroyed,
    #the only reason would be bc the user is looking again at that users profile and it is
    #being recreated in order to be put back first on top of the list when displayed in the front end

    # @view_to_destroy = View.where("viewer_id = ? AND viewed_id = ?", params[:view][:viewer_id], params[:view][:viewed_id])
    @view = View.find_by(viewer_id: params[:view][:viewer_id], viewed_id: params[:view][:viewed_id])
    if @view.delete

    redirect_to action: recreate

      # #
      # @view = View.new(view_params)
      #
      # if @view.save
      #   @user = User.find(params[:user_id])
      #   render :show
      # else
      #   render json: @view.errors.full_messages, status: 422
      # end
      #
      # #

    else
      render json: @like.errors.full_messages, status: 422
    end

  end

  def index
  end

  def view_params
    params.require(:view).permit(:viewed_id, :viewer_id)
  end
end
