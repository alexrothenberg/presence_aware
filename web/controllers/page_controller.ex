defmodule ChirpAwareness.PageController do
  use ChirpAwareness.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
