class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :email, :image, :image_url
end
