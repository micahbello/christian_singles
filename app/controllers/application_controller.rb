
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :logged_in?, :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    user.change_online_status(true)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logged_in?
    !!current_user
  end

  def logout

    current_user.change_online_status(false)
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def ensure_login
    render json: {error: ['must be logged in']}
  end
end
