defmodule Solve do

  def load_input(day) do
    day
    |> get_path
    |> read_file
  end

  defp get_path(day) do
    "lib/day#{day}/input.txt"
  end

  defp read_file(path) do
    case File.read(path) do
      {:ok, file} ->
        file
      {:error, reason} ->
        {:error, reason}
    end
  end

end
