class Api::UsersController < ApplicationController

  def index
  end

  def show
  end

  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def edit
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      render json: "it's working"
  end

  def destroy
  end

  def user_params
    params.require(:user).permit(:username, :password, :first_name, :last_name, :gender, :birth_date,
    :zip_code)
  end
end
