# To get the value of a specific environment variable:
database_url = ENV['DATABASE_URL']
puts "DATABASE_URL: #{database_url}"

# To get a list of all environment variables and their values:
ENV.each do |key, value|
  puts "#{key}=#{value}"
end