export const snippets = [
  "-- Naive Fibonacci with lazy evaluation\nfib :: Integer -> Integer\nfib 0 = 0\nfib 1 = 1\nfib n = fib (n - 1) + fib (n - 2)\n\nfibs :: [Integer]\nfibs = 0 : 1 : zipWith (+) fibs (tail fibs)\n\nmain :: IO ()\nmain = do\n  print $ fibs !! 50\n  print $ take 10 fibs",
  "-- Quicksort in the classic one-liner style\nquicksort :: Ord a => [a] -> [a]\nquicksort [] = []\nquicksort (p : xs) =\n  quicksort [x | x <- xs, x < p]\n    ++ [p] ++\n  quicksort [x | x <- xs, x >= p]\n\nmain :: IO ()\nmain = print (quicksort [5, 3, 8, 1, 9, 2, 7])",
  "-- Word count over stdin using folds and Maps\nimport qualified Data.Map.Strict as Map\n\nwordCount :: String -> Map.Map String Int\nwordCount = foldl step Map.empty . words\n  where step m w = Map.insertWith (+) w 1 m\n\nmain :: IO ()\nmain = interact (show . wordCount)",
];
