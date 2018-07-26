require 'test_helper'

class Api::ViewsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_views_create_url
    assert_response :success
  end

  test "should get destroy" do
    get api_views_destroy_url
    assert_response :success
  end

  test "should get index" do
    get api_views_index_url
    assert_response :success
  end

end
