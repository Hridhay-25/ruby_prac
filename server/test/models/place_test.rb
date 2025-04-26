require "test_helper"

class PlaceTest < ActiveSupport::TestCase
  def setup
    @place = Place.new(title: "Test Place", user_id: "1", info: "Test info", imageurl: "http://example.com/image.jpg")
  end

  # Test valid place
  test "should be valid" do
    assert @place.valid?
  end

  # Test presence of title
  test "should require title" do
    @place.title = nil
    assert_not @place.valid?, "Place should be invalid without a title"
  end

  # Test presence of user_id
  test "should require user_id" do
    @place.user_id = nil
    assert_not @place.valid?, "Place should be invalid without a user_id"
  end

  # Test presence of info
  test "should require info" do
    @place.info = nil
    assert_not @place.valid?, "Place should be invalid without info"
  end

  # Test presence of imageurl
  test "should require imageurl" do
    @place.imageurl = nil
    assert_not @place.valid?, "Place should be invalid without an imageurl"
  end
end

