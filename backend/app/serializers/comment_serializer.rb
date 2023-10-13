class CommentSerializer
  include JSONAPI::Serializer
  attributes :id, :content, :likes, :replies
end
