class Post < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates_presence_of :title, on: :create, message: "can't be blank"
  validates_presence_of :content, on: :create, message: "can't be blank"
end
