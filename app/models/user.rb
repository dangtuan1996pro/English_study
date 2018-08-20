class User < ApplicationRecord
  attr_accessor :remember_token, :activation_tokens, :reset_token
  has_many :user_exams
  has_many :exams, through: :user_exams
  before_save :email_downcase
  before_create :create_activation_digest

  scope :all_user, ->{select :id, :name, :email}
  scope :all_order, ->{order "name"}
  validates :name, presence: true,
    length: {maximum: Settings.validate.user.name.maxlength}
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true,
    length: {maximum: Settings.validate.user.email.maxlength},
    format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}
  has_secure_password
  validates :password, presence: true, allow_nil: true,
    length: {minimum: Settings.validate.user.password.maxlength}

  def self.digest string
    cost =  if ActiveModel::SecurePassword.min_cost
              BCrypt::Engine::MIN_COST
            else
              BCrypt::Engine.cost
            end
    BCrypt::Password.create string, cost: cost
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def remember
    self.remember_token = User.new_token
    update_attribute :remember_digest, User.digest(remember_token)
  end

  def forget
    update_attribute :remember_digest, nil
  end

  def authenticated? attribute, token
    digest = send "#{attribute}_digest"
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password? token
  end

  def activate
    update_attributes active_status: true, activated_at: Time.zone.now
  end

  def send_activation_email
    UserMailer.account_activation(self).deliver_now
  end

  def create_reset_digest
    self.reset_token = User.new_token
    update_attributes reset_digest: User.digest(reset_token),
      reset_sent_at: Time.zone.now
  end

  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  def password_reset_expired?
    reset_sent_at < Settings.user.hours_ago.hours.ago
  end

  private

  def email_downcase
    email&.downcase!
  end

  def create_activation_digest
    self.activation_tokens = User.new_token
    self.activation_digest = User.digest activation_tokens
  end
end
