class Api::UsersController < ApplicationController

  def index
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show_all_profile
    else
      render json: @user.errors.full_messages, status: 422
    end
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
  end

  def destroy
  end

  def user_params
    params.require(:user).permit(:username, :marital_status, :password, :first_name, :last_name, :gender, :birth_date,
    :zip_code, :description, :city, :state, :last_online, :height, :want_kids, :have_kids, :relocate, :religion, :attendance,
    :occupation, :education, :place_as_child, :ethnicity, :language, :pets, :smoke, :drink, :hobbies, :first_date, :sex_seek,
    :religion_seek, :relationship_seek, :education_seek, :attendance_seek, :have_kids_seek, :want_kids_seek, :relocate_seek,
    :marital_status_seek, :language_seek, :ethnicity_seek, :display_name)
  end
end
