class RoomsController < ApplicationController
  def index 
    @rooms = Room.all
  end

  def show
    @room = Room.find_by_id(params[:id])
  end

  def save_name
    session[:chat_name] = params[:chat_name]
  end

end
