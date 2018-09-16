class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    match_percent_and_summary = current_user.match_percent_and_summary(@user)
    @match_percentage = match_percent_and_summary[0]
    @match_summary = match_percent_and_summary[1]
    @distance_from_user = current_user.calculate_distance(@user)

    if @user
      render :show_all_profile
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all
    render :index
  end

  def matches
    # @users = User.find(params[:id]).match_with_percent
    @users = User.find(params[:id]).return_matched_users
    render :matches
  end

  def activity
    @user = User.find(params[:id])
    render :activity
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
      render :show_all_profile
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  def user_params
    params.require(:user).permit(:username, :image, :marital_status, :password, :first_name, :last_name, :gender, :birth_date,
    :zip_code, :description, :city, :state, :last_online, :height, :want_kids, :have_kids, :relocate, :religion, :attendance,
    :occupation, :education, :place_as_child, :ethnicity, :language, :pets, :smoke, :drink, :hobbies, :first_date, :sex_seek,
    :religion_seek, :relationship_seek, :education_seek, :attendance_seek, :have_kids_seek, :want_kids_seek, :relocate_seek,
    :marital_status_seek, :language_seek, :ethnicity_seek, :display_name, :smoke_seek, :drink_seek, :distance_seek, :age,
    :min_height_seek, :max_height_seek, :min_age_seek, :max_age_seek)
  end
end
