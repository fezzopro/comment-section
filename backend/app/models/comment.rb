class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :replies

  validates_presence_of :content, on: :create, message: "can't be blank"
end
