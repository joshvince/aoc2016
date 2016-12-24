defmodule Day9.Solution do

  def solve_part_one(input) do
    input
    |> parse_input
    |> scan
    |> Enum.reverse
    |> Enum.join
    |> String.length
  end

  def parse_input(input) do
    String.split(input)
    |> Enum.map(&(String.trim(&1)))
    |> Enum.join
  end

  defp scan(inp), do: scan([], inp)
  defp scan(acc, ""), do: acc

  defp scan(acc, "(" <> rest) do
    find_marker(acc, rest)
  end

  defp scan(acc, <<char, rest :: binary>>) do
    scan([<<char>> | acc], rest)
  end

  defp find_marker(acc, string) do
    exp = ~r/(\d+?)x(\d+?)\)(.+)/
    case Regex.run(exp, string) do
      nil ->
        scan(["(" | acc], string)
      [_match, chars, repeat, tail] ->
        decompress(acc, String.to_integer(chars), String.to_integer(repeat), tail)
    end
  end

  defp decompress(acc, chars, repeat, tail) do
    extract_pattern(tail, chars)
    |> repeat_and_continue(chars * repeat, acc)
  end

  defp extract_pattern(string, pattern_length) do
    exp = ~r/(.{#{pattern_length}})(.+)/
    # handle the case where we have reached the end of the string here
    case Regex.run(exp, string) do
      nil ->
        Regex.run(~r/(.{#{pattern_length}})/, string)
      _ ->
        Regex.run(exp, string)
    end
  end

  defp repeat_and_continue([_str, pattern, tail], new_length, acc) do
    String.pad_trailing("", new_length, pattern)
    |> prepend(acc)
    |> scan(tail)
  end

# termination case: this will match when the last pattern is being repeated
# It will call the termination case of scan
  defp repeat_and_continue([_str, pattern], new_length, acc) do
    String.pad_trailing("", new_length, pattern)
    |> prepend(acc)
    |> scan("")
  end

  defp prepend(item, acc) do
    [item | acc]
  end

end
