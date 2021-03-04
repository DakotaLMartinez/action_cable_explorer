class MessagesController < ApplicationController

  def create 
    @message = Message.new(message_params)
    if @message.save 
      ActionCable.server.broadcast(
        "room_channel_#{@message.room_id}",
        author: @message.author,
        content: @message.content
      )
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
