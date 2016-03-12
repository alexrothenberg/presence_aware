ExUnit.start

Mix.Task.run "ecto.create", ~w(-r ChirpAwareness.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r ChirpAwareness.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(ChirpAwareness.Repo)

