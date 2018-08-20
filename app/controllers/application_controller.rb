class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true
  skip_before_action :verify_authenticity_token
  include Admin::Reading::GrammarExamsHelper
  include SessionsHelper

  private

  def logged_in_user
    return if logged_in?
    store_location
    flash[:danger] = t "users.logged_in_user.flash"
    redirect_to login_url
  end
end
