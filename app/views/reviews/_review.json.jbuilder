json.extract! review, :id, :title, :description, :performance, :comment, :created_at, :updated_at
json.url review_url(review, format: :json)
