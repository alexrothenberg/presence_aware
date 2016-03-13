defmodule ChirpAwareness.FacesheetChannel do
  use ChirpAwareness.Web, :channel

  def join("facesheet:" <> patient_id, %{"user_id" => user_id}, socket) do
    send(self, {:after_join})
    socket_with_assigns = socket
      |> assign(:user_id, user_id)
      |> assign(:patient_id, patient_id)
    {:ok, socket_with_assigns}
  end

  def terminate(msg, socket) do
    broadcast! socket, "user:left", %{user_id: socket.assigns[:user_id]}
    {:ok, socket}
  end

  def handle_info({:after_join}, socket) do
    broadcast! socket, "user:entered", %{user_id: socket.assigns[:user_id]}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  def handle_in("user:presence_reminder", %{"user_id" => user_id, "send_to" => send_to}, socket) do
    broadcast! socket, "user:presence_reminder", %{user_id: user_id, send_to: send_to}
    {:noreply, socket}
  end

  intercept ["user:entered", "user:presence_reminder"]

  # Do not notify ourselves of our own presence
  def handle_out("user:entered", payload, socket) do
    if payload.user_id != socket.assigns[:user_id] do
      push socket, "user:entered", payload
    end
    {:noreply, socket}
  end

  # Only remind the "send_to" user of our presence
  def handle_out("user:presence_reminder", payload, socket) do
    if payload.send_to == socket.assigns[:user_id] do
      push socket, "user:presence_reminder", %{user_id: payload.user_id}
    end
    {:noreply, socket}
  end

  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
