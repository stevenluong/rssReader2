json.array!(@news) do |news|
  json.extract! news, :id, :date, :source, :image, :title
  json.url news_url(news, format: :json)
end
