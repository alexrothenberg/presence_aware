defmodule ChirpAwareness.FacesheetChannel do
  use ChirpAwareness.Web, :channel

  def join("facesheet:" <> patient_id, %{"user_id" => user_id}, socket) do
    IO.puts "JOIN: #{user_id} is on #{patient_id} facesheet"
    #  need to tell user_id everyone else who is here too
    send(self, {:after_join})
    socket_with_assigns = socket
      |> assign(:user_id, user_id)
      |> assign(:patient_id, patient_id)
    {:ok, socket_with_assigns}
  end

  def terminate(msg, socket) do
    IO.puts "BYE:  #{socket.assigns[:user_id]} left #{socket.assigns[:patient_id]} facesheet"
    broadcast! socket, "user:left", %{user_id: socket.assigns[:user_id]}
    {:ok, socket}
  end

  def handle_info({:after_join}, socket) do
    broadcast! socket, "user:entered", %{user_id: socket.assigns[:user_id]}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  # def handle_in("new_msg", %{:body => body, :user => user_id}, socket) do
  #   broadcast! socket, "new_msg", %{body: body, user_id: user_id}
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
