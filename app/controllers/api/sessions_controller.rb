class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      render :show
    else
      render json: ["Invalid Credentials"], status: 422
    end
  end

  def destroy
    if !current_user
      render json: ["There is no logged in user"], status: 404
    else
      logout
      render json: {}
    end
  end
end
