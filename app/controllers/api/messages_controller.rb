class Api::MessagesController < ApplicationController
  before_action :set_group

  def index
    @new_messages = Message.where('id > ?', params[:id]) 
    respond_to do |format|
      format.html
      format.json
    end
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end
end