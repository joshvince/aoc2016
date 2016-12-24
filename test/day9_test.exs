defmodule Day9Test do
  use ExUnit.Case
  alias Day9.Solution
  @example "ADVENT  A(1x5)BC  (3x3)XYZ  A(2x2)BCD(2x2)EFG  (6x1)(1x3)A X(8x2)(3x3)ABCY"
  @example1 "A(1x5)BC"
  @example2 "(3x3)XYZ"

  test "solves the test input correctly" do
    assert Solution.solve_part_one(@example) == 57
  end

end
