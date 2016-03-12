defmodule ChirpAwareness.FacesheetChannel do
  use ChirpAwareness.Web, :channel

  def join("facesheet:lobby", %{"user_id" => user_id}, socket) do
    # if authorized?(payload) do
      socket_with_user = assign(socket, :user_id, user_id)
      IO.inspect [:lobby, user_id, socket_with_user.assigns]
      send(self, {:after_join})
      # broadcast! socket, "joined", %{body: payload[:user_id]}

      {:ok, socket_with_user}
    # else
    #   {:error, %{reason: "unauthorized"}}
    # end
  end

  def terminate(msg, socket) do
    IO.inspect [:terminate, msg, socket]
    broadcast! socket, "user:left", %{body: socket.assigns[:user_id]}
    {:ok, socket}
  end

  def handle_info({:after_join}, socket) do
    IO.inspect [:after_join, socket]
    broadcast! socket, "user:entered", %{user_id: socket.assigns[:user_id]}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end


  def handle_in("new_msg", %{:body => body, :user => user_id}, socket) do
    IO.inspect [:alex, body, user_id]
    broadcast! socket, "new_msg", %{body: body, user_id: user_id}
    {:noreply, socket}
  end

  # def handle_out("new_msg", payload, socket) do
  #   push socket, "new_msg", payload
  #   {:noreply, socket}
  # end

  # # Channels can be used in a request/response fashion
  # # by sending replies to requests from the client
  # def handle_in("ping", payload, socket) do
  #   {:reply, {:ok, payload}, socket}
  # end

  # # It is also common to receive messages from the client and
  # # broadcast to everyone in the current topic (facesheet:lobby).
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end

  # This is invoked every time a notification is being broadcast
  # to the client. The default implementation is just to push it
  # downstream but one could filter or change the event.
  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
