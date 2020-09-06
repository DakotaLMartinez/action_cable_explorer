class MessagesController < ApplicationController

  def create 
    @message = Message.new(message_params)
    if @message.save 
      redirect_to room_path(@message.room)
    else
      render 
    end
  end

  private 

  def message_params
    params.require(:message).permit(:content, :author, :room_id)
  end
end
