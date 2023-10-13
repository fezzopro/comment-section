class User < ApplicationRecord
  has_many :posts
  has_many :comments
  has_many :replies
  has_one_attached :image
end
