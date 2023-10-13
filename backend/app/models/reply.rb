class Reply < ApplicationRecord
  belongs_to :comment
  belongs_to :user

  validates_presence_of :content, on: :create, message: "can't be blank"
end
