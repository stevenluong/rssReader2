json.array!(@sources) do |source|
  json.extract! source, :id, :name, :display, :lang, :url
  json.url source_url(source, format: :json)
end
