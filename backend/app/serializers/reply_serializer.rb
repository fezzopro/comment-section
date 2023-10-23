class ReplySerializer
  include JSONAPI::Serializer
  attributes :id, :content, :likes
end
