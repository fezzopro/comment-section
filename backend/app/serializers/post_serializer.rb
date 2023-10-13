class PostSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :content, :likes, :comments
end
