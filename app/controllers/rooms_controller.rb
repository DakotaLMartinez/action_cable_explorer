class RoomsController < ApplicationController
  def index 
    @rooms = [1,2,3,4]
  end

  def show
    @room_id = params[:room_id]
  end

  def save_name
    session[:chat_name] = params[:chat_name]
  end

end
