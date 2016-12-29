defmodule Day12Test do
  use ExUnit.Case
  alias Day12.Solution

  @example_input "cpy 41 a\ninc a\ninc a\ndec a\njnz a 2\ndec a"

  test "solves example input successfully" do
    %{a: result} = Solution.solve_part_one(@example_input)
    assert result == 42.0
  end

end
