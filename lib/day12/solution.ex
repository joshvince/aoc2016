defmodule Day12.Solution do

  def solve_part_two(input) do
    input
    |> parse_input
    |> create_instruction_map
    |> execute_part_two
  end

  def solve_part_one(input) do
    input
    |> parse_input
    |> create_instruction_map
    |> execute_part_one
  end

  defp create_instruction_map(instruction_list) do
    instruction_list
    |> Enum.with_index
    |> Enum.map(fn{ls, i} -> {i, ls} end)
    |> Enum.into(%{})
  end

  defp parse_input(str) do
    str
    |> String.split("\n")
    |> Enum.map(fn str -> String.split(str," ") end)
    |> Enum.map(fn ls -> Enum.map(ls, &parse_or_atomise(&1)) end)
  end

  defp parse_or_atomise(val) do
    case Float.parse(val) do
      {num, _rest} ->
        trunc(num)
      :error ->
        atomise(val)
    end
  end

  defp atomise(str) do
    String.to_atom(str)
  end


  # go over each instruction:
  # update the registry map according to the atom in the first position
  # update the relevant index in the map
  # pass the map, the count and the next entry along the chain

  # keep a count, and the instructions map, and an accumulator registry
  # when the count is higher than the highest index value, return the accumulator

  defp init_part_one, do: %{a: 0, b: 0, c: 0, d: 0}
  defp init_part_two, do: %{a: 0, b: 0, c: 1, d: 0}

  defp execute_part_one(instructions), do: execute({init_part_one, 0}, instructions)
  defp execute_part_two(instructions), do: execute({init_part_two, 0}, instructions)

  defp execute({acc, count}, instructions) do
    case Enum.count(instructions) <= count do
      false ->
        execute(acc, count, instructions)
      true ->
        acc
    end
  end

  defp execute(acc, count, instructions) do
    execute_instruction(acc, count, instructions[count])
    |> execute(instructions)
  end

  defp execute_instruction(acc, count, [:inc, reg]) do
    result = Map.update!(acc, reg, &(&1 + 1))
    {result, count + 1}
  end

  defp execute_instruction(acc, count, [:dec, reg]) do
    result = Map.update!(acc, reg, &(&1 - 1))
    {result, count + 1}
  end

  defp execute_instruction(acc, count, [:cpy, val, reg]) when is_atom(val) do
    new_val = Map.get(acc, val)
    result = Map.put(acc, reg, new_val)
    {result, count + 1}
  end

  defp execute_instruction(acc, count, [:cpy, val, reg]) do
    result = Map.put(acc, reg, val)
    {result, count + 1}
  end

  defp execute_instruction(acc, count, [:jnz, reg_check, moves]) when is_atom(reg_check) do
    jump(acc, count, acc[reg_check], moves)
  end

  defp execute_instruction(acc, count, [:jnz, reg_check, moves]) do
    jump(acc, count, reg_check, moves)
  end

  defp jump(acc, count, 0, _moves) do
    {acc, count + 1}
  end

  defp jump(acc, count, _reg_check, moves) do
    # IO.inspect("JUMP FOUND")
    # IO.inspect(count)
    # IO.inspect(moves)
    # IO.inspect(count + moves)
    {acc, count + moves}
  end

end
