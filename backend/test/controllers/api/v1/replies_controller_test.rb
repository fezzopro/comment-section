require 'test_helper'

class Api::V1::RepliesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get api_v1_replies_index_url
    assert_response :success
  end

  test 'should get show' do
    get api_v1_replies_show_url
    assert_response :success
  end

  test 'should get create' do
    get api_v1_replies_create_url
    assert_response :success
  end

  test 'should get update' do
    get api_v1_replies_update_url
    assert_response :success
  end

  test 'should get delete' do
    get api_v1_replies_delete_url
    assert_response :success
  end
end
