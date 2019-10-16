class User < ApplicationRecord
  has_secure_password

  has_many :reviews, dependent: :destroy

  validates :email, presence: true, uniqueness: true

  def to_token_payload
    {
        sub: id,
        id: id,
        email: email,
        name: name,
        admin: admin
    }
  end
end
